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
import { TablesService } from '../application/tables.service';
import { TableDto, UpdateTableDto } from '../domain/table.dtos';
import { PaginationTableDto } from '../domain/pagination-table.dto';
import { PaginatedResponse } from 'src/_shared/domain/dtos/paginationResponse.dto';
import { TableEntity } from '../domain/table.entity';
import { RequestUser } from 'src/_shared/domain/interface/request-user';

const controllerName = 'Tables';
@ApiTags('Tables')
@Controller({
  path: 'tables',
  version: '1',
})
export class TablesController {
  constructor(private readonly service: TablesService) {}

  /**
   * Creates a table.
   * @param body DTO of the creation of a table.
   * @returns The created table or an error.
   */

  @HttpCode(HttpStatus.CREATED)
  @ApiResponseSwagger(createSwagger(TableEntity, controllerName))
  @Post()
  async createTable(@Body() body: TableDto): Promise<TableEntity> {
    return await this.service.create({ data: body });
  }

  /**
   * Gets all tables. It allows to filter by any field contained in the DTO object of the table.
   * @param page Number of the page to retrieve.
   * @param limit Limit of tables to retrieve.
   * @param filter Filter of the tables to be retrieved in stringified JSON format.
   * @returns tables that match a given filter or an error.
   */

  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(findSwagger(TableEntity, controllerName))
  @Get()
  async findAll(
    @Query() pagination: PaginationTableDto
  ): Promise<PaginatedResponse<TableEntity>> {
    return this.service.findAll({
      skip: pagination.page,
      take: pagination.perPage,
    });
  }

  /**
   * Gets a table by id.
   * @param id ID of the table to retrieve.
   * @returns Table that matches the given id or an error.
   */

  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(findOneSwagger(TableEntity, controllerName))
  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Request() req: RequestUser
  ): Promise<TableEntity> {
    return this.service.findOne(this.service.filter(id, req.user.restaurantId));
  }

  /**
   * Updates a table. It allows to update any field contained in the DTO object of the table.
   * @param id ID of the table to update.
   * @param UpdateTableDto Object containing the fields to update.
   * @returns The updated table or an error.
   */

  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponseSwagger(updateSwagger(TableEntity, controllerName))
  @Patch(':id')
  updateTable(
    @Param('id') id: string,
    @Body() updateTableDto: UpdateTableDto,
    @Request() req: RequestUser
  ): Promise<TableEntity> {
    return this.service.updateTable(
      id,
      updateTableDto,
      req.user.userId,
      req.user.restaurantId
    );
  }

  /**
   * Deletes a table by id.
   * @param id ID of the table to delete.
   * @returns Null or an error.
   */

  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponseSwagger(deleteSwagger(TableEntity, controllerName))
  @Delete(':id')
  async deleteTable(
    @Param('id') id: string,
    @Request() req: RequestUser
  ): Promise<TableEntity> {
    return this.service.remove(
      this.service.filter(id, req.user.restaurantId),
      this.service.filter(id, req.user.restaurantId)
    );
  }
}
