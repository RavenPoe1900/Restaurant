import { ApiProperty } from '@nestjs/swagger';
import { Restaurant } from '@prisma/client';
import { BaseEntity } from 'src/_shared/domain/base.entity';

export class RestaurantEntity extends BaseEntity implements Restaurant {
  @ApiProperty({
    description: 'Unique identifier for the restaurant',
    example: 1,
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
    example: '123-456-7890',
  })
  phone: string;

  @ApiProperty({
    description: 'Name of the restaurant',
    uniqueItems: true,
    example: 'The Great Restaurant',
    type: String,
  })
  name: string;

  @ApiProperty({
    description: 'The current capacity of the restaurant',
    example: 1,
    type: Number,
  })
  currentCapacity: number;

  @ApiProperty({
    description: 'License type of the restaurant',
    uniqueItems: true,
    example: 'Food Service License',
    type: String,
  })
  licenseType: string;

  @ApiProperty({
    description: 'The ID of the owner of the restaurant',
    required: false,
    example: 1,
    type: Number,
  })
  ownerId: number;

  @ApiProperty({
    description: 'The address of the restaurant',
    example: '123 Main St, Springfield, USA',
    type: String,
    maxLength: 255,
  })
  address: string;

  @ApiProperty({
    description: 'The seating capacity of the restaurant',
    example: 100,
    type: Number,
  })
  capacity: number;
}
