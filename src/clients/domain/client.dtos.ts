import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Client } from '@prisma/client';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

type ClientWithout = Omit<
  Client,
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
>;
export class ClientDto implements ClientWithout {
  @ApiProperty({ description: 'The name of the client' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'The email of the client', uniqueItems: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'The ID of the restaurant', required: false })
  @IsNotEmpty()
  @IsInt()
  restaurantId?: number;
}

export class UpdateClientDto extends PartialType(ClientDto) {}
