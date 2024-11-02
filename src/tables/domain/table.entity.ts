import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/_shared/domain/base.entity';

export class TableEntity extends BaseEntity {
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
    description: 'Owner ID of the table record',
    required: false,
    type: Number,
  })
  ownerId?: number;

  @ApiProperty({
    description: 'Restaurant ID associated with the table',
    required: false,
    type: Number,
  })
  restaurantId?: number;
}