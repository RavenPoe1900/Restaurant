import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import {
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';
import { RestaurantEntity } from './restaurants.entity';

type RestaurantWithoutId = Omit<
  RestaurantEntity,
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
  | 'currentCapacity'
>;

export class RestaurantDto implements RestaurantWithoutId {
  @ApiProperty({
    description: 'Phone number of the restaurant',
    example: '+1 203456789',
    type: String,
  })
  @IsPhoneNumber(null, { message: 'Phone number must be a valid phone number' })
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    description: 'Name of the restaurant',
    required: false,
    example: 'The Great Restaurant',
    type: String,
  })
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @ApiProperty({
    description: 'License type of the restaurant',
    example: 'Food Service License',
    type: String,
  })
  @IsNotEmpty()
  @IsString({ message: 'License type must be a string' })
  licenseType: string;

  @ApiProperty({
    description: 'Rating of the restaurant',
    default: 0,
    example: 5,
    type: Number,
  })
  @IsNotEmpty({ message: 'Rating is required' })
  @IsInt({ message: 'Rating must be an integer' })
  @IsPositive({ message: 'Rating must be a positive number' })
  rating: number;

  @ApiProperty({
    description: 'The address of the restaurant',
    example: '123 Main St, Springfield, USA',
    type: String,
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  address: string;

  @ApiProperty({
    description: 'The seating capacity of the restaurant',
    example: 100,
    type: Number,
  })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  capacity: number;
}

export class UpdateRestaurantDto extends PartialType(RestaurantDto) {}
