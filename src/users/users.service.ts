import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  @InjectRepository(User)
  private usersRepository!: Repository<User>;

  findAll(): Promise<User[]> {
    return this.usersRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.findOne(id);
    if (user.id === 1) {
      throw new ForbiddenException(`You do not have permission to access User #${id}`);
    }
    return user;
  }

  async create(newUser: CreateUserDto): Promise<{ message: string; user: User }> {
    try {
      const user = await this.usersRepository.save(newUser);
      return { message: `User created successfully`, user };
    } catch (error) {
      throw new BadRequestException(`Error creating user: ${(error as Error).message}`);
    }
  }

  async update(id: number, updatedUser: UpdateUserDto): Promise<User> {
    try {
      const user = await this.findOne(id);
      const updateUser = this.usersRepository.merge(user, updatedUser);
      return await this.usersRepository.save(updateUser);
    } catch (error) {
      throw new BadRequestException(`Error updating user: ${(error as Error).message}`);
    }
  }

  async delete(id: number): Promise<{ message: string; user: User }> {
    const user = await this.findOne(id);
    await this.usersRepository.remove(user);
    return { message: `User #${id} deleted successfully`, user };
  }

  private async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }
}
