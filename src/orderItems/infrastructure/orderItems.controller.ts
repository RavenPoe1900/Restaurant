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
import {
  createSwagger,
  deleteSwagger,
  findOneSwagger,
  findSwagger,
  updateSwagger,
} from 'src/_shared/infrastructure/swagger/http.swagger';
import { ApiResponseSwagger } from 'src/_shared/infrastructure/swagger/response.swagger';
import { OrderItemsService } from '../application/orderItems.service';
import { OrderItemDto, UpdateOrderItemDto } from '../domain/orderItem.dtos';
import { PaginationOrderItemDto } from '../domain/pagination-orderItem.dto';
import { PaginatedResponse } from 'src/_shared/domain/dtos/paginationResponse.dto';
import { OrderItemEntity } from '../domain/orderItem.entity';
import { RequestUser } from 'src/_shared/domain/interface/request-user';

const controllerName = 'OrderItems';
@ApiTags('OrderItems')
@Controller({
  path: 'orderItems',
  version: '1',
})
export class OrderItemsController {
  constructor(private readonly service: OrderItemsService) {}

  /**
   * Creates a orderItem.
   * @param body DTO of the creation of a orderItem.
   * @returns The created orderItem or an error.
   */

  @HttpCode(HttpStatus.CREATED)
  @ApiResponseSwagger(createSwagger(OrderItemDto, controllerName))
  @Post()
  async createOrderItem(@Body() body: OrderItemDto): Promise<OrderItemEntity> {
    return await this.service.create({ data: body });
  }

  /**
   * Gets all orderItems. It allows to filter by any field contained in the DTO object of the orderItem.
   * @param page Number of the page to retrieve.
   * @param limit Limit of orderItems to retrieve.
   * @param filter Filter of the orderItems to be retrieved in stringified JSON format.
   * @returns orderItems that match a given filter or an error.
   */

  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(findSwagger(OrderItemDto, controllerName))
  @Get()
  async findAll(
    @Query() pagination: PaginationOrderItemDto
  ): Promise<PaginatedResponse<OrderItemEntity>> {
    return this.service.findAll({
      skip: pagination.page,
      take: pagination.perPage,
    });
  }

  /**
   * Gets a orderItem by id.
   * @param id ID of the orderItem to retrieve.
   * @returns OrderItem that matches the given id or an error.
   */

  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(findOneSwagger(OrderItemDto, controllerName))
  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Request() req: RequestUser
  ): Promise<OrderItemEntity> {
    return this.service.findOne(this.service.filter(id, req.user.restaurantId));
  }

  /**
   * Updates a orderItem. It allows to update any field contained in the DTO object of the orderItem.
   * @param id ID of the orderItem to update.
   * @param UpdateOrderItemDto Object containing the fields to update.
   * @returns The updated orderItem or an error.
   */

  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponseSwagger(updateSwagger(OrderItemDto, controllerName))
  @Patch(':id')
  async updateOrderItem(
    @Param('id') id: string,
    @Body() updateOrderItemDto: UpdateOrderItemDto,
    @Request() req: RequestUser
  ): Promise<OrderItemEntity> {
    return this.service.update(this.service.filter(id, req.user.restaurantId), {
      data: updateOrderItemDto,
      where: { id: +id },
    });
  }

  /**
   * Deletes a orderItem by id.
   * @param id ID of the orderItem to delete.
   * @returns Null or an error.
   */

  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponseSwagger(deleteSwagger(OrderItemDto, controllerName))
  @Delete(':id')
  async deleteOrderItem(
    @Param('id') id: string,
    @Request() req: RequestUser
  ): Promise<OrderItemEntity> {
    return this.service.remove(
      this.service.filter(id, req.user.restaurantId),
      this.service.filter(id, req.user.restaurantId)
    );
  }
}
