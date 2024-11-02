import { Module } from '@nestjs/common';
import { OrderItemsService } from './application/orderItems.service';
import { PrismaService } from 'nestjs-prisma';
import { OrderItemsController } from './infrastructure/orderItems.controller';

@Module({
  controllers: [OrderItemsController],
  providers: [OrderItemsService, PrismaService],
  exports: [OrderItemsService],
})
export class OrderItemsModule {}
