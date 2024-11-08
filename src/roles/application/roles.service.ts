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
  roleSelect: Prisma.RoleSelect = {
    id: true,
    name: true,
    description: true,
    permissions: {
      select: {
        path: true,
        method: true,
      },
    },
    createdAt: true,
    updatedAt: true,
    createdBy: true,
    updatedBy: true,
    deletedAt: true,
    deletedBy: true,
    ownerId: true,
    version: true,
    restaurantId: true,
  };

  async onModuleInit() {
    const restaurant = await this.prismaService.restaurant.findUnique({
      where: {
        licenseType: process.env.RESTAURANT_LICENSE_TYPE,
      },
    });
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
          restaurantId: restaurant.id,
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
      select: this.roleSelect,
    };
    return await this.create(serviceCreateArgs);
  }

  async updateService(
    id: string,
    updateServiceDto: UpdateRoleDto,
    restaurantId: number
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
    return this.update(this.filter(id, restaurantId), {
      data: roleUpdateInput,
      where: { id: +id, restaurantId: restaurantId },
      select: this.roleSelect,
    });
  }
}
