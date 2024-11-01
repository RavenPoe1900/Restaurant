import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PrismaGenericService } from 'src/_shared/generic/prismaService.generic';
import { Prisma } from '@prisma/client';
import { SubReservationEntity } from '../domain/subReservation.entity';

@Injectable()
export class SubReservationsService extends PrismaGenericService<
  SubReservationEntity,
  Prisma.SubReservationCreateArgs,
  Prisma.SubReservationFindUniqueArgs,
  Prisma.SubReservationUpdateArgs,
  Prisma.SubReservationDeleteArgs,
  Prisma.SubReservationFindManyArgs
> {
  private readonly logger = new Logger(SubReservationsService.name);
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.subReservation);
  }
}
