import { ApiProperty } from '@nestjs/swagger';
import { Permission } from '@prisma/client';
import { BaseEntity } from 'src/_shared/domain/base.entity';

export class PermissionEntity extends BaseEntity implements Permission {
  @ApiProperty({
    description: 'The unique identifier of the permission',
    example: 1,
    type: Number,
  })
  id: number;

  @ApiProperty({
    description: 'The path of the permission',
    example: '/admin/create', // Example value for better documentation
    type: String,
  })
  path: string;

  @ApiProperty({
    description: 'The method type associated with the permission',
    example: 'create',
    type: String,
  })
  method: string;

  @ApiProperty({
    description: 'A detailed description of the permission',
    example: 'Allows creating new administrative accounts',
    required: false,
    type: String,
  })
  description: string; // Marked as optional

  @ApiProperty({
    description: 'Indicates whether the permission is currently active',
    example: true,
    type: Boolean,
  })
  active: boolean;
}
