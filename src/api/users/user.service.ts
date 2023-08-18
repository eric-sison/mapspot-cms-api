import { Injectable } from '@nestjs/common';
import { DrizzleService } from 'src/database/connection/drizzle.service';
import { User, users } from 'src/database/schema/users';

@Injectable()
export class UserService {
  constructor(private readonly drizzle: DrizzleService) {}

  async insertUser(user: User) {
    return await this.drizzle.db().insert(users).values(user);
  }

  async findUsers() {
    return await this.drizzle.db().select().from(users);
  }
}
