// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Upsert roles
  await prisma.role.upsert({
    where: { name: 'admin' },
    update: {},
    create: {
      name: 'admin',
      description: 'Administrator role with full access',
    },
  });

  await prisma.role.upsert({
    where: { name: 'user' },
    update: {},
    create: {
      name: 'user',
      description: 'Regular user role with limited accese',
    },
  });

  // Obtener los IDs de los roles
  const adminRoleId = (
    await prisma.role.findUnique({ where: { name: 'Admin' } })
  )?.id;
  const userRoleId = (await prisma.role.findUnique({ where: { name: 'User' } }))
    ?.id;

  // Upsert usuarios y guardar sus IDs
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: 'admin123',
      firstName: 'Admin',
      lastName: 'User',
      isActive: true,
      roleId: adminRoleId,
    },
  });

  await prisma.restaurant.upsert({
    where: { licenseType: 'Type A' },
    update: {},
    create: {
      name: 'Restaurant A',
      phone: '123-456-7890',
      licenseType: 'Type A',
      rating: 5,
      createdBy: 'admin@example.com',
      ownerId: adminUser.id,
      clients: {
        create: [
          {
            name: 'Client A',
            email: 'clientA@example.com',
            ownerId: adminUser.id,
          },
          {
            name: 'Client B',
            email: 'clientB@example.com',
            ownerId: adminUser.id,
          },
        ],
      },
    },
  });

  await prisma.restaurant.upsert({
    where: { licenseType: 'Type B' },
    update: {},
    create: {
      name: 'Restaurant B',
      phone: '098-765-4321',
      licenseType: 'Type B',
      rating: 4,
      createdBy: 'admin@example.com',
      ownerId: adminUser.id,
    },
  });

  await prisma.client.upsert({
    where: { email: 'clientA@example.com' },
    update: {},
    create: {
      name: 'Client A',
      email: 'clientA@example.com',
      ownerId: adminUser.id,
    },
  });

  await prisma.client.upsert({
    where: { email: 'clientB@example.com' },
    update: {},
    create: {
      name: 'Client B',
      email: 'clientB@example.com',
      ownerId: adminUser.id,
    },
  });

  // Upsert mesas
  await prisma.table.upsert({
    where: {
      number_restaurantId: {
        number: 1,
        restaurantId: (
          await prisma.restaurant.findUnique({
            where: { licenseType: 'Type A' },
          })
        )?.id,
      },
    },
    update: {},
    create: {
      number: 1,
      status: 'OPEN',
      restaurantId: (
        await prisma.restaurant.findUnique({
          where: { licenseType: 'Type A' },
        })
      )?.id,
      client: {
        connect: { email: 'clientA@example.com' },
      },
      ownerId: adminUser.id,
    },
  });

  await prisma.table.upsert({
    where: {
      number_restaurantId: {
        number: 2,
        restaurantId: (
          await prisma.restaurant.findUnique({
            where: { licenseType: 'Type A' },
          })
        )?.id,
      },
    },
    update: {},
    create: {
      number: 2,
      status: 'OPEN',
      restaurantId: (
        await prisma.restaurant.findUnique({
          where: { licenseType: 'Type A' },
        })
      )?.id,
      client: {
        connect: { email: 'clientA@example.com' },
      },
      ownerId: adminUser.id,
    },
  });

  await prisma.table.upsert({
    where: {
      number_restaurantId: {
        number: 3,
        restaurantId: (
          await prisma.restaurant.findUnique({
            where: { licenseType: 'Type B' },
          })
        )?.id,
      },
    },
    update: {},
    create: {
      number: 3,
      status: 'OPEN',
      restaurantId: (
        await prisma.restaurant.findUnique({
          where: { licenseType: 'Type B' },
        })
      )?.id,
      client: {
        connect: { email: 'clientA@example.com' },
      },
      ownerId: adminUser.id,
    },
  });

  // Upsert reservas
  await prisma.reservation.upsert({
    where: {
      clientId_restaurantId: {
        clientId: 1,
        restaurantId: (
          await prisma.restaurant.findUnique({
            where: { licenseType: 'Type A' },
          })
        )?.id,
      },
    },
    update: {},
    create: {
      clientId: 1,
      status: 'PENDING',
      date: new Date(),
      time: '19:00',
      restaurantId: (
        await prisma.restaurant.findUnique({
          where: { licenseType: 'Type A' },
        })
      )?.id,
      ownerId: adminUser.id,
    },
  });

  await prisma.reservation.upsert({
    where: {
      clientId_restaurantId: {
        clientId: 2,
        restaurantId: (
          await prisma.restaurant.findUnique({
            where: { licenseType: 'Type A' },
          })
        )?.id,
      },
    },
    update: {},
    create: {
      clientId: 2,
      status: 'CONFIRMED',
      date: new Date(),
      time: '20:00',
      restaurantId: (
        await prisma.restaurant.findUnique({
          where: { licenseType: 'Type A' },
        })
      )?.id,
      ownerId: adminUser.id,
    },
  });

  // Upsert órdenes
  await prisma.order.upsert({
    where: {
      number: 1,
    },
    update: {},
    create: {
      number: 1,
      date: new Date(),
      status: 'OPEN',
      tableId: (
        await prisma.table.findUnique({
          where: {
            number_restaurantId: {
              number: 1,
              restaurantId: (
                await prisma.restaurant.findUnique({
                  where: { licenseType: 'Type A' },
                })
              )?.id,
            },
          },
        })
      )?.id,
      restaurantId: (
        await prisma.restaurant.findUnique({
          where: { licenseType: 'Type A' },
        })
      )?.id,
      items: {
        create: [
          { quantity: 2, price: 25.0, date: new Date(), ownerId: adminUser.id },
          { quantity: 1, price: 50.0, date: new Date(), ownerId: adminUser.id },
        ],
      },
      ownerId: adminUser.id,
    },
  });

  await prisma.order.upsert({
    where: { number: 2 },
    update: {},
    create: {
      date: new Date(),
      number: 2,
      status: 'OPEN',
      tableId: (
        await prisma.table.findUnique({
          where: {
            number_restaurantId: {
              number: 2,
              restaurantId: (
                await prisma.restaurant.findUnique({
                  where: { licenseType: 'Type A' },
                })
              )?.id,
            },
          },
        })
      )?.id,
      restaurantId: (
        await prisma.restaurant.findUnique({
          where: { licenseType: 'Type A' },
        })
      )?.id,
      items: {
        create: [
          { quantity: 3, price: 30.0, date: new Date(), ownerId: adminUser.id },
          { quantity: 1, price: 60.0, date: new Date(), ownerId: adminUser.id },
        ],
      },
      ownerId: adminUser.id,
    },
  });

  console.log('Seed data created successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
