import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DrizzleModule } from './database/connection/drizzle.module';
import { UserModule } from './api/users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DrizzleModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          host: configService.getOrThrow('DB_HOST'),
          port: parseInt(configService.getOrThrow('DB_PORT')),
          user: configService.getOrThrow('DB_USER'),
          password: configService.getOrThrow('DB_PASS'),
          database: configService.getOrThrow('DB_NAME'),
          synchronize: true,
          drizzleConfigOptions: {
            logger: true,
          },
        };
      },
    }),

    UserModule,
  ],
})
export class AppModule {}
