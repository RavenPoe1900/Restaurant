import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PrismaGenericService } from 'src/_shared/generic/prismaService.generic';
import { Prisma } from '@prisma/client';
import { ClientEntity } from '../domain/client.entity';

@Injectable()
export class ClientsService extends PrismaGenericService<
  ClientEntity,
  Prisma.ClientCreateArgs,
  Prisma.ClientFindUniqueArgs,
  Prisma.ClientUpdateArgs,
  Prisma.ClientDeleteArgs,
  Prisma.ClientFindManyArgs
> {
  private readonly logger = new Logger(ClientsService.name);
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.client);
  }
}
