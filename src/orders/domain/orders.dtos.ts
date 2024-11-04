import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsInt, IsNotEmpty, IsNumber } from 'class-validator';
import { OrderEntity } from './orders.entity';
import { $Enums, OrdenStatusEnum } from '@prisma/client';
import { WaiterOrderDto } from './waiterOrders.dtos';

type OrderWithoutId = Omit<
  OrderEntity,
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
  | 'number'
>;
export class OrderDto extends WaiterOrderDto implements OrderWithoutId {
  @ApiProperty({
    description: 'Status Order',
    example: OrdenStatusEnum.CLOSE,
    enum: OrdenStatusEnum,
  })
  @IsEnum(OrdenStatusEnum, {
    message: 'Name must be a valid enum value',
  })
  @IsNotEmpty()
  status: OrdenStatusEnum;
}

export class UpdateOrderDto extends PartialType(OrderDto) {}
