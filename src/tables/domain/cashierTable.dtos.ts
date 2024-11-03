import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
import { TableEntity } from './table.entity';

type CashierTableWithoutId = Omit<
  TableEntity,
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
  | 'totalPrice'
>;
export class CashierTableDto implements CashierTableWithoutId {
  @ApiProperty({
    description: 'Table number',
    example: 5,
    type: Number,
  })
  @IsInt({ message: 'Table number must be an integer' })
  @IsNotEmpty({ message: 'Table number cannot be empty' })
  number: number;

  @ApiProperty({
    description: 'ID of the client who owns the table',
    example: 1,
    type: Number,
  })
  @IsInt({ message: 'Client ID must be an integer' })
  @IsNotEmpty({ message: 'Client ID cannot be empty' })
  clientId: number;
}

export class CashierUpdateTableDto extends PartialType(CashierTableDto) {}
