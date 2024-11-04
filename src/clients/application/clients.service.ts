import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PrismaGenericService } from 'src/_shared/generic/prismaService.generic';
import { ClientStatusEnum, Prisma } from '@prisma/client';
import { ClientEntity } from '../domain/client.entity';
import { ClientDto, UpdateClientDto } from '../domain/client.dtos';
import { RestaurantsService } from 'src/restaurants/application/restaurants.service';

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
  constructor(
    private readonly prismaService: PrismaService,
    private readonly restaurantsService: RestaurantsService
  ) {
    super(prismaService.client);
  }
  clientSelect: Prisma.ClientSelect = {
    id: true,
    name: true,
    email: true,
    restaurant: {
      select: {
        name: true,
        phone: true,
        licenseType: true,
        rating: true,
      },
    },
    numberOfPeople: true,
    createdAt: true,
    updatedAt: true,
    createdBy: true,
    updatedBy: true,
    deletedAt: true,
    deletedBy: true,
    version: true,
    ownerId: true,
    reservations: {
      select: {
        date: true,
        time: true,
        status: true,
      },
    },
  };

  async createClients(body: ClientDto, userId: number, restaurantId: number) {
    const restaurant = await this.restaurantsService.findOne(
      this.restaurantsService.filter(restaurantId + '')
    );
    const currentCapacity =
      restaurant.currentCapacity +
      (body.numberOfPeople ? body.numberOfPeople : 1);
    if (restaurant.capacity - currentCapacity <= -1)
      throw new BadRequestException(
        'Your reservation exceeds the maximum capacity of the restaurant'
      );

    const client = await this.create({
      data: {
        ...body,
        ownerId: userId,
        restaurantId: restaurantId,
      },
      select: this.clientSelect,
    });

    await this.restaurantsService.update(
      this.restaurantsService.filter(restaurantId + ''),
      {
        data: { currentCapacity },
        where: { id: restaurantId },
      }
    );

    return client;
  }

  async updateClients(
    id: string,
    updateClientDto: UpdateClientDto,
    restaurantId: number
  ) {
    const client = await this.update(this.filter(id, restaurantId), {
      data: updateClientDto,
      where: {
        id: +id,
        restaurantId: restaurantId,
        status: updateClientDto.status
          ? ClientStatusEnum.IN_PLACE
          : updateClientDto.status,
      },
      select: this.clientSelect,
    });

    if (updateClientDto.status === ClientStatusEnum.HE_WENT_AWAY) {
      const restaurant = await this.restaurantsService.findOne(
        this.restaurantsService.filter(restaurantId + '')
      );
      const currentCapacity =
        restaurant.currentCapacity - client.numberOfPeople;
      if (restaurant.capacity < currentCapacity)
        throw new BadRequestException(
          'There are problems with the restaurants capacity'
        );
      await this.restaurantsService.update(
        this.restaurantsService.filter(restaurantId + ''),
        {
          data: { currentCapacity: currentCapacity },
          where: { id: restaurantId },
        }
      );
    }
    return client;
  }
}
