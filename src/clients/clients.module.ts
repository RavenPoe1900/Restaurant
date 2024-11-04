import { Module } from '@nestjs/common';
import { ClientsController } from './infrastructure/clients.controller';
import { ClientsService } from './application/clients.service';
import { PrismaService } from 'nestjs-prisma';
import { RestaurantsService } from 'src/restaurants/application/restaurants.service';

@Module({
  controllers: [ClientsController],
  providers: [ClientsService, PrismaService, RestaurantsService],
  exports: [ClientsService],
})
export class ClientsModule {}
