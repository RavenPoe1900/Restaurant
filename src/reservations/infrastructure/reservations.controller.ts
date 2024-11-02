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

import { PaginatedResponse } from 'src/_shared/domain/dtos/paginationResponse.dto';
import { ReservationsService } from '../application/reservations.service';
import {
  ReservationDto,
  UpdateReservationDto,
} from '../domain/reservation.dtos';
import { ReservationEntity } from '../domain/reservation.entity';
import { PaginationReservationDto } from '../domain/pagination-reservation.dto';

const controllerName = 'Reservations';
@ApiTags('Reservations')
@Controller({
  path: 'restaurants',
  version: '1',
})
export class ReservationsController {
  constructor(private readonly service: ReservationsService) {}

  /**
   * Creates a reservations.
   * @param body DTO of the creation of a reservations.
   * @returns The created reservations or an error.
   */

  @HttpCode(HttpStatus.CREATED)
  @ApiResponseSwagger(createSwagger(ReservationDto, controllerName))
  @Post()
  async createReservation(
    @Body() body: ReservationDto
  ): Promise<ReservationEntity> {
    return await this.service.create({ data: body });
  }

  /**
   * Gets all restaurants. It allows to filter by any field contained in the DTO object of the reservations.
   * @param page Number of the page to retrieve.
   * @param limit Limit of restaurants to retrieve.
   * @param filter Filter of the restaurants to be retrieved in stringified JSON format.
   * @returns restaurants that match a given filter or an error.
   */

  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(findSwagger(ReservationDto, controllerName))
  @Get()
  async findAll(
    @Query() pagination: PaginationReservationDto
  ): Promise<PaginatedResponse<ReservationEntity>> {
    return this.service.findAll({
      skip: pagination.page,
      take: pagination.perPage,
    });
  }

  /**
   * Gets a reservations by id.
   * @param id ID of the reservations to retrieve.
   * @returns Reservation that matches the given id or an error.
   */

  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(findOneSwagger(ReservationDto, controllerName))
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ReservationEntity> {
    return this.service.findOne(this.service.filter(id));
  }

  /**
   * Updates a reservations. It allows to update any field contained in the DTO object of the reservations.
   * @param id ID of the reservations to update.
   * @param UpdateReservationDto Object containing the fields to update.
   * @returns The updated reservations or an error.
   */

  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponseSwagger(updateSwagger(ReservationDto, controllerName))
  @Patch(':id')
  async updateReservation(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto
  ): Promise<ReservationEntity> {
    return this.service.update(this.service.filter(id), {
      data: updateReservationDto,
      where: { id: +id },
    });
  }

  /**
   * Deletes a reservations by id.
   * @param id ID of the reservations to delete.
   * @returns Null or an error.
   */

  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponseSwagger(deleteSwagger(ReservationDto, controllerName))
  @Delete(':id')
  async deleteReservation(@Param('id') id: string): Promise<ReservationEntity> {
    return this.service.remove(
      this.service.filter(id),
      this.service.filter(id)
    );
  }
}
