import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  @InjectRepository(Post)
  private postsRepository!: Repository<Post>;

  async findAll(): Promise<Post[]> {
    return this.postsRepository.find({ relations: ['author.profile'], order: { createdAt: 'DESC' } });
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postsRepository.findOne({ where: { id }, relations: ['author.profile'] });
    if (!post) {
      throw new NotFoundException(`Post #${id} not found`);
    }
    return post;
  }

  async create(newPost: CreatePostDto): Promise<{ message: string; post: Post }> {
    try {
      const post = await this.postsRepository.save({
        ...newPost,
        author: { id: newPost.userId },
      });
      return { message: 'Post created successfully', post: await this.findOne(post.id) };
    } catch (error) {
      throw new BadRequestException(`Error creating post: ${(error as Error).message}`);
    }
  }

  async update(id: number, updatedPost: UpdatePostDto): Promise<Post> {
    try {
      const post = await this.findOne(id);
      const merged = this.postsRepository.merge(post, updatedPost);
      return this.postsRepository.save(merged);
    } catch (error) {
      throw new BadRequestException(`Error updating post: ${(error as Error).message}`);
    }
  }

  async remove(id: number): Promise<{ message: string; post: Post }> {
    try {
      const post = await this.findOne(id);
      await this.postsRepository.remove(post);
      return { message: `Post #${id} deleted successfully`, post };
    } catch (error) {
      throw new BadRequestException(`Error deleting post: ${(error as Error).message}`);
    }
  }
}
