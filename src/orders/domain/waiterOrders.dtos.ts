import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { OrderEntity } from './orders.entity';
import { TransformStringToDate } from 'src/_shared/transform/stringToDate.transform';

type WaiterOrderWithoutId = Omit<
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
  | 'status'
  | 'number'
>;
export class WaiterOrderDto implements WaiterOrderWithoutId {
  @ApiProperty({
    description: 'Price of the product in the order item',
    example: 25.0,
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;

  @ApiProperty({
    description: 'The date when the order was placed',
    example: '2024-12-25T00:00:00.000Z',
    type: String,
    format: 'date-time',
  })
  @TransformStringToDate()
  @IsNotEmpty()
  @IsDate()
  date: Date;

  @ApiProperty({
    description: 'The ID of the table of the order record',
    required: false,
    example: 1,
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  tableId: number;
}
