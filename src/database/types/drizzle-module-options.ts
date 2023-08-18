import { FactoryProvider, ModuleMetadata } from '@nestjs/common';
import { DrizzleConfig } from 'drizzle-orm';
import { PoolConfig } from 'pg';

export type DrizzleOptions = PoolConfig & {
  drizzleConfigOptions?: DrizzleConfig<Record<string, never>>;
  synchronize?: boolean;
};

export type DrizzleAsyncOptions = Pick<ModuleMetadata, 'imports'> &
  Pick<FactoryProvider<DrizzleOptions>, 'useFactory' | 'inject'>;
