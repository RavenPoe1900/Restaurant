import { ApiProperty } from '@nestjs/swagger';
import { Restaurant } from '@prisma/client';

export class RestaurantEntity implements Restaurant {
  @ApiProperty({ description: 'Unique identifier for the restaurant' })
  id: number;

  @ApiProperty({ description: 'Rating of the restaurant', default: 0 })
  rating: number;

  @ApiProperty({ description: 'Phone number of the restaurant' })
  phone: string;

  @ApiProperty({ description: 'Name of the restaurant', uniqueItems: true })
  name: string;

  @ApiProperty({
    description: 'License type of the restaurant',
    uniqueItems: true,
  })
  licenseType: string;

  @ApiProperty({
    description: 'Creation date of the restaurant',
    type: 'string',
    format: 'date-time',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update date of the restaurant',
    type: 'string',
    format: 'date-time',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'User who created the restaurant',
    required: false,
  })
  createdBy: string;

  @ApiProperty({
    description: 'User who last updated the restaurant',
    required: false,
  })
  updatedBy: string;

  @ApiProperty({
    description: 'Deletion date of the restaurant',
    required: false,
    type: 'string',
    format: 'date-time',
  })
  deletedAt: Date;

  @ApiProperty({
    description: 'User who deleted the restaurant',
    required: false,
  })
  deletedBy: string;

  @ApiProperty({ description: 'Version of the restaurant entity', default: 0 })
  version: number;

  @ApiProperty({ description: 'Owner ID of the restaurant', required: false })
  ownerId: number;
}
