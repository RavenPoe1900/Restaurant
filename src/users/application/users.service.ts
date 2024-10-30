import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PrismaGenericService } from 'src/_shared/generic/prismaService.generic';
import { Prisma, User } from '@prisma/client';
import { UserEntity } from '../domain/user.entity';
import { UserDto } from '../domain/user.dtos';
import { hashPassword } from 'src/_shared/domain/hash';

@Injectable()
export class UsersService extends PrismaGenericService<
  UserEntity,
  Prisma.UserCreateArgs,
  Prisma.UserFindUniqueArgs,
  Prisma.UserUpdateArgs,
  Prisma.UserDeleteArgs,
  Prisma.UserFindManyArgs
> {
  private readonly logger = new Logger(UsersService.name);
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.user);
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
        restarurantId: restaurantId,
      },
    });
  }
}
