import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength, ValidateNested } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  name!: string;

  @IsString()
  @IsNotEmpty({ message: 'El apellido no puede estar vacío' })
  lastName!: string;

  @IsString()
  @IsOptional()
  avatarUrl!: string;

  @IsString()
  @IsNotEmpty({ message: 'El titular no puede estar vacío' })
  headline!: string;

  @IsString()
  @IsNotEmpty({ message: 'La biografía no puede estar vacía' })
  bio!: string;
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre de usuario no puede estar vacío' })
  username!: string;

  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  @IsNotEmpty({ message: 'El correo electrónico no puede estar vacío' })
  @IsString()
  email!: string;

  @IsString()
  @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  password!: string;

  @ValidateNested()
  @Type(() => CreateProfileDto)
  profile!: CreateProfileDto;
}

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre de usuario no puede estar vacío' })
  username!: string;

  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  @IsOptional()
  @IsString()
  email!: string;

  @IsString()
  @IsOptional()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  password!: string;
}
