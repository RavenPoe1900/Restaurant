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
import { UsersService } from '../application/users.service';
import {
  createSwagger,
  deleteSwagger,
  findOneSwagger,
  findSwagger,
  updateSwagger,
} from 'src/_shared/infrastructure/swagger/http.swagger';
import { ApiResponseSwagger } from 'src/_shared/infrastructure/swagger/response.swagger';
import { UpdateUserDto, UserDto } from '../domain/user.dtos';
import { PaginationUserDto } from '../domain/pagination-user.dto';
import { UserEntity } from '../domain/user.entity';
import { PaginatedResponse } from 'src/_shared/domain/dtos/paginationResponse.dto';
import { RequestUser } from 'src/_shared/domain/interface/request-user';

const controllerName = 'Users';
@ApiTags('Users')
@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  constructor(private readonly service: UsersService) {}

  /**
   * Creates a user.
   * @param body DTO of the creation of a user.
   * @returns The created user or an error.
   */

  @HttpCode(HttpStatus.CREATED)
  @ApiResponseSwagger(createSwagger(UserEntity, controllerName))
  @Post()
  async createUser(
    @Body() body: UserDto,
    @Request() req: RequestUser
  ): Promise<UserEntity> {
    return await this.service.createUser(
      body,
      req.user.userId,
      req.user.restarurantId
    );
  }

  /**
   * Gets all users. It allows to filter by any field contained in the DTO object of the user.
   * @param page Number of the page to retrieve.
   * @param limit Limit of users to retrieve.
   * @param filter Filter of the users to be retrieved in stringified JSON format.
   * @returns users that match a given filter or an error.
   */

  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(findSwagger(UserEntity, controllerName))
  @Get()
  async findAll(
    @Query() pagination: PaginationUserDto,
    @Request() req: RequestUser
  ): Promise<PaginatedResponse<UserEntity>> {
    return this.service.findAll({
      skip: pagination.page,
      take: pagination.perPage,
    });
  }

  /**
   * Gets a user by id.
   * @param id ID of the user to retrieve.
   * @returns User that matches the given id or an error.
   */

  @HttpCode(HttpStatus.OK)
  @ApiResponseSwagger(findOneSwagger(UserEntity, controllerName))
  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Request() req: RequestUser
  ): Promise<UserEntity> {
    return this.service.findOne({
      ...this.service.filter(id),
    });
  }

  /**
   * Updates a user. It allows to update any field contained in the DTO object of the user.
   * @param id ID of the user to update.
   * @param UpdateUserDto Object containing the fields to update.
   * @returns The updated user or an error.
   */

  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponseSwagger(updateSwagger(UserEntity, controllerName))
  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req: RequestUser
  ): Promise<UserEntity> {
    return this.service.update(this.service.filter(id), {
      data: updateUserDto,
      where: { id: +id },
    });
  }

  /**
   * Deletes a user by id.
   * @param id ID of the user to delete.
   * @returns Null or an error.
   */

  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponseSwagger(deleteSwagger(UserEntity, controllerName))
  @Delete(':id')
  async deleteUser(
    @Param('id') id: string,
    @Request() req: RequestUser
  ): Promise<UserEntity> {
    return this.service.remove(
      this.service.filter(id),
      this.service.filter(id)
    );
  }
}
