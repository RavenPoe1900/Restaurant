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
import {
  createSwagger,
  findOneSwagger,
  updateSwagger,
} from 'src/_shared/infrastructure/swagger/http.swagger';
import { ApiResponseSwagger } from 'src/_shared/infrastructure/swagger/response.swagger';
import { RequestUser } from 'src/_shared/domain/interface/request-user';
import { $Enums, Prisma } from '@prisma/client';
import { CashierTableDto } from '../domain/cashierTable.dtos';
import { TablesService } from '../application/tables.service';
import { TableEntity } from '../domain/table.entity';

const controllerName = 'CashierTables';
@ApiTags('CashierTables')
@Controller({
  path: 'cashierTables',
  version: '1',
})
export class CashierTablesController {
  constructor(private readonly service: TablesService) {}

  /**
   * Creates a order.
   * @param body DTO of the creation of a order.
   * @returns The created order or an error.
   */

  @HttpCode(HttpStatus.CREATED)
  @ApiResponseSwagger(createSwagger(TableEntity, controllerName))
  @Post()
  async createTable(
    @Body() body: CashierTableDto,
    @Request() req: RequestUser
  ): Promise<TableEntity> {
    return await this.service.create({
      data: {
        ...body,
        status: $Enums.TableStatusEnum.OPEN,
        ownerId: req.user.userId,
      },
    });
  }

  /**
   * Gets a order by id.
   * @param id ID of the order to retrieve.
   * @returns Table that matches the given id or an error.
   */

  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(findOneSwagger(TableEntity, controllerName))
  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Request() req: RequestUser
  ): Promise<TableEntity> {
    return this.service.findOne(
      this.service.cashierFilter(+id, req.user.userId, req.user.restaurantId)
    );
  }

  /**
   * Updates a order. It allows to update any field contained in the DTO object of the order.
   * @param id ID of the order to update.
   * @param UpdateTableDto Object containing the fields to update.
   * @returns The updated order or an error.
   */

  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponseSwagger(updateSwagger(TableEntity, controllerName))
  @Patch('close/:id')
  async updateTable(
    @Param('id') id: string,
    @Request() req: RequestUser
  ): Promise<TableEntity> {
    return this.service.cashierTable(
      +id,
      req.user.userId,
      req.user.restaurantId
    );
  }
}
