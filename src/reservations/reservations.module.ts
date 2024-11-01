import { Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { ReservationsController } from './infrastructure/reservations.controller';
import { ReservationsService } from './application/reservations.service';

@Module({
  controllers: [ReservationsController],
  providers: [ReservationsService, PrismaService],
  exports: [ReservationsService],
})
export class ReservationsModule {}
