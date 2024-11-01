import { ApiProperty } from '@nestjs/swagger';
import { Client } from '@prisma/client';

export class ClientEntity implements Client {
  @ApiProperty({
    description: 'The unique identifier of the client',
    example: 1,
    type: Number,
  })
  id: number;

  @ApiProperty({
    description: 'The name of the client',
    example: 'John Doe',
    type: String,
  })
  name: string;

  @ApiProperty({
    description: 'The email of the client, must be unique',
    example: 'john.doe@example.com',
    type: String,
  })
  email: string;

  @ApiProperty({
    description: 'The ID of the restaurant the client is associated with',
    required: false,
    example: 1,
    type: Number,
  })
  restaurantId: number;

  @ApiProperty({
    description: 'The date when the client was created',
    example: '2024-01-01T00:00:00.000Z',
    type: String,
    format: 'date-time',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The date when the client was last updated',
    example: '2024-01-10T00:00:00.000Z',
    type: String,
    format: 'date-time',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'The user who created the client record',
    required: false,
    example: 'admin',
    type: String,
  })
  createdBy: string;

  @ApiProperty({
    description: 'The user who last updated the client record',
    required: false,
    example: 'admin',
    type: String,
  })
  updatedBy: string;

  @ApiProperty({
    description: 'The date when the client was deleted, if applicable',
    required: false,
    example: '2024-01-15T00:00:00.000Z',
    type: String,
    format: 'date-time',
  })
  deletedAt: Date;

  @ApiProperty({
    description: 'The user who deleted the client record, if applicable',
    required: false,
    example: 'admin',
    type: String,
  })
  deletedBy: string;

  @ApiProperty({
    description: 'The version of the client record for optimistic locking',
    example: 1,
    type: Number,
  })
  version: number;

  @ApiProperty({
    description: 'The ID of the owner of the client record',
    required: false,
    example: 1,
    type: Number,
  })
  ownerId: number;
}
