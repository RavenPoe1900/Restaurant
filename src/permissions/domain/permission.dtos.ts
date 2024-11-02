import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Permission } from '@prisma/client';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

type PermissionWithout = Omit<
  Permission,
  | 'id'
  | 'createdAt'
  | 'updatedAt'
  | 'createdBy'
  | 'updatedBy'
  | 'deletedAt'
  | 'deletedAt'
  | 'deletedBy'
  | 'version'
>;

export class PermissionDto implements PermissionWithout {
  @ApiProperty({
    description: 'The name of the path',
    example: '/admin/create',
    type: String,
  })
  @IsString({ message: 'Path must be a string' })
  @IsNotEmpty({ message: 'Path cannot be empty' })
  path: string;

  @ApiProperty({
    description: 'The method type associated with the permission',
    example: 'create',
    type: String,
  })
  @IsString({ message: 'Method must be a string' })
  @IsNotEmpty({ message: 'Method cannot be empty' })
  method: string;

  @ApiProperty({
    description: 'A detailed description of the permission',
    example: 'Allows creating new administrative accounts',
    required: false,
    type: String,
  })
  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Method cannot be empty' })
  description: string;

  @ApiProperty({
    description: 'Indicates whether the permission is currently active',
    example: true,
    type: Boolean,
  })
  @IsBoolean({ message: 'Active must be a boolean' })
  @IsNotEmpty({ message: 'Active cannot be empty' })
  active: boolean;
}

export class UpdatePermissionDto extends PartialType(PermissionDto) {}
