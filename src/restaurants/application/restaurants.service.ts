import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PrismaGenericService } from 'src/_shared/generic/prismaService.generic';
import { Prisma } from '@prisma/client';
import { RestaurantEntity } from '../domain/restaurants.entity';

@Injectable()
export class RestaurantsService extends PrismaGenericService<
  RestaurantEntity,
  Prisma.RestaurantCreateArgs,
  Prisma.RestaurantFindUniqueArgs,
  Prisma.RestaurantUpdateArgs,
  Prisma.RestaurantDeleteArgs,
  Prisma.RestaurantFindManyArgs
> {
  private readonly logger = new Logger(RestaurantsService.name);
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.restaurant);
  }
}
