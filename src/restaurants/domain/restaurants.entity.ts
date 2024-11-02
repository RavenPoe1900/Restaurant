import { ApiProperty } from '@nestjs/swagger';
import { Restaurant } from '@prisma/client';
import { BaseEntity } from 'src/_shared/domain/base.entity';

export class RestaurantEntity extends BaseEntity implements Restaurant {
  @ApiProperty({
    description: 'Unique identifier for the restaurant',
    example: 1, // Example value for better documentation
    type: Number,
  })
  id: number;

  @ApiProperty({
    description: 'Rating of the restaurant',
    default: 0,
    type: Number,
  })
  rating: number;

  @ApiProperty({
    description: 'Phone number of the restaurant',
    example: '123-456-7890', // Example value for better documentation
    type: String,
  })
  phone: string;

  @ApiProperty({
    description: 'Name of the restaurant',
    uniqueItems: true,
    example: 'The Great Restaurant', // Example value for better documentation
    type: String,
  })
  name: string;

  @ApiProperty({
    description: 'License type of the restaurant',
    uniqueItems: true,
    example: 'Food Service License', // Example value for better documentation
    type: String,
  })
  licenseType: string;

  @ApiProperty({
    description: 'The ID of the owner of the restaurant',
    required: false,
    example: 1,
    type: Number,
  })
  ownerId: number; // Marked as optional
}