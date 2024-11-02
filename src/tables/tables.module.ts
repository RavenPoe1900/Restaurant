import { Module } from '@nestjs/common';
import { TablesController } from './infrastructure/tables.controller';
import { TablesService } from './application/tables.service';
import { PrismaService } from 'nestjs-prisma';

@Module({
  controllers: [TablesController],
  providers: [TablesService, PrismaService],
  exports: [TablesService],
})
export class TablesModule {}
