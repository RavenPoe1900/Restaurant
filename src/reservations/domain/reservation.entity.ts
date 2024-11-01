import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';

export class ReservationEntity {
  @ApiProperty({
    description: 'The unique identifier of the reservation',
    example: 1,
    type: Number,
  })
  id: number;

  @ApiProperty({
    description: 'The ID of the client making the reservation',
    example: 1,
    type: Number,
  })
  clientId: number;

  @ApiProperty({
    description: 'The date of the reservation',
    example: '2024-12-25T00:00:00.000Z',
    type: String,
    format: 'date-time',
  })
  date: Date;

  @ApiProperty({
    description: 'The time of the reservation in HH:mm format',
    example: '20:00',
    type: String,
  })
  time: string;

  @ApiProperty({
    description: 'The date when the reservation was created',
    example: '2024-01-01T00:00:00.000Z',
    type: String,
    format: 'date-time',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The date when the reservation was last updated',
    example: '2024-01-10T00:00:00.000Z',
    type: String,
    format: 'date-time',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'The user who created the reservation record',
    required: false,
    example: 'admin',
    type: String,
  })
  createdBy?: string;

  @ApiProperty({
    description: 'The user who last updated the reservation record',
    required: false,
    example: 'admin',
    type: String,
  })
  updatedBy?: string;

  @ApiProperty({
    description: 'The date when the reservation was deleted, if applicable',
    required: false,
    example: '2024-01-15T00:00:00.000Z',
    type: String,
    format: 'date-time',
  })
  deletedAt?: Date;

  @ApiProperty({
    description: 'The user who deleted the reservation record, if applicable',
    required: false,
    example: 'admin',
    type: String,
  })
  deletedBy?: string;

  @ApiProperty({
    description: 'The version of the reservation record for optimistic locking',
    example: 1,
    type: Number,
  })
  version: number;

  @ApiProperty({
    description: 'The ID of the owner of the reservation record',
    required: false,
    example: 1,
    type: Number,
  })
  ownerId?: number;

  @ApiProperty({
    description: 'The ID of the restaurant associated with the reservation',
    required: false,
    example: 1,
    type: Number,
  })
  restaurantId?: number;

  @ApiProperty({
    description: 'Status Reservation',
    example: $Enums.ReservationStatusEnum.CANCELLED,
    enum: $Enums.ReservationStatusEnum,
  })
  status: $Enums.ReservationStatusEnum;
}