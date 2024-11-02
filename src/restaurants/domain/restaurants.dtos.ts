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
>;
export class RestaurantDto implements RestaurantWithoutId {
  @ApiProperty({ description: 'Phone number of the restaurant' })
  @IsPhoneNumber(null, { message: 'Phone number must be a valid phone number' })
  phone: string;

  @ApiProperty({ description: 'Name of the restaurant', required: false })
  @IsNotEmpty()
  @IsString({ message: 'Name must be a string' })
  name: string;

  @ApiProperty({ description: 'License type of the restaurant' })
  @IsString({ message: 'License type must be a string' })
  licenseType: string;

  @ApiProperty({ description: 'Rating of the restaurant', default: 0 })
  @IsNotEmpty()
  @IsInt({ message: 'Rating must be an integer' })
  @IsPositive({ message: 'Rating must be a positive number' })
  rating: number;
}

export class UpdateRestaurantDto extends PartialType(RestaurantDto) {}
