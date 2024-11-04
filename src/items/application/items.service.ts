import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PrismaGenericService } from 'src/_shared/generic/prismaService.generic';
import { Prisma } from '@prisma/client';
import { ItemEntity } from '../domain/item.entity';

@Injectable()
export class ItemsService extends PrismaGenericService<
  ItemEntity,
  Prisma.ItemCreateArgs,
  Prisma.ItemFindUniqueArgs,
  Prisma.ItemUpdateArgs,
  Prisma.ItemDeleteArgs,
  Prisma.ItemFindManyArgs
> {
  private readonly logger = new Logger(ItemsService.name);
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.item);
  }
  itemSelect: Prisma.ItemSelect = {
    id: true,
    name: true,
    description: true,
    price: true,
    createdAt: true,
    updatedAt: true,
    createdBy: true,
    updatedBy: true,
    deletedAt: true,
    deletedBy: true,
    version: true,
    restaurantId: true,
};
}
