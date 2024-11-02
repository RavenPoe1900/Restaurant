import { Module } from '@nestjs/common';
import { AuthService } from './application/auth.service';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './insfractuture/auth.controller';
import { RestaurantsModule } from 'src/restaurants/restaurants.module';

@Module({
  imports: [UsersModule, RestaurantsModule],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
