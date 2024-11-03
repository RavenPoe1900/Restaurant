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
import { ItemDto, UpdateItemDto } from '../domain/item.dtos';
import { PaginationItemDto } from '../domain/pagination-item.dto';
import { PaginatedResponse } from 'src/_shared/domain/dtos/paginationResponse.dto';
import { ItemEntity } from '../domain/item.entity';
import { RequestUser } from 'src/_shared/domain/interface/request-user';
import { ItemsService } from '../application/items.service';

const controllerName = 'Items';
@ApiTags('Items')
@Controller({
  path: 'items',
  version: '1',
})
export class ItemsController {
  constructor(private readonly service: ItemsService) {}

  /**
   * Creates a item.
   * @param body DTO of the creation of a item.
   * @returns The created item or an error.
   */

  @HttpCode(HttpStatus.CREATED)
  @ApiResponseSwagger(createSwagger(ItemDto, controllerName))
  @Post()
  async createItem(
    @Body() body: ItemDto,
    @Request() req: RequestUser
  ): Promise<ItemEntity> {
    return await this.service.create({
      data: {
        ...body,
        ownerId: req.user.userId,
        restaurantId: req.user.restaurantId,
      },
      select: this.service.itemSelect,
    });
  }

  /**
   * Gets all items. It allows to filter by any field contained in the DTO object of the item.
   * @param page Number of the page to retrieve.
   * @param limit Limit of items to retrieve.
   * @param filter Filter of the items to be retrieved in stringified JSON format.
   * @returns items that match a given filter or an error.
   */

  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(findSwagger(ItemDto, controllerName))
  @Get()
  async findAll(
    @Query() pagination: PaginationItemDto,
    @Request() req: RequestUser
  ): Promise<PaginatedResponse<ItemEntity>> {
    return this.service.findAll({
      skip: pagination.page,
      take: pagination.perPage,
      where: {
        restaurantId: req.user.restaurantId,
      },
      select: this.service.itemSelect,
    });
  }

  /**
   * Gets a item by id.
   * @param id ID of the item to retrieve.
   * @returns Item that matches the given id or an error.
   */

  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(findOneSwagger(ItemDto, controllerName))
  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Request() req: RequestUser
  ): Promise<ItemEntity> {
    return this.service.findOne({
      ...this.service.filter(id, req.user.restaurantId),
      select: this.service.itemSelect,
    });
  }

  /**
   * Updates a item. It allows to update any field contained in the DTO object of the item.
   * @param id ID of the item to update.
   * @param UpdateItemDto Object containing the fields to update.
   * @returns The updated item or an error.
   */

  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponseSwagger(updateSwagger(ItemDto, controllerName))
  @Patch(':id')
  async updateItem(
    @Param('id') id: string,
    @Body() updateItemDto: UpdateItemDto,
    @Request() req: RequestUser
  ): Promise<ItemEntity> {
    return this.service.update(this.service.filter(id, req.user.restaurantId), {
      data: updateItemDto,
      where: { id: +id, restaurantId: req.user.restaurantId },
      select: this.service.itemSelect,
    });
  }

  /**
   * Deletes a item by id.
   * @param id ID of the item to delete.
   * @returns Null or an error.
   */

  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponseSwagger(deleteSwagger(ItemDto, controllerName))
  @Delete(':id')
  async deleteItem(
    @Param('id') id: string,
    @Request() req: RequestUser
  ): Promise<ItemEntity> {
    return this.service.remove(
      this.service.filter(id, req.user.restaurantId),
      this.service.filter(id, req.user.restaurantId)
    );
  }
}
