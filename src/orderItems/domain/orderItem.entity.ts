import { ApiProperty } from '@nestjs/swagger';
import { OrderItem } from '@prisma/client';
import { BaseEntity } from 'src/_shared/domain/base.entity';

export class OrderItemEntity extends BaseEntity implements OrderItem {
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
