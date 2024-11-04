import { ApiProperty } from '@nestjs/swagger';
import { Item } from '@prisma/client';
import { BaseEntity } from 'src/_shared/domain/base.entity';

export class ItemEntity extends BaseEntity implements Item {
  @ApiProperty({ example: 1, description: 'The unique identifier of the role' })
  id: number;
  orderItemId: number;
  @ApiProperty({
    description: 'The name of the item',
    example: 'Cheeseburger',
    type: String,
    maxLength: 100,
  })
  name: string;

  @ApiProperty({
    description: 'A brief description of the item',
    example: 'A delicious cheeseburger with lettuce and tomato.',
    type: String,
    required: false,
  })
  description: string;

  @ApiProperty({
    description: 'The price of the item',
    example: 9.99,
    type: Number,
  })
  price: number;
  @ApiProperty({
    description: 'Date when the order item was created',
    example: '2024-01-01T00:00:00Z',
    type: String,
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date when the order item was last updated',
    example: '2024-01-01T00:00:00Z',
    type: String,
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'User who created the order item',
    example: 'user@example.com',
    required: false,
    type: String,
  })
  createdBy: string;

  @ApiProperty({
    description: 'User who last updated the order item',
    example: 'user@example.com',
    required: false,
    type: String,
  })
  updatedBy: string;

  @ApiProperty({
    description: 'Date when the order item was deleted',
    example: '2024-01-01T00:00:00Z',
    required: false,
    type: String,
  })
  deletedAt: Date;

  @ApiProperty({
    description: 'User who deleted the order item',
    example: 'user@example.com',
    required: false,
    type: String,
  })
  deletedBy: string;

  @ApiProperty({
    description: 'Version of the order item',
    example: 1,
    type: Number,
  })
  version: number;

  @ApiProperty({
    description: 'Identifier of the owner of the order item',
    example: 1,
    required: false,
    type: Number,
  })
  ownerId: number;

  @ApiProperty({
    example: 1,
    description:
      'The unique identifier of the restaurant associated with the user',
    type: Number,
  })
  restaurantId: number;
}
