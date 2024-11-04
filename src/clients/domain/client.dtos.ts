import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import { ClientEntity } from './client.entity';
import { ClientStatusEnum } from '@prisma/client';

type ClientWithout = Omit<
  ClientEntity,
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
  | 'restaurantId'
  | 'status'
>;
export class ClientDto implements ClientWithout {
  @ApiProperty({
    description: 'The name of the client',
    example: 'John Doe',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The email of the client, must be unique',
    example: 'john.doe@example.com',
    type: String,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The age of the user',
    example: 30,
    type: Number,
  })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  @Min(16)
  age: number;

  @ApiProperty({
    description: 'The number of people who come with the client',
    example: 1,
    type: Number,
  })
  @IsInt()
  @IsPositive()
  @IsOptional()
  @Min(1)
  numberOfPeople: number;
}

export class UpdateClientDto extends PartialType(ClientDto) {
  @ApiProperty({
    description: 'Status Reservation',
    example: ClientStatusEnum.HE_WENT_AWAY,
    enum: ClientStatusEnum,
  })
  @IsOptional()
  @IsEnum(ClientStatusEnum, {
    message: 'Name must be a valid enum value',
  })
  status: ClientStatusEnum;
}
