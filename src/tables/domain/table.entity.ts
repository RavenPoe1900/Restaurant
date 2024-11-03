import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Table } from '@prisma/client';
import { BaseEntity } from 'src/_shared/domain/base.entity';

export class TableEntity extends BaseEntity implements Table {
  @ApiProperty({
    description: 'Unique identifier for the table',
    example: 1,
    type: Number,
  })
  id: number;

  @ApiProperty({
    description: 'Table number',
    example: 5,
    type: Number,
  })
  number: number;

  @ApiProperty({
    description: 'ID of the client who owns the table',
    example: 1,
    type: Number,
  })
  clientId: number;

  @ApiProperty({
    description: 'Status Table',
    example: $Enums.TableStatusEnum.CLOSE,
    enum: $Enums.TableStatusEnum,
  })
  status: $Enums.TableStatusEnum;

  @ApiProperty({
    description: 'Owner ID of the table record',
    required: false,
    type: Number,
  })
  ownerId: number;

  @ApiProperty({
    description: 'Restaurant ID associated with the table',
    required: false,
    type: Number,
  })
  restaurantId: number;

  @ApiProperty({
    description: 'Price of the product in the order item',
    example: 25.0,
    type: Number,
  })
  totalPrice: number;
}
