import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PrismaGenericService } from 'src/_shared/generic/prismaService.generic';
import { Prisma } from '@prisma/client';
import { OrderItemEntity } from '../domain/orderItem.entity';

@Injectable()
export class OrderItemsService extends PrismaGenericService<
  OrderItemEntity,
  Prisma.OrderItemCreateArgs,
  Prisma.OrderItemFindUniqueArgs,
  Prisma.OrderItemUpdateArgs,
  Prisma.OrderItemDeleteArgs,
  Prisma.OrderItemFindManyArgs
> {
  private readonly logger = new Logger(OrderItemsService.name);
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.orderItem);
  }
  orderItemSelect: Prisma.OrderItemSelect = {
    id: true,
    quantity: true,
    price: true,
    order: {
      select: {
        totalPrice: true,
        status: true,
        date: true,
      },
    },
    date: true,
    createdAt: true,
    updatedAt: true,
    createdBy: true,
    updatedBy: true,
    deletedAt: true,
    deletedBy: true,
    version: true,
    ownerId: true,
    restaurantId: true,
  };
}
