import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PrismaGenericService } from 'src/_shared/generic/prismaService.generic';
import { $Enums, Prisma } from '@prisma/client';
import { TableEntity } from '../domain/table.entity';
import { TotalPricesByOrder } from '../domain/totalPricesByOrder.interface';
import { OrdersService } from 'src/orders/application/orders.service';
import { UpdateTableDto } from '../domain/table.dtos';
import { OrderEntity } from 'src/orders/domain/orders.entity';

@Injectable()
export class TablesService extends PrismaGenericService<
  TableEntity,
  Prisma.TableCreateArgs,
  Prisma.TableFindUniqueArgs,
  Prisma.TableUpdateArgs,
  Prisma.TableDeleteArgs,
  Prisma.TableFindManyArgs
> {
  private readonly logger = new Logger(TablesService.name);
  constructor(
    private readonly prismaService: PrismaService,
    private readonly ordersService: OrdersService
  ) {
    super(prismaService.table);
  }

  cashierFilter(orderId: number, userId: number, restaurantId: number) {
    return {
      where: {
        id: orderId,
        ownerId: userId,
        restaurantId: restaurantId,
      },
    };
  }

  async cashierTable(
    tableId: number,
    userId: number,
    restaurantId: number
  ): Promise<TableEntity> {
    const totalPrice = await this.orderPayment(tableId, userId, restaurantId);
    return this.update(this.filter(tableId + '', restaurantId), {
      data: { status: $Enums.OrdenStatusEnum.CLOSE, totalPrice: totalPrice },
      where: this.cashierFilter(tableId, userId, restaurantId).where,
    });
  }

  async orderPayment(
    tableId: number,
    userId: number,
    restaurantId: number
  ): Promise<number> {
    const orderTotalPrices: TotalPricesByOrder[] = await this.orderTotalPrices(
      tableId,
      userId
    );
    const totalPrice: number = await this.updateOrderAndTotalPrice(
      orderTotalPrices,
      restaurantId
    );
    return totalPrice;
  }

  async orderTotalPrices(
    tableId: number,
    userId: number
  ): Promise<TotalPricesByOrder[]> {
    const filter: Prisma.OrderItemWhereInput = {
      order: {
        tableId: tableId,
        ownerId: userId,
      },
    };
    const totalPricesByOrder = await this.prismaService.orderItem.groupBy({
      by: ['orderId'],
      where: filter,
      _sum: {
        price: true,
      },
    });

    return totalPricesByOrder as TotalPricesByOrder[];
  }

  async updateOrderAndTotalPrice(
    orderTotalPrices: TotalPricesByOrder[],
    restaurantId: number
  ): Promise<number> {
    let totalPrice = 0;

    const updates: Prisma.OrderUpdateArgs[] = [];
    for (let i = 0; i < orderTotalPrices.length; i++) {
      const orderId = orderTotalPrices[i].orderId;
      const newPrice = orderTotalPrices[i]._sum.price;

      const existingOrder: OrderEntity =
        await this.ordersService.model.findUnique({
          where: { id: orderId },
        });

      if (existingOrder && existingOrder.totalPrice === null) {
        updates.push({
          data: { totalPrice: newPrice },
          where: { id: orderId },
        });
        totalPrice += newPrice;
      } else {
        console.warn(
          `Order ${orderId} cannot be updated. Current totalPrice: ${existingOrder?.totalPrice}`
        );
        throw new InternalServerErrorException(
          `Order ${orderId} cannot be updated.`
        );
      }
    }

    const updatePromises = updates.map((update) =>
      this.ordersService.update(
        this.ordersService.filter(update.where.id + '', restaurantId),
        update
      )
    );

    try {
      await Promise.all(updatePromises);
      return totalPrice;
    } catch (error) {
      console.error('Error updating orders:', error);
      throw new InternalServerErrorException('Error updating orders');
    }
  }

  async updateTable(
    tableId: string,
    updateTableDto: UpdateTableDto,
    userId: number,
    restaurantId: number
  ): Promise<TableEntity> {
    let totalPrice = null;
    if (
      updateTableDto.status &&
      !(updateTableDto.status === $Enums.TableStatusEnum.OPEN)
    )
      totalPrice = await this.orderPayment(+tableId, userId, restaurantId);
    return this.update(this.filter(tableId, restaurantId), {
      data: { ...updateTableDto, totalPrice: totalPrice },
      where: { id: +tableId, restaurantId: restaurantId },
    });
  }
}
