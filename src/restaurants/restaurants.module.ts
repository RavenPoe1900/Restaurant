import { Module } from '@nestjs/common';
import { RestaurantsController } from './infrastructure/restaurants.controller';
import { RestaurantsService } from './application/restaurants.service';
import { PrismaService } from 'nestjs-prisma';

@Module({
  controllers: [RestaurantsController],
  providers: [RestaurantsService, PrismaService],
  exports: [RestaurantsService],
})
export class RestaurantsModule {}
