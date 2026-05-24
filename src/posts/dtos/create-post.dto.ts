import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  coverImageUrl?: string;

  @IsString()
  @MaxLength(500)
  @IsOptional()
  summary?: string;

  @IsNumber()
  @IsNotEmpty()
  userId!: number;
}
