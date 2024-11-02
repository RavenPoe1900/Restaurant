import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsInt, IsNotEmpty, IsNumber } from 'class-validator';
import { OrderEntity } from './orders.entity';
import { $Enums } from '@prisma/client';
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
>;
export class OrderDto extends WaiterOrderDto implements OrderWithoutId {
  @ApiProperty({
    description: 'Status Order',
    example: $Enums.OrdenStatusEnum.CLOSE,
    enum: $Enums.OrdenStatusEnum,
  })
  @IsEnum($Enums.ReservationStatusEnum, {
    message: 'Name must be a valid enum value',
  })
  status: $Enums.OrdenStatusEnum;
}

export class UpdateOrderDto extends PartialType(OrderDto) {}
