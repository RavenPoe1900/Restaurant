import { ApiProperty } from '@nestjs/swagger';
import { Permission } from '@prisma/client';
export class PermissionEntity implements Permission {
  @ApiProperty({
    description: 'The unique identifier of the permission',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The path of the permission',
  })
  path: string;

  @ApiProperty({
    description: 'The method type associated with the permission',
    example: 'create',
  })
  method: string;

  @ApiProperty({
    description: 'A detailed description of the permission',
    example: 'Allows creating new administrative accounts',
    required: false,
  })
  description: string;

  @ApiProperty({
    description: 'Indicates whether the permission is currently active',
    example: true,
  })
  active: boolean;

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
}
