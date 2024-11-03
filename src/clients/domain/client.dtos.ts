import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Client } from '@prisma/client';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsPositive,
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
  age: number;
}

export class UpdateClientDto extends PartialType(ClientDto) {}
