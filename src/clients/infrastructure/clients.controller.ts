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
import { ClientsService } from '../application/clients.service';
import { ClientDto, UpdateClientDto } from '../domain/client.dtos';
import { ClientEntity } from '../domain/client.entity';
import { PaginationClientDto } from '../domain/pagination-client.dto';
import { PaginatedResponse } from 'src/_shared/domain/dtos/paginationResponse.dto';

const controllerName = 'Clients';
@ApiTags('Clients')
@Controller({
  path: 'clients',
  version: '1',
})
export class ClientsController {
  constructor(private readonly service: ClientsService) {}

  /**
   * Creates a client.
   * @param body DTO of the creation of a client.
   * @returns The created client or an error.
   */

  @HttpCode(HttpStatus.CREATED)
  @ApiResponseSwagger(createSwagger(ClientDto, controllerName))
  @Post()
  async createClient(@Body() body: ClientDto): Promise<ClientEntity> {
    return await this.service.create({ data: body });
  }

  /**
   * Gets all orderItems. It allows to filter by any field contained in the DTO object of the client.
   * @param page Number of the page to retrieve.
   * @param limit Limit of orderItems to retrieve.
   * @param filter Filter of the orderItems to be retrieved in stringified JSON format.
   * @returns orderItems that match a given filter or an error.
   */

  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(findSwagger(ClientDto, controllerName))
  @Get()
  async findAll(
    @Query() pagination: PaginationClientDto
  ): Promise<PaginatedResponse<ClientEntity>> {
    return this.service.findAll({
      skip: pagination.page,
      take: pagination.perPage,
    });
  }

  /**
   * Gets a client by id.
   * @param id ID of the client to retrieve.
   * @returns Client that matches the given id or an error.
   */

  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(findOneSwagger(ClientDto, controllerName))
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ClientEntity> {
    return this.service.findOne(this.service.filter(id));
  }

  /**
   * Updates a client. It allows to update any field contained in the DTO object of the client.
   * @param id ID of the client to update.
   * @param UpdateClientDto Object containing the fields to update.
   * @returns The updated client or an error.
   */

  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponseSwagger(updateSwagger(ClientDto, controllerName))
  @Patch(':id')
  async updateClient(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto
  ): Promise<ClientEntity> {
    return this.service.update(this.service.filter(id), {
      data: updateClientDto,
      where: { id: +id },
    });
  }

  /**
   * Deletes a client by id.
   * @param id ID of the client to delete.
   * @returns Null or an error.
   */

  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponseSwagger(deleteSwagger(ClientDto, controllerName))
  @Delete(':id')
  async deleteClient(@Param('id') id: string): Promise<ClientEntity> {
    return this.service.remove(
      this.service.filter(id),
      this.service.filter(id)
    );
  }
}
