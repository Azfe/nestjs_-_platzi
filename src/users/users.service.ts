import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { User } from './user.model';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com' },
  ];

  findAll(): User[] {
    return this.users;
  }

  getUserById(id: number): User | undefined {
    const index = this.findOne(id);
    const user = this.users[index];
    if (user.id === 1) {
      throw new ForbiddenException(`Access to user #${id} is forbidden`);
    }
    return user;
  }

  create(newUser: CreateUserDto): User {
    const id = this.users.length + 1;
    const user: User = { id, name: newUser.name, email: newUser.email };
    this.users.push(user);
    return user;
  }

  update(id: number, updatedUser: UpdateUserDto): User | undefined {
    const user = this.getUserById(id);
    if (user) {
      Object.assign(user, updatedUser);
      return user;
    }
    return updatedUser as User;
  }

  delete(id: number): { message: string; user: User } | false {
    const index = this.findOne(id);
    const [user] = this.users.splice(index, 1);
    return { message: `User #${id} deleted successfully`, user };
  }

  private findOne(id: number): number {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return index;
  }
}
