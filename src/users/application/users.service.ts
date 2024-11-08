import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PrismaGenericService } from 'src/_shared/generic/prismaService.generic';
import { Prisma, User } from '@prisma/client';
import { UserEntity } from '../domain/user.entity';
import { UserDto } from '../domain/user.dtos';
import { hashPassword } from 'src/_shared/domain/hash';
import { RolesService } from 'src/roles/application/roles.service';

@Injectable()
export class UsersService
  extends PrismaGenericService<
    UserEntity,
    Prisma.UserCreateArgs,
    Prisma.UserFindUniqueArgs,
    Prisma.UserUpdateArgs,
    Prisma.UserDeleteArgs,
    Prisma.UserFindManyArgs
  >
  implements OnModuleInit
{
  private readonly logger = new Logger(UsersService.name);
  constructor(
    private readonly prismaService: PrismaService,
    private readonly rolesService: RolesService
  ) {
    super(prismaService.user);
  }

  userSelect: Prisma.UserSelect = {
    id: true,
    email: true,
    phone: true,
    firstName: true,
    lastName: true,
    isActive: true,
    photo: true,
    createdAt: true,
    updatedAt: true,
    createdBy: true,
    updatedBy: true,
    deletedAt: true,
    deletedBy: true,
    version: true,
    ownerId: true,
    restaurantId: true,
    role: {
      select: {
        name: true,
      },
    },
  };

  async onModuleInit() {
    const hashedPassword = await hashPassword(process.env.PASSWORD);
    const restaurant = await this.prismaService.restaurant.findUnique({
      where: {
        licenseType: process.env.RESTAURANT_LICENSE_TYPE,
      },
    });
    const user = await this.model.upsert({
      where: { email: process.env.EMAIL },
      update: {},
      create: {
        email: process.env.EMAIL,
        password: hashedPassword,
        firstName: process.env.FIRST_NAME,
        lastName: process.env.LAST_NAME,
        role: { connect: { name: 'admin' } },
        restaurantId: restaurant.id,
      },
    });

    await this.rolesService.model.update({
      data: { ownerId: user.id },
      where: { id: user.roleId },
    });
  }

  async createUser(
    createUserDto: UserDto,
    userId: number,
    restaurantId: number
  ): Promise<User> {
    const hashedPassword = await hashPassword(createUserDto.password);
    createUserDto.password = hashedPassword;
    return await this.create({
      data: {
        ...createUserDto,
        ownerId: userId,
        restaurantId: restaurantId,
      },
      select: this.userSelect,
    });
  }
}
