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
import { RestaurantsService } from '../application/restaurants.service';
import { RestaurantDto, UpdateRestaurantDto } from '../domain/restaurants.dtos';
import { PaginationRestaurantDto } from '../domain/pagination-restaurants.dto';
import { PaginatedResponse } from 'src/_shared/domain/dtos/paginationResponse.dto';
import { RestaurantEntity } from '../domain/restaurants.entity';
import { RequestUser } from 'src/_shared/domain/interface/request-user';

const controllerName = 'Restaurants';
@ApiTags('Restaurants')
@Controller({
  path: 'restaurants',
  version: '1',
})
export class RestaurantsController {
  constructor(private readonly service: RestaurantsService) {}

  /**
   * Creates a restaurant.
   * @param body DTO of the creation of a restaurant.
   * @returns The created restaurant or an error.
   */

  @HttpCode(HttpStatus.CREATED)
  @ApiResponseSwagger(createSwagger(RestaurantDto, controllerName))
  @Post()
  async createRestaurant(
    @Body() body: RestaurantDto
  ): Promise<RestaurantEntity> {
    return await this.service.create({ data: body });
  }

  /**
   * Gets all restaurants. It allows to filter by any field contained in the DTO object of the restaurant.
   * @param page Number of the page to retrieve.
   * @param limit Limit of restaurants to retrieve.
   * @param filter Filter of the restaurants to be retrieved in stringified JSON format.
   * @returns restaurants that match a given filter or an error.
   */

  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(findSwagger(RestaurantDto, controllerName))
  @Get()
  async findAll(
    @Query() pagination: PaginationRestaurantDto
  ): Promise<PaginatedResponse<RestaurantEntity>> {
    return this.service.findAll({
      skip: pagination.page,
      take: pagination.perPage,
    });
  }

  /**
   * Gets a restaurant by id.
   * @param id ID of the restaurant to retrieve.
   * @returns Restaurant that matches the given id or an error.
   */

  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(findOneSwagger(RestaurantDto, controllerName))
  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Request() req: RequestUser
  ): Promise<RestaurantEntity> {
    return this.service.findOne(this.service.filter(id, req.user.restaurantId));
  }

  /**
   * Updates a restaurant. It allows to update any field contained in the DTO object of the restaurant.
   * @param id ID of the restaurant to update.
   * @param UpdateRestaurantDto Object containing the fields to update.
   * @returns The updated restaurant or an error.
   */

  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponseSwagger(updateSwagger(RestaurantDto, controllerName))
  @Patch(':id')
  async updateRestaurant(
    @Param('id') id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
    @Request() req: RequestUser
  ): Promise<RestaurantEntity> {
    return this.service.update(this.service.filter(id, req.user.restaurantId), {
      data: updateRestaurantDto,
      where: { id: +id },
    });
  }

  /**
   * Deletes a restaurant by id.
   * @param id ID of the restaurant to delete.
   * @returns Null or an error.
   */

  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponseSwagger(deleteSwagger(RestaurantDto, controllerName))
  @Delete(':id')
  async deleteRestaurant(
    @Param('id') id: string,
    @Request() req: RequestUser
  ): Promise<RestaurantEntity> {
    return this.service.remove(
      this.service.filter(id, req.user.restaurantId),
      this.service.filter(id, req.user.restaurantId)
    );
  }
}
