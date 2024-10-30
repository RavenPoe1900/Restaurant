import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
export class UserEntity implements User {
  @ApiProperty({ example: 1, description: 'The unique identifier of the user' })
  id: number;

  @ApiProperty({
    example: 'john@example.com',
    description: 'The email address of the user',
  })
  email: string;

  @ApiProperty({
    example: '323 2032',
    description: 'Phone of the user',
  })
  phone: string;

  @ApiProperty({ example: 'John', description: 'The first name of the user' })
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'The last name of the user' })
  lastName: string;

  @ApiProperty({
    example: true,
    description: 'Indicates whether the user account is active or not',
  })
  isActive: boolean;

  @ApiProperty({
    example: 'http://example.com/user/photo.jpg',
    description: "The URL of the user's photo",
  })
  photo: string;

  @ApiProperty({
    example: '2024-04-07T10:00:00Z',
    description: 'The timestamp when the user was created',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-04-07T10:30:00Z',
    description: 'The timestamp when the user was last updated',
  })
  updatedAt: Date;

  @ApiProperty({
    example: 'admin',
    description: 'The username of the user who created this user',
  })
  createdBy: string;

  @ApiProperty({
    example: 'user',
    description: 'The username of the user who last updated this user',
  })
  updatedBy: string;

  @ApiProperty({
    example: '2024-04-07T11:00:00Z',
    description: 'The timestamp when the user was deleted (if applicable)',
  })
  deletedAt: Date;

  @ApiProperty({
    example: 'admin',
    description:
      'The username of the user who deleted this user (if applicable)',
  })
  deletedBy: string;

  @ApiProperty({
    example: 1,
    description: 'The version number of the user data',
  })
  version: number;

  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the owner of the user',
  })
  ownerId: number;

  @ApiProperty({
    description: 'Contraseña del usuario',
    type: String,
  })
  password: string;

  @ApiProperty({
    example: 1,
    description:
      'The unique identifier of the restarurant associated with the user',
  })
  restarurantId: number;
}
