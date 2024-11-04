import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { BaseEntity } from 'src/_shared/domain/base.entity';
export class RoleEntity extends BaseEntity implements Role {
  @ApiProperty({ example: 1, description: 'The unique identifier of the role' })
  id: number;

  @ApiProperty({
    description: 'A name of the entity',
    example: 'Admin.',
    type: String,
  })
  name: string;

  @ApiProperty({
    description: 'A detailed description of the entity',
    example: 'This is a detailed description related to the role.',
    type: String,
  })
  description: string;

  @ApiProperty({
    example: 1,
    description: 'The version number of the owner data',
  })
  ownerId: number;

  @ApiProperty({
    example: 1,
    description:
      'The unique identifier of the restaurant associated with the user',
    type: Number,
  })
  restaurantId: number;
}
