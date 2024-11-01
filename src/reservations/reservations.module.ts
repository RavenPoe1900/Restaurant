import { Module } from '@nestjs/common';
import { ReservationsController } from './infrastructure/reservationss.controller';
import { ReservationsService } from './application/reservationss.service';
import { PrismaService } from 'nestjs-prisma';

@Module({
  controllers: [ReservationsController],
  providers: [ReservationsService, PrismaService],
  exports: [ReservationsService],
})
export class ReservationsModule {}
