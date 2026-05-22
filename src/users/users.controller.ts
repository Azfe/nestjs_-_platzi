import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete, Put } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dtos/user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.getUserById(id);
  }

  @Get(':id/profile')
  async findUserProfile(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getProfileByUserId(id);
  }

  @Post()
  async createUser(@Body() newUser: CreateUserDto): Promise<{ message: string; user: User }> {
    return this.usersService.create(newUser);
  }

  @Put(':id')
  async updateUser(@Param('id', ParseIntPipe) id: number, @Body() updatedUser: UpdateUserDto): Promise<User> {
    return this.usersService.update(id, updatedUser);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<{ message: string; user: User } | { message: string; user: null }> {
    return this.usersService.delete(id);
  }
}
