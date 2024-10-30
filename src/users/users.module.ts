import { Module } from '@nestjs/common';
import { UsersService } from './application/users.service';
import { PrismaService } from 'nestjs-prisma';
import { UsersController } from './infrastructure/users.controller';
import { RolesService } from 'src/roles/application/roles.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, RolesService],
  exports: [UsersService],
})
export class UsersModule {}
