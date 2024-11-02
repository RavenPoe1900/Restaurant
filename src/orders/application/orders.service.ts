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
    return this.update(this.filter(orderId + ''), {
      data: { status: $Enums.OrdenStatusEnum.CLOSE },
      where: this.waiterFilter(orderId, userId, restaurantId).where,
    });
  }
}
