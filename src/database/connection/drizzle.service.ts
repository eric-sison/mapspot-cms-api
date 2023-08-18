import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { ConfigService } from '@nestjs/config';
import { DrizzleOptions } from '../types/drizzle-module-options';
import { initializeSql } from '../scripts/initialize-sql';
import * as shell from 'shelljs';

/**
 * Responsible for establishing a connection to the database.
 */
@Injectable()
export class DrizzleService implements OnModuleInit {
  // initialize pool client
  private readonly poolClient: Pool;

  // initialize database object
  private readonly database: NodePgDatabase<Record<string, never>>;

  /**
   *
   * Once `DrizzleService` is initialized and injected as a service, attempt to establish a connection to the database.
   *
   * @param options connection options to try to connect to the database.
   *
   * @param configService used to safely get values from node environment.
   */
  constructor(
    @Inject('DRIZZLE_OPTIONS')
    readonly options: DrizzleOptions,

    // inject ConfigService as a dependency
    private readonly configService: ConfigService,
  ) {
    try {
      // initialize connection using options passed by the module
      this.poolClient = new Pool(options);

      // attempt to connect to the database
      this.poolClient.connect();

      // initialize the value of the database based on the connected client
      this.database = drizzle(this.poolClient, { ...options.drizzleConfigOptions });

      // catch error
    } catch (error) {
      // log any occuring error
      Logger.error(error);
    }
  }

  /**
   * Once `DrizzleModule` is initialized, check the environment value if the server is running on `production` or `development`.
   * If the server is running on production and `synchronized` is set to true, make sure to automatically set it to false.
   * However, if the server is running on production, the value of `synchronized` completely depends on the value set when importing
   * the `DrizzleMocule` into the app.
   *
   * Visit drizzle official docs on `push` command to learn more: https://orm.drizzle.team/kit-docs/commands#prototype--push
   */
  async onModuleInit() {
    // get the node environment
    const env = this.configService.get<string>('NODE_ENV') as 'production' | 'development';

    // initialize functions, triggers, procedures, etc
    await initializeSql(this.poolClient);

    // if environment is on production, automatically set synchronize to false
    if (env === 'production') {
      this.options.synchronize = false;

      // otherwise, run migration:push
    } else {
      if (this.options.synchronize) shell.exec('npm run migration:push');
    }
  }

  /**
   * Return the `database` object for query purposes
   *
   * @returns database
   */
  public db(): NodePgDatabase<Record<string, never>> {
    return this.database;
  }

  /**
   * Return the `connection` object
   *
   * @returns connection
   */
  public conn(): Pool {
    return this.poolClient;
  }
}
