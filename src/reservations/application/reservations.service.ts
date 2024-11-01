import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PrismaGenericService } from 'src/_shared/generic/prismaService.generic';
import { ReservationEntity } from '../domain/reservation.entity';
import { Prisma } from '@prisma/client';

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
}
