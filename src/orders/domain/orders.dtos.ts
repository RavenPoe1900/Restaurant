import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsInt, IsNotEmpty } from 'class-validator';
import { OrderEntity } from './orders.entity';

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
  | 'companyId'
>;
export class OrderDto implements OrderWithoutId {
  @ApiProperty({
    description: 'The ID of the client placing the order',
    example: 1,
    type: Number,
  })
  @IsNotEmpty()
  @IsInt()
  clientId: number;

  @ApiProperty({
    description:
      'The total amount of the order in the currency of the restaurant',
    example: 29.99,
    type: Number,
  })
  @IsNotEmpty()
  @IsFloat()
  total: number;

  @ApiProperty({
    description: 'The date when the order was placed',
    example: '2024-12-25T00:00:00.000Z',
    type: String,
    format: 'date-time',
  })
  @IsNotEmpty()
  @IsDate()
  date: Date;
}

export class UpdateOrderDto extends PartialType(OrderDto) {}
function IsFloat(): (target: OrderDto, propertyKey: 'total') => void {
  throw new Error('Function not implemented.');
}
