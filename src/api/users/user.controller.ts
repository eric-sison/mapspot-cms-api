import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/database/schema/users';

@Controller({ path: 'users' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() user: User) {
    return await this.userService.insertUser(user);
  }

  @Get()
  async findAllUsers() {
    return await this.userService.findUsers();
  }
}
