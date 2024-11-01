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
import { SubReservationsService } from '../application/subReservations.service';
import {
  SubReservationDto,
  UpdateSubReservationDto,
} from '../domain/subReservation.dtos';
import { PaginationSubReservationDto } from '../domain/pagination-subReservation.dto';
import { PaginatedResponse } from 'src/_shared/domain/dtos/paginationResponse.dto';
import { SubReservationEntity } from '../domain/subReservation.entity';

const controllerName = 'SubReservations';
@ApiTags('SubReservations')
@Controller({
  path: 'subReservations',
  version: '1',
})
export class SubReservationsController {
  constructor(private readonly service: SubReservationsService) {}

  /**
   * Creates a subReservation.
   * @param body DTO of the creation of a subReservation.
   * @returns The created subReservation or an error.
   */

  @HttpCode(HttpStatus.CREATED)
  @ApiResponseSwagger(createSwagger(SubReservationDto, controllerName))
  @Post()
  async createSubReservation(
    @Body() body: SubReservationDto
  ): Promise<SubReservationEntity> {
    return await this.service.create({ data: body });
  }

  /**
   * Gets all subReservations. It allows to filter by any field contained in the DTO object of the subReservation.
   * @param page Number of the page to retrieve.
   * @param limit Limit of subReservations to retrieve.
   * @param filter Filter of the subReservations to be retrieved in stringified JSON format.
   * @returns subReservations that match a given filter or an error.
   */

  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(findSwagger(SubReservationDto, controllerName))
  @Get()
  async findAll(
    @Query() pagination: PaginationSubReservationDto
  ): Promise<PaginatedResponse<SubReservationEntity>> {
    return this.service.findAll({
      skip: pagination.page,
      take: pagination.perPage,
    });
  }

  /**
   * Gets a subReservation by id.
   * @param id ID of the subReservation to retrieve.
   * @returns SubReservation that matches the given id or an error.
   */

  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(findOneSwagger(SubReservationDto, controllerName))
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<SubReservationEntity> {
    return this.service.findOne(this.service.filter(id));
  }

  /**
   * Updates a subReservation. It allows to update any field contained in the DTO object of the subReservation.
   * @param id ID of the subReservation to update.
   * @param UpdateSubReservationDto Object containing the fields to update.
   * @returns The updated subReservation or an error.
   */

  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponseSwagger(updateSwagger(SubReservationDto, controllerName))
  @Patch(':id')
  async updateSubReservation(
    @Param('id') id: string,
    @Body() updateSubReservationDto: UpdateSubReservationDto
  ): Promise<SubReservationEntity> {
    return this.service.update(this.service.filter(id), {
      data: updateSubReservationDto,
      where: { id: +id },
    });
  }

  /**
   * Deletes a subReservation by id.
   * @param id ID of the subReservation to delete.
   * @returns Null or an error.
   */

  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponseSwagger(deleteSwagger(SubReservationDto, controllerName))
  @Delete(':id')
  async deleteSubReservation(
    @Param('id') id: string
  ): Promise<SubReservationEntity> {
    return this.service.remove(
      this.service.filter(id),
      this.service.filter(id)
    );
  }
}
