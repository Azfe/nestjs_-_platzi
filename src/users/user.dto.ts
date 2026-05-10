import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  name!: string;

  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  @IsNotEmpty({ message: 'El correo electrónico no puede estar vacío' })
  @IsString()
  email!: string;
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name!: string;

  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  @IsOptional()
  @IsString()
  email!: string;
}
