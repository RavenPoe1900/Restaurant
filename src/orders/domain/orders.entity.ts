import { ApiProperty } from '@nestjs/swagger';

export class OrderEntity {
  @ApiProperty({
    description: 'The unique identifier of the order',
    example: 1,
    type: Number,
  })
  id: number;

  @ApiProperty({
    description: 'The ID of the client placing the order',
    example: 1,
    type: Number,
  })
  clientId: number;

  @ApiProperty({
    description:
      'The total amount of the order in the currency of the restaurant',
    example: 29.99,
    type: Number,
  })
  total: number;

  @ApiProperty({
    description: 'The date when the order was placed',
    example: '2024-12-25T00:00:00.000Z',
    type: String,
    format: 'date-time',
  })
  date: Date;

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
  createdBy?: string;

  @ApiProperty({
    description: 'The user who last updated the order record',
    required: false,
    example: 'admin',
    type: String,
  })
  updatedBy?: string;

  @ApiProperty({
    description: 'The date when the order was deleted, if applicable',
    required: false,
    example: '2024-01-15T00:00:00.000Z',
    type: String,
    format: 'date-time',
  })
  deletedAt?: Date;

  @ApiProperty({
    description: 'The user who deleted the order record, if applicable',
    required: false,
    example: 'admin',
    type: String,
  })
  deletedBy?: string;

  @ApiProperty({
    description: 'The version of the order record for optimistic locking',
    example: 1,
    type: Number,
  })
  version: number;

  @ApiProperty({
    description: 'The ID of the owner of the order record',
    required: false,
    example: 1,
    type: Number,
  })
  ownerId?: number;

  @ApiProperty({
    description: 'The ID of the restaurant associated with the order',
    required: false,
    example: 1,
    type: Number,
  })
  restaurantId?: number;
}
