import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { SubReservation } from '@prisma/client';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

type SubReservationWithoutId = Omit<
  SubReservation,
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
export class SubReservationDto implements SubReservationWithoutId {
  restarurantId: number;
  @ApiProperty({ description: 'The ID of the client' })
  @IsNotEmpty()
  @IsInt()
  clientId: number;

  @ApiProperty({ description: 'The date of the sub-reservation' })
  @IsNotEmpty()
  @IsDate()
  date: Date;

  @ApiProperty({ description: 'The time of the sub-reservation' })
  @IsNotEmpty()
  @IsString()
  time: string;
}

export class UpdateSubReservationDto extends PartialType(SubReservationDto) {}
