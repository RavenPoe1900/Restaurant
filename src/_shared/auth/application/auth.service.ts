import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { validatePassword } from 'src/_shared/domain/hash';
import { Payload } from 'src/_shared/domain/interface/request-user';
import { IUserAuth } from 'src/_shared/interface/userAuth.interface';
import { UsersService } from 'src/users/application/users.service';
import { SignUpDto } from '../domain/signUp.dto';
import { RestaurantsService } from 'src/restaurants/application/restaurants.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private restaurantsService: RestaurantsService,
    private jwtService: JwtService
  ) {}

  async login(email: string, pass: string) {
    let user: IUserAuth;
    const findUser: Prisma.UserFindUniqueArgs = {
      where: { email },
      select: {
        id: true,
        restaurantId: true,
        password: true,
        role: {
          select: {
            name: true,
          },
        },
      },
    };
    try {
      user = (await this.usersService.findOne(findUser)) as IUserAuth;
    } catch (e) {
      if (e.message === 'Entity not found') throw new UnauthorizedException();
      throw e;
    }

    if (!(await validatePassword(pass, user.password))) {
      throw new UnauthorizedException();
    }
    const payload: Payload = {
      userId: user.id,
      restaurantId: user.restaurantId,
      roleName: user.role.name,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(signUpDto: SignUpDto) {
    const userData: Prisma.UserCreateInput = signUpDto;
    try {
      const user = (await this.usersService.create({
        data: { ...userData, role: { connect: { name: 'user' } } },
      })) as IUserAuth;
    } catch (e) {
      if (e.message === 'An unexpected error occurred')
        throw new BadRequestException(
          'An unexpected error occurred. Check restaurant id'
        );
      throw e;
    }
  }
}
