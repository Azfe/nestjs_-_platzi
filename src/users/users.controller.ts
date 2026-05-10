import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete, Put } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from './user.model';
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAllUsers(): User[] {
    return this.usersService.findAll();
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number): User | undefined {
    return this.usersService.getUserById(id);
  }

  @Post()
  createUser(@Body() newUser: CreateUserDto): User {
    return this.usersService.create(newUser);
  }

  @Put(':id')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() updatedUser: UpdateUserDto): User | undefined {
    return this.usersService.update(id, updatedUser);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number): { message: string; user: User } | { message: string; user: null } {
    return this.usersService.delete(id) || { message: `User #${id} not found`, user: null };
  }
}
