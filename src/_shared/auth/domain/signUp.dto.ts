import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LoginDto } from './login.dto';

export class SignUpDto extends LoginDto {
  @ApiProperty({
    description: 'The ID of the restaurant associated with the order',
    required: false,
    example: 1,
    type: Number,
  })
  @IsNumber()
  restaurantId: number;
}
