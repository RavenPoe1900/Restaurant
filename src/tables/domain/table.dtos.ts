import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { $Enums, TableStatusEnum } from '@prisma/client';
import { IsEnum } from 'class-validator';
import { TableEntity } from './table.entity';
import { CashierTableDto } from './cashierTable.dtos';

type TableWithoutId = Omit<
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
  | 'totalPrice'
>;
export class TableDto extends CashierTableDto implements TableWithoutId {
  @ApiProperty({
    description: 'Status Table',
    example: TableStatusEnum.CLOSE, // Asegúrate de que esto sea correcto
    enum: TableStatusEnum,
  })
  @IsEnum(TableStatusEnum, {
    message: 'Status must be a valid enum value',
  })
  status: TableStatusEnum;
}

export class UpdateTableDto extends PartialType(TableDto) {}
