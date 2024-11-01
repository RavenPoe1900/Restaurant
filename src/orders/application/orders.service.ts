import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PrismaGenericService } from 'src/_shared/generic/prismaService.generic';
import { Prisma } from '@prisma/client';
import { OrderEntity } from '../domain/orders.entity';

@Injectable()
export class OrdersService extends PrismaGenericService<
  OrderEntity,
  Prisma.OrderCreateArgs,
  Prisma.OrderFindUniqueArgs,
  Prisma.OrderUpdateArgs,
  Prisma.OrderDeleteArgs,
  Prisma.OrderFindManyArgs
> {
  private readonly logger = new Logger(OrdersService.name);
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.order);
  }
}
