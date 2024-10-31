import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Permission } from '@prisma/client';
import {
  IsBoolean,
  IsNotEmpty,
  IsString,
} from 'class-validator';

type PermissionWithoutId = Omit<Permission, 'id'>;
export class PermissionDto implements PermissionWithoutId {
  @ApiProperty({
    description: 'The name of the path',
  })
  @IsString({ message: 'path must be a string' })
  @IsNotEmpty({ message: 'path cannot be empty' })
  @IsNotEmpty()
  path: string;

  @ApiProperty({
    description: 'The method type associated with the permission',
  })
  @IsString({ message: 'method must be a string' })
  @IsNotEmpty({ message: 'method cannot be empty' })
  @IsNotEmpty()
  method: string;

  @ApiProperty({
    description: 'A detailed description of the permission',
    example: 'Allows creating new administrative accounts',
    required: false,
  })
  @IsString({ message: 'description must be a string' })
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Indicates whether the permission is currently active',
    example: true,
  })
  @IsBoolean({ message: 'active must be a boolean' })
  @IsNotEmpty()
  active: boolean;
}

export class UpdatePermissionDto extends PartialType(PermissionDto) {}
