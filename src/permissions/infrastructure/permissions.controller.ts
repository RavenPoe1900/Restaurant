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
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PermissionsService } from '../application/permissions.service';
import {
  createSwagger,
  deleteSwagger,
  findOneSwagger,
  findSwagger,
  updateSwagger,
} from 'src/_shared/infrastructure/swagger/http.swagger';
import { ApiResponseSwagger } from 'src/_shared/infrastructure/swagger/response.swagger';
import { UpdatePermissionDto, PermissionDto } from '../domain/permission.dtos';
import { PermissionEntity } from '../domain/permission.entity';
import { PaginationPermissionDto } from '../domain/pagination-permission.dto';
import { PaginatedResponse } from 'src/_shared/domain/dtos/paginationResponse.dto';

const controllerName = 'Permissions';
@ApiTags('Permissions')
@Controller({
  path: 'permissions',
  version: '1',
})
export class PermissionsController {
  constructor(private readonly service: PermissionsService) {}

  /**
   * Creates a permission.
   * @param body DTO of the creation of a permission.
   * @returns The created permission or an error.
   */

  @HttpCode(HttpStatus.CREATED)
  @ApiResponseSwagger(createSwagger(PermissionEntity, controllerName))
  @Post()
  async createPermission(
    @Body() body: PermissionDto,
  ): Promise<PermissionEntity> {
    return await this.service.create({ data: body });
  }

  /**
   * Gets all permissions. It allows to filter by any field contained in the DTO object of the permission.
   * @param page Number of the page to retrieve.
   * @param limit Limit of permissions to retrieve.
   * @param filter Filter of the permissions to be retrieved in stringified JSON format.
   * @returns permissions that match a given filter or an error.
   */

  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(findSwagger(PermissionEntity, controllerName))
  @Get()
  async findAll(
    @Query() pagination: PaginationPermissionDto,
  ): Promise<PaginatedResponse<PermissionEntity>> {
    return this.service.findAll({
      skip: pagination.page,
      take: pagination.perPage,
    });
  }

  /**
   * Gets a permission by id.
   * @param id ID of the permission to retrieve.
   * @returns Permission that matches the given id or an error.
   */

  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(findOneSwagger(PermissionEntity, controllerName))
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PermissionEntity> {
    return this.service.findOne(this.service.filter(id));
  }

  /**
   * Updates a permission. It allows to update any field contained in the DTO object of the permission.
   * @param id ID of the permission to update.
   * @param UpdatePermissionDto Object containing the fields to update.
   * @returns The updated permission or an error.
   */

  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponseSwagger(updateSwagger(PermissionEntity, controllerName))
  @Patch(':id')
  async updatePermission(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ): Promise<PermissionEntity> {
    return this.service.update(this.service.filter(id), {
      data: updatePermissionDto,
      where: { id: +id },
    });
  }

  /**
   * Deletes a permission by id.
   * @param id ID of the permission to delete.
   * @returns Null or an error.
   */

  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponseSwagger(deleteSwagger(PermissionEntity, controllerName))
  @Delete(':id')
  async deletePermission(@Param('id') id: string): Promise<PermissionEntity> {
    return this.service.remove(
      this.service.filter(id),
      this.service.filter(id),
    );
  }
}
