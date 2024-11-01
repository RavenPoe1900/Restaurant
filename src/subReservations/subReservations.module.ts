import { Module } from '@nestjs/common';
import { SubReservationsController } from './infrastructure/subReservations.controller';
import { SubReservationsService } from './application/subReservations.service';
import { PrismaService } from 'nestjs-prisma';

@Module({
  controllers: [SubReservationsController],
  providers: [SubReservationsService, PrismaService],
  exports: [SubReservationsService],
})
export class SubReservationsModule {}
