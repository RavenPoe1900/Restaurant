import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PrismaGenericService } from 'src/_shared/generic/prismaService.generic';
import { $Enums, Prisma } from '@prisma/client';
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

  orderSelect: Prisma.OrderSelect = {
    id: true,
    totalPrice: true,
    date: true,
    status: true,
    createdAt: true,
    updatedAt: true,
    createdBy: true,
    updatedBy: true,
    deletedAt: true,
    deletedBy: true,
    version: true,
    ownerId: true,
    restaurantId: true,
    tableId: true,
    table: {
      select: {
        client: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    },
    items: {
      select: {
        quantity: true,
        price: true,
      },
    },
  };

  waiterFilter(orderId: number, userId: number, restaurantId: number) {
    return {
      where: {
        id: orderId,
        ownerId: userId,
        restaurantId: restaurantId,
      },
    };
  }

  async waiterOreder(
    orderId: number,
    userId: number,
    restaurantId: number
  ): Promise<OrderEntity> {
    const { _sum } = await this.prismaService.orderItem.aggregate({
      _sum: {
        price: true,
      },
      where: { orderId: orderId },
    });
    return this.update(this.filter(orderId + '', restaurantId), {
      data: { status: $Enums.OrdenStatusEnum.CLOSE },
      where: this.waiterFilter(orderId, userId, restaurantId).where,
    });
  }
}
