import {
  IsString,
  Matches,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsEmail,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
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
    example: 'hello@domain.com',
    description: 'Email of the user',
  })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({
    description: 'The ID of the restaurant associated with the order',
    required: false,
    example: 1,
    type: Number,
  })
  @IsNumber()
  restaurantId: number;
}
