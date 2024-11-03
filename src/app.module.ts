import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PermissionsModule } from './permissions/permissions.module';
import { RolesModule } from './roles/roles.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './_shared/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './_shared/auth/application/roles.guard';
import { AuthGuard } from './_shared/auth/application/auth.guard';
import { ClientsModule } from './clients/clients.module';
import { ReservationsModule } from './reservations/reservations.module';
import { ScheduleModule } from '@nestjs/schedule';
import { OrdersModule } from './orders/orders.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { TablesModule } from './tables/tables.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET,
      signOptions: { expiresIn: process.env.EXPIRESIN },
    }),
    RestaurantsModule,
    RolesModule,
    PermissionsModule,
    UsersModule,
    AuthModule,
    ClientsModule,
    ReservationsModule,
    OrdersModule,
    TablesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
