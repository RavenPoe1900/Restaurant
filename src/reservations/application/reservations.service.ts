import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PrismaGenericService } from 'src/_shared/generic/prismaService.generic';
import { ReservationEntity } from '../domain/reservation.entity';
import { $Enums, Prisma } from '@prisma/client';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class ReservationsService extends PrismaGenericService<
  ReservationEntity,
  Prisma.ReservationCreateArgs,
  Prisma.ReservationFindUniqueArgs,
  Prisma.ReservationUpdateArgs,
  Prisma.ReservationDeleteArgs,
  Prisma.ReservationFindManyArgs
> {
  private readonly logger = new Logger(ReservationsService.name);
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.reservation);
  }

  @Cron('0 0 * * *')
  async handleCron() {
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    try {
      await this.model.updateMany({
        where: {
          date: {
            gte: now,
            lt: tomorrow,
          },
          status: $Enums.ReservationStatusEnum.PENDING,
        },
        data: {
          status: $Enums.ReservationStatusEnum.NOT_CONFIRMED,
        },
      });
    } catch (error) {
      console.error('Error updating reservations:', error);
    }
  }
}
