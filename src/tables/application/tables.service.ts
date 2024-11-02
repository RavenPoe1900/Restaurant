import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PrismaGenericService } from 'src/_shared/generic/prismaService.generic';
import { Prisma } from '@prisma/client';
import { TableEntity } from '../domain/table.entity';

@Injectable()
export class TablesService extends PrismaGenericService<
  TableEntity,
  Prisma.TableCreateArgs,
  Prisma.TableFindUniqueArgs,
  Prisma.TableUpdateArgs,
  Prisma.TableDeleteArgs,
  Prisma.TableFindManyArgs
> {
  private readonly logger = new Logger(TablesService.name);
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.table);
  }
}
