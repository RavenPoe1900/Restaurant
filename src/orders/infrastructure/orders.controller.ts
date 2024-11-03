import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrdersService } from '../application/orders.service';
import {
  createSwagger,
  deleteSwagger,
  findOneSwagger,
  findSwagger,
  updateSwagger,
} from 'src/_shared/infrastructure/swagger/http.swagger';
import { ApiResponseSwagger } from 'src/_shared/infrastructure/swagger/response.swagger';
import { UpdateOrderDto, OrderDto } from '../domain/orders.dtos';
import { PaginationOrderDto } from '../domain/pagination-orders.dto';
import { PaginatedResponse } from 'src/_shared/domain/dtos/paginationResponse.dto';
import { OrderEntity } from '../domain/orders.entity';
import { RequestUser } from 'src/_shared/domain/interface/request-user';

const controllerName = 'Orders';
@ApiTags('Orders')
@Controller({
  path: 'orders',
  version: '1',
})
export class OrdersController {
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
    @Body() body: OrderDto,
    @Request() req: RequestUser
  ): Promise<OrderEntity> {
    return await this.service.create({
      data: { ...body, ownerId: req.user.userId },
    });
  }

  /**
   * Gets all orders. It allows to filter by any field contained in the DTO object of the order.
   * @param page Number of the page to retrieve.
   * @param limit Limit of orders to retrieve.
   * @param filter Filter of the orders to be retrieved in stringified JSON format.
   * @returns orders that match a given filter or an error.
   */

  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(findSwagger(OrderEntity, controllerName))
  @Get()
  async findAll(
    @Query() pagination: PaginationOrderDto
  ): Promise<PaginatedResponse<OrderEntity>> {
    return this.service.findAll({
      skip: pagination.page,
      take: pagination.perPage,
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
    return this.service.findOne(this.service.filter(id, req.user.restaurantId));
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
    @Body() updateOrderDto: UpdateOrderDto,
    @Request() req: RequestUser
  ): Promise<OrderEntity> {
    return this.service.update(this.service.filter(id, req.user.restaurantId), {
      data: updateOrderDto,
      where: { id: +id },
    });
  }

  /**
   * Deletes a order by id.
   * @param id ID of the order to delete.
   * @returns Null or an error.
   */

  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponseSwagger(deleteSwagger(OrderEntity, controllerName))
  @Delete(':id')
  async deleteOrder(
    @Param('id') id: string,
    @Request() req: RequestUser
  ): Promise<OrderEntity> {
    return this.service.remove(
      this.service.filter(id, req.user.restaurantId),
      this.service.filter(id, req.user.restaurantId)
    );
  }
}
