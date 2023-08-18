import { DynamicModule, Global, Module } from '@nestjs/common';
import { DrizzleService } from './drizzle.service';
import { DrizzleAsyncOptions, DrizzleOptions } from '../types/drizzle-module-options';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({})
export class DrizzleModule {
  static forRoot(options: DrizzleOptions): DynamicModule {
    return {
      module: DrizzleModule,
      global: true,
      providers: [
        {
          provide: 'DRIZZLE_OPTIONS',
          useValue: options,
        },
        DrizzleService,
      ],
      exports: [DrizzleService],
    };
  }

  static forRootAsync(options: DrizzleAsyncOptions): DynamicModule {
    return {
      module: DrizzleModule,
      providers: [
        {
          provide: 'DRIZZLE_OPTIONS',
          inject: options.inject,
          useFactory: options.useFactory,
        },
        DrizzleService,
      ],
      exports: [DrizzleService],
    };
  }
}
