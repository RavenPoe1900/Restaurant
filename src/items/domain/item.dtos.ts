import {
  IsNotEmpty,
  IsString,
  IsPositive,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { ItemEntity } from './item.entity';

type OrderItemWithoutId = Omit<
  ItemEntity,
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

export class ItemDto implements OrderItemWithoutId {
  @ApiProperty({
    description: 'The name of the item',
    example: 'Cheeseburger',
    type: String,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'A brief description of the item',
    example: 'A delicious cheeseburger with lettuce and tomato.',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'The price of the item',
    example: 9.99,
    type: Number,
  })
  @IsPositive()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    description: 'The ID of the items associated with the order',
    required: false,
    example: 1,
    type: Number,
  })
  @IsNumber()
  orderItemId: number;
}

export class UpdateItemDto extends PartialType(ItemDto) {}
