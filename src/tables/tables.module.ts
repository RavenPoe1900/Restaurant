import { Module } from '@nestjs/common';
import { TablesController } from './infrastructure/tables.controller';
import { TablesService } from './application/tables.service';
import { PrismaService } from 'nestjs-prisma';
import { CashierTablesController } from './infrastructure/cashierOrders.controller';
import { OrdersService } from 'src/orders/application/orders.service';

@Module({
  controllers: [TablesController, CashierTablesController],
  providers: [TablesService, PrismaService, OrdersService],
  exports: [TablesService],
})
export class TablesModule {}
