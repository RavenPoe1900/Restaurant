import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import {
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { OrderItemEntity } from './orderItem.entity';

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
export class OrderItemDto implements OrderItemWithoutId {
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
  @IsDate()
  @IsNotEmpty()
  date: Date;
}

export class UpdateOrderItemDto extends PartialType(OrderItemDto) {}