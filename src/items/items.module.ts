import { Module } from '@nestjs/common';
import { ItemsService } from './application/items.service';
import { PrismaService } from 'nestjs-prisma';
import { ItemsController } from './infrastructure/items.controller';

@Module({
  controllers: [ItemsController],
  providers: [ItemsService, PrismaService],
  exports: [ItemsService],
})
export class ItemsModule {}
