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
import { RolesService } from '../application/roles.service';
import {
  createSwagger,
  deleteSwagger,
  findOneSwagger,
  findSwagger,
  updateSwagger,
} from 'src/_shared/infrastructure/swagger/http.swagger';
import { ApiResponseSwagger } from 'src/_shared/infrastructure/swagger/response.swagger';
import { UpdateRoleDto, RoleDto } from '../domain/role.dtos';
import { PaginationRoleDto } from '../domain/pagination-role.dto';
import { RoleEntity } from '../domain/role.entity';
import { PaginatedResponse } from 'src/_shared/domain/dtos/paginationResponse.dto';
import { RequestUser } from 'src/_shared/domain/interface/request-user';

const controllerName = 'Roles';
@ApiTags('Roles')
@Controller({
  path: 'roles',
  version: '1',
})
export class RolesController {
  constructor(private readonly service: RolesService) {}

  /**
   * Creates a role.
   * @param body DTO of the creation of a role.
   * @returns The created role or an error.
   */

  @HttpCode(HttpStatus.CREATED)
  @ApiResponseSwagger(createSwagger(RoleEntity, controllerName))
  @Post()
  createRole(
    @Body() body: RoleDto,
    @Request() req: RequestUser
  ): Promise<RoleEntity> {
    return this.service.createService(body, req.user.userId);
  }

  /**
   * Gets all roles. It allows to filter by any field contained in the DTO object of the role.
   * @param page Number of the page to retrieve.
   * @param limit Limit of roles to retrieve.
   * @param filter Filter of the roles to be retrieved in stringified JSON format.
   * @returns roles that match a given filter or an error.
   */

  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(findSwagger(RoleEntity, controllerName))
  @Get()
  findAll(
    @Query() pagination: PaginationRoleDto,
    @Request() req: RequestUser
  ): Promise<PaginatedResponse<RoleEntity>> {
    return this.service.findAll({
      skip: pagination.page,
      take: pagination.perPage,
      select: this.service.roleSelect,
      where: {
        restaurantId: req.user.restaurantId,
      },
    });
  }

  /**
   * Gets a role by id.
   * @param id ID of the role to retrieve.
   * @returns Role that matches the given id or an error.
   */

  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(findOneSwagger(RoleEntity, controllerName))
  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Request() req: RequestUser
  ): Promise<RoleEntity> {
    return this.service.findOne({
      ...this.service.filter(id, req.user.restaurantId),
      select: this.service.roleSelect,
    });
  }

  /**
   * Updates a role. It allows to update any field contained in the DTO object of the role.
   * @param id ID of the role to update.
   * @param UpdateRoleDto Object containing the fields to update.
   * @returns The updated role or an error.
   */

  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponseSwagger(updateSwagger(RoleEntity, controllerName))
  @Patch(':id')
  updateRole(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto,
    @Request() req: RequestUser
  ): Promise<RoleEntity> {
    return this.service.updateService(id, updateRoleDto, req.user.restaurantId);
  }

  /**
   * Deletes a role by id.
   * @param id ID of the role to delete.
   * @returns Null or an error.
   */

  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponseSwagger(deleteSwagger(RoleEntity, controllerName))
  @Delete(':id')
  deleteRole(
    @Param('id') id: string,
    @Request() req: RequestUser
  ): Promise<RoleEntity> {
    return this.service.remove(
      this.service.filter(id, req.user.restaurantId),
      this.service.filter(id, req.user.restaurantId)
    );
  }
}
