import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
// import { DrizzleModule } from 'src/database/connection/drizzle.module';
// import { DrizzleService } from 'src/database/connection/drizzle.service';

@Module({
  imports: [],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
