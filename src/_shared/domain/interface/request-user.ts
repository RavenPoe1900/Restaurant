import { Request } from 'express';
import { ApiProperty } from '@nestjs/swagger';

export class Payload {
  @ApiProperty({
    description: 'Unique identifier of the user',
    example: 1,
  })
  userId: number;

  @ApiProperty({
    description: 'Unique identifier of the restaurant',
    example: 101,
  })
  restaurantId: number;

  @ApiProperty({
    description: 'Role name of the user',
    example: 'admin',
  })
  roleName: string;
}

export class RequestUser extends Request {
  @ApiProperty({
    description: 'User payload containing user details',
    type: Payload,
  })
  user: Payload;
}
