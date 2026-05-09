import { Controller, Get, Post, Body, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';

interface User {
  id: number;
  name: string;
  email: string;
}

@Controller('users')
export class UsersController {
  private users: User[] = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com' },
  ];

  @Get()
  getAllUsers(): User[] {
    return this.users;
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number): User {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  @Post()
  createUser(@Body() newUser: Omit<User, 'id'>): User {
    const id = this.users.length + 1;
    const user = { id, ...newUser };
    this.users.push(user);
    return user;
  }
}
