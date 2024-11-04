import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
} from 'class-validator';
import { OrderItemEntity } from './orderItem.entity';
import { TransformStringToDate } from 'src/_shared/transform/stringToDate.transform';

type OrderItemWithoutId = Omit<
  OrderItemEntity,
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
  | 'restaurantId'
>;
export class OrderItemDto  implements OrderItemWithoutId {
  @ApiProperty({
    description: 'Quantity of the product in the order item',
    example: 2,
    type: Number,
  })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({
    description: 'Price of the product in the order item',
    example: 25.0,
    type: Number,
  })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    description: 'Identifier of the order to which this item belongs',
    example: 1,
    type: Number,
  })
  @IsInt()
  @IsNotEmpty()
  orderId: number;

  @ApiProperty({
    description: 'Date of the order item',
    example: '2024-01-01T00:00:00Z',
    type: String,
  })
  @TransformStringToDate()
  @IsNotEmpty()
  @IsDate()
  date: Date;
}

export class UpdateOrderItemDto extends PartialType(OrderItemDto) {}
