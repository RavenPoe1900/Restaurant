import { Module } from '@nestjs/common';
import { ClientsController } from './infrastructure/clients.controller';
import { ClientsService } from './application/clients.service';
import { PrismaService } from 'nestjs-prisma';

@Module({
  controllers: [ClientsController],
  providers: [ClientsService, PrismaService],
  exports: [ClientsService],
})
export class ClientsModule {}
