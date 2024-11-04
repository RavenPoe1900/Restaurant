import { Transform } from 'class-transformer';
import { BadRequestException } from '@nestjs/common';

export function TransformStringToDate() {
  return Transform(({ value }) => {
    if (typeof value !== 'string') {
      throw new BadRequestException(
        'The date must be a valid string in ISO format.'
      );
    }

    const date = new Date(value);

    if (isNaN(date.getTime())) {
      throw new BadRequestException(
        'The date must be a valid string in ISO format.'
      );
    }

    return date;
  });
}
