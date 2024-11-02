import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrdersService } from '../application/orders.service';
import {
  createSwagger,
  findOneSwagger,
  updateSwagger,
} from 'src/_shared/infrastructure/swagger/http.swagger';
import { ApiResponseSwagger } from 'src/_shared/infrastructure/swagger/response.swagger';
import { OrderEntity } from '../domain/orders.entity';
import { RequestUser } from 'src/_shared/domain/interface/request-user';
import { WaiterOrderDto } from '../domain/waiterOrders.dtos';
import { $Enums, Prisma } from '@prisma/client';

const controllerName = 'WaiterOrders';
@ApiTags('WaiterOrders')
@Controller({
  path: 'waiterOrders',
  version: '1',
})
export class WaiterOrdersController {
  constructor(private readonly service: OrdersService) {}

  /**
   * Creates a order.
   * @param body DTO of the creation of a order.
   * @returns The created order or an error.
   */

  @HttpCode(HttpStatus.CREATED)
  @ApiResponseSwagger(createSwagger(OrderEntity, controllerName))
  @Post()
  async createOrder(
    @Body() body: WaiterOrderDto,
    @Request() req: RequestUser
  ): Promise<OrderEntity> {
    return await this.service.create({
      data: {
        ...body,
        status: $Enums.OrdenStatusEnum.OPEN,
        ownerId: req.user.userId,
      },
    });
  }

  /**
   * Gets a order by id.
   * @param id ID of the order to retrieve.
   * @returns Order that matches the given id or an error.
   */

  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(findOneSwagger(OrderEntity, controllerName))
  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Request() req: RequestUser
  ): Promise<OrderEntity> {
    return this.service.findOne(
      this.service.waiterFilter(+id, req.user.userId, req.user.restaurantId)
    );
  }

  /**
   * Updates a order. It allows to update any field contained in the DTO object of the order.
   * @param id ID of the order to update.
   * @param UpdateOrderDto Object containing the fields to update.
   * @returns The updated order or an error.
   */

  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponseSwagger(updateSwagger(OrderEntity, controllerName))
  @Patch(':id')
  async updateOrder(
    @Param('id') id: string,
    @Request() req: RequestUser
  ): Promise<OrderEntity> {
    return this.service.waiterOreder(
      +id,
      req.user.userId,
      req.user.restaurantId
    );
  }
}
