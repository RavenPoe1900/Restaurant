import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PrismaGenericService } from 'src/_shared/generic/prismaService.generic';
import { Prisma } from '@prisma/client';
import { RoleEntity } from '../domain/role.entity';
import { RoleDto, UpdateRoleDto } from '../domain/role.dtos';

@Injectable()
export class RolesService
  extends PrismaGenericService<
    RoleEntity,
    Prisma.RoleCreateArgs,
    Prisma.RoleFindUniqueArgs,
    Prisma.RoleUpdateArgs,
    Prisma.RoleDeleteArgs,
    Prisma.RoleFindManyArgs
  >
  implements OnModuleInit
{
  private readonly logger = new Logger(RolesService.name);
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.role);
  }
  async onModuleInit() {
    const roles = [
      { name: 'admin', description: 'Administrator role with full access' },
      { name: 'user', description: 'Regular user role with limited access' },
    ];

    for (const role of roles) {
      await this.model.upsert({
        where: { name: role.name },
        update: {},
        create: {
          name: role.name,
          description: role.description,
        },
      });
    }
  }

  async createService(body: RoleDto, userId: number) {
    const { permissions, ...data } = body;
    const permissionCreateNested: Prisma.PermissionCreateNestedManyWithoutRolesInput =
      permissions
        ? {
            connect: permissions.map((subServiceId) => ({ id: subServiceId })),
          }
        : undefined;
    const serviceCreateArgs: Prisma.RoleCreateArgs = {
      data: {
        ...data,
        permissions: permissionCreateNested,
        ownerId: userId,
      },
    };
    return await this.create(serviceCreateArgs);
  }

  async updateService(
    id: string,
    updateServiceDto: UpdateRoleDto,
    userID: number
  ) {
    const { permissionsToRemove, permissionsToAdd, ...data } = updateServiceDto;
    const roleUpdateInput: Prisma.RoleUpdateInput = {
      ...data,
      permissions: {
        disconnect: permissionsToRemove
          ? permissionsToRemove.map((personId) => ({ id: personId }))
          : undefined,
        connect: permissionsToAdd
          ? permissionsToAdd.map((personId) => ({ id: personId }))
          : undefined,
      },
    };
    return this.update(this.filter(id), {
      data: roleUpdateInput,
      where: { id: +id },
    });
  }
}
