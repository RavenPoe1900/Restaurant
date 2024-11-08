import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

type UserWithout = Omit<
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
  | 'restaurantId'
>;

export class UserDto implements UserWithout {
  @ApiProperty({
    type: String,
    example: 'http://example.com/user/photo.jpg',
    description: "The URL of the user's photo",
  })
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  photo: string;

  @ApiProperty({
    type: String,
    example: '323 2032',
    description: 'Phone of the user',
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    type: String,
    example: 'hello@domain.com',
    description: 'Email of the user',
  })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({
    type: Boolean,
    example: true,
    description: 'Whether the user is active or not',
  })
  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({
    type: String,
    example: 'John',
    description: 'First name of the user',
  })
  @IsNotEmpty()
  @IsString({ message: 'First name must be a string' })
  firstName: string;

  @ApiProperty({
    type: String,
    example: 'Doe',
    description: 'Last name of the user',
  })
  @IsNotEmpty()
  @IsString({ message: 'Last name must be a string' })
  lastName: string;

  @ApiProperty({
    type: String,
    description: `The password for the user. Must contain at least 8 characters, one uppercase letter, one lowercase letter, 
      one number, and one special character.`,
    example: 'P@ssw0rd!',
  })
  @IsString({ message: 'Password must be a string' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(20, { message: 'Password must not exceed 20 characters' })
  @Matches(/(?=.*[A-Z])/, {
    message: 'Password must contain at least one uppercase letter',
  })
  @Matches(/(?=.*[a-z])/, {
    message: 'Password must contain at least one lowercase letter',
  })
  @Matches(/(?=.*\d)/, { message: 'Password must contain at least one number' })
  @Matches(/(?=.*\W)/, {
    message: 'Password must contain at least one special character',
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    type: Number,
    example: 1,
    description: 'The unique identifier of the role associated with the user',
  })
  @IsNotEmpty()
  @IsNumber()
  roleId: number;
}

export class UpdateUserDto extends PartialType(UserDto) {}
