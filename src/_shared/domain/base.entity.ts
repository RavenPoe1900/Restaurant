import { ApiProperty } from '@nestjs/swagger';

export class BaseEntity {
  @ApiProperty({
    description: 'The date when the order was created',
    example: '2024-01-01T00:00:00.000Z',
    type: String,
    format: 'date-time',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The date when the order was last updated',
    example: '2024-01-10T00:00:00.000Z',
    type: String,
    format: 'date-time',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'The user who created the order record',
    required: false,
    example: 'admin',
    type: String,
  })
  createdBy: string;

  @ApiProperty({
    description: 'The user who last updated the order record',
    required: false,
    example: 'admin',
    type: String,
  })
  updatedBy: string;

  @ApiProperty({
    description: 'The date when the order was deleted, if applicable',
    required: false,
    example: '2024-01-15T00:00:00.000Z',
    type: String,
    format: 'date-time',
  })
  deletedAt: Date;

  @ApiProperty({
    description: 'The user who deleted the order record, if applicable',
    required: false,
    example: 'admin',
    type: String,
  })
  deletedBy: string;

  @ApiProperty({
    description: 'The version of the order record for optimistic locking',
    example: 1,
    type: Number,
  })
  version: number;
}
