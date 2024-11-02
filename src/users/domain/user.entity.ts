import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { BaseEntity } from 'src/_shared/domain/base.entity';

export class UserEntity extends BaseEntity implements User {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the user',
    type: Number,
  })
  id: number;

  @ApiProperty({
    example: 'john@example.com',
    description: 'The email address of the user',
    type: String,
  })
  email: string;

  @ApiProperty({
    example: '323 2032',
    description: 'Phone of the user',
    type: String,
  })
  phone: string;

  @ApiProperty({
    example: 'John',
    description: 'The first name of the user',
    type: String,
  })
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'The last name of the user',
    type: String,
  })
  lastName: string;

  @ApiProperty({
    example: true,
    description: 'Indicates whether the user account is active or not',
    type: Boolean,
  })
  isActive: boolean;

  @ApiProperty({
    example: 'http://example.com/user/photo.jpg',
    description: "The URL of the user's photo",
    type: String,
  })
  photo: string;

  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the owner of the user',
    type: Number,
  })
  ownerId: number;

  @ApiProperty({
    description: 'Password of the user',
    type: String,
  })
  password: string;

  @ApiProperty({
    example: 1,
    description:
      'The unique identifier of the restaurant associated with the user',
    type: Number,
  })
  restaurantId: number;

  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the role associated with the user',
    type: Number,
  })
  roleId: number;
}
