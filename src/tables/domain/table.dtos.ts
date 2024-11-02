import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { IsDate, IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { TableEntity } from './table.entity';

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
  | 'restarurantId'
>;
export class TableDto implements TableWithoutId {
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

export class UpdateTableDto extends PartialType(TableDto) {}
