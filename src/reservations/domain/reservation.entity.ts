import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Reservation } from '@prisma/client';
import { BaseEntity } from 'src/_shared/domain/base.entity';

export class ReservationEntity extends BaseEntity implements Reservation {
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
    description: 'The ID of the owner of the reservation record',
    required: false,
    example: 1,
    type: Number,
  })
  ownerId: number;

  @ApiProperty({
    description: 'The ID of the restaurant associated with the reservation',
    required: false,
    example: 1,
    type: Number,
  })
  restaurantId: number;

  @ApiProperty({
    description: 'Status Reservation',
    example: $Enums.ReservationStatusEnum.CANCELLED,
    enum: $Enums.ReservationStatusEnum,
  })
  status: $Enums.ReservationStatusEnum;
}
