import { Module } from '@nestjs/common';
import { UsersService } from './application/users.service';
import { PrismaService } from 'nestjs-prisma';
import { UsersController } from './infrastructure/users.controller';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
  exports: [UsersService],
})
export class UsersModule {}
