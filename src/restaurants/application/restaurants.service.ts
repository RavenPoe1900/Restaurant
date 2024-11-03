import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PrismaGenericService } from 'src/_shared/generic/prismaService.generic';
import { Prisma } from '@prisma/client';
import { RestaurantEntity } from '../domain/restaurants.entity';

@Injectable()
export class RestaurantsService
  extends PrismaGenericService<
    RestaurantEntity,
    Prisma.RestaurantCreateArgs,
    Prisma.RestaurantFindUniqueArgs,
    Prisma.RestaurantUpdateArgs,
    Prisma.RestaurantDeleteArgs,
    Prisma.RestaurantFindManyArgs
  >
  implements OnModuleInit
{
  private readonly logger = new Logger(RestaurantsService.name);
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.restaurant);
  }
  async onModuleInit() {
    const userData: Prisma.RestaurantCreateInput = {
      phone: process.env.RESTAURANT_PHONE,
      licenseType: process.env.RESTAURANT_LICENSE_TYPE,
    };
    await this.model.upsert({
      where: { phone: userData.phone, licenseType: userData.licenseType },
      update: {},
      create: {
        ...userData,
      },
    });
  }
}
