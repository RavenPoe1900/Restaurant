import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Order } from '@prisma/client';
import { BaseEntity } from 'src/_shared/domain/base.entity';

export class OrderEntity extends BaseEntity implements Order {
  @ApiProperty({
    description: 'The unique identifier of the order',
    example: 1,
    type: Number,
  })
  id: number;

  @ApiProperty({
    description: 'Status Order',
    example: $Enums.OrdenStatusEnum.CLOSE,
    enum: $Enums.OrdenStatusEnum,
  })
  status: $Enums.OrdenStatusEnum;

  @ApiProperty({
    description: 'Price of the product in the order item',
    example: 25.0,
    type: Number,
  })
  totalPrice: number;

  @ApiProperty({
    description: 'The date when the order was placed',
    example: '2024-12-25T00:00:00.000Z',
    type: String,
    format: 'date-time',
  })
  date: Date;

  @ApiProperty({
    description: 'The ID of the restaurant associated with the order',
    required: false,
    example: 1,
    type: Number,
  })
  restaurantId: number;

  @ApiProperty({
    description: 'The ID of the owner of the order record',
    required: false,
    example: 1,
    type: Number,
  })
  ownerId: number;

  @ApiProperty({
    description: 'The ID of the table of the order record',
    required: false,
    example: 1,
    type: Number,
  })
  tableId: number;

  @ApiProperty({
    description: 'The number of the order',
    required: false,
    example: 1,
    type: Number,
  })
  number: number;
}
