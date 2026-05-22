import { IsString, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateProfileDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  name!: string;

  @IsString()
  @IsNotEmpty({ message: 'El apellido no puede estar vacío' })
  lastName!: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  avatarUrl!: string;

  @IsString()
  @IsNotEmpty({ message: 'El titular no puede estar vacío' })
  headline!: string;

  @IsString()
  @IsNotEmpty({ message: 'La biografía no puede estar vacía' })
  bio!: string;
}

export class UpdateProfileDto extends PartialType(CreateProfileDto) {}
