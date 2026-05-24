import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';

@Injectable()
export class CategoriesService {
  @InjectRepository(Category)
  private categoriesRepository!: Repository<Category>;

  async findAll(): Promise<Category[]> {
    return this.categoriesRepository.find({ order: { createAt: 'DESC' } });
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoriesRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  async create(dto: CreateCategoryDto): Promise<{ message: string; category: Category }> {
    try {
      const category = await this.categoriesRepository.save(dto);
      return { message: 'Category created successfully', category };
    } catch (error) {
      throw new BadRequestException(`Error creating category: ${(error as Error).message}`);
    }
  }

  async update(id: number, dto: UpdateCategoryDto): Promise<Category> {
    try {
      const category = await this.findOne(id);
      const merged = this.categoriesRepository.merge(category, dto);
      return this.categoriesRepository.save(merged);
    } catch (error) {
      throw new BadRequestException(`Error updating category: ${(error as Error).message}`);
    }
  }

  async remove(id: number): Promise<{ message: string; category: Category }> {
    try {
      const category = await this.findOne(id);
      await this.categoriesRepository.remove(category);
      return { message: `Category #${id} deleted successfully`, category };
    } catch (error) {
      throw new BadRequestException(`Error deleting category: ${(error as Error).message}`);
    }
  }
}
