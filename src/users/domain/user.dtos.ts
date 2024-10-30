import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsInt,
  isNotEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';

type UserWithoutId = Omit<
  User,
  | 'id'
  | 'createdAt'
  | 'updatedAt'
  | 'createdBy'
  | 'updatedBy'
  | 'deletedAt'
  | 'deletedAt'
  | 'deletedBy'
  | 'version'
  | 'ownerId'
  | 'restarurantId'
>;

export class UserDto implements UserWithoutId {
  @ApiProperty({
    example: 'http://example.com/user/photo.jpg',
    description: "The URL of the user's photo",
  })
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  photo: string;

  @ApiProperty({
    example: '323 2032',
    description: 'Phone of the user',
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    example: 'hello@domain.com',
    description: 'Email of the user',
  })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({
    example: true,
    description: 'Whether the user is active or not',
  })
  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({
    example: 'John',
    description: 'First name of the user',
  })
  @IsNotEmpty()
  @IsString({ message: 'First name must be a string' })
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Last name of the user',
  })
  @IsNotEmpty()
  @IsString({ message: 'Last name must be a string' })
  lastName: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class UpdateUserDto extends PartialType(UserDto) {}
