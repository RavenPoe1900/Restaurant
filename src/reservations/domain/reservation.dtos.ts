import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Reservation } from '@prisma/client';
import { IsDate, IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';

type ReservationWithout = Omit<
  Reservation,
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
export class ReservationDto implements ReservationWithout {
  @ApiProperty({
    description: 'The ID of the client making the reservation',
    example: 1,
    type: Number,
  })
  @IsNotEmpty()
  @IsInt()
  clientId: number;

  @ApiProperty({
    description: 'The date of the reservation',
    example: '2024-12-25T00:00:00.000Z',
    type: String,
    format: 'date-time',
  })
  @IsNotEmpty()
  @IsDate()
  date: Date;

  @ApiProperty({
    description: 'The time of the reservation in HH:mm format',
    example: '20:00',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  time: string;

  @ApiProperty({
    description: 'Status Reservation',
    example: $Enums.ReservationStatusEnum.PENDING,
    enum: $Enums.ReservationStatusEnum,
  })
  @IsEnum($Enums.ReservationStatusEnum, {
    message: 'Name must be a valid enum value',
  })
  status: $Enums.ReservationStatusEnum;
}

export class UpdateReservationDto extends PartialType(ReservationDto) {}
