import { ApiProperty } from '@nestjs/swagger';
import { OrderItem } from '@prisma/client';

export class OrderItemEntity implements OrderItem{
  @ApiProperty({
    description: 'Unique identifier for the order item',
    example: 1,
    type: Number,
  })
  id: number;

  @ApiProperty({
    description: 'Quantity of the product in the order item',
    example: 2,
    type: Number,
  })
  quantity: number;

  @ApiProperty({
    description: 'Price of the product in the order item',
    example: 25.0,
    type: Number,
  })
  price: number;

  @ApiProperty({
    description: 'Identifier of the order to which this item belongs',
    example: 1,
    type: Number,
  })
  orderId: number;

  @ApiProperty({
    description: 'Date of the order item',
    example: '2024-01-01T00:00:00Z',
    type: String,
  })
  date: Date;

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
}
