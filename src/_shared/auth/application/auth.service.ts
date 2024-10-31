import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { validatePassword } from 'src/_shared/domain/hash';
import { Payload } from 'src/_shared/domain/interface/request-user';
import { IUserAuth } from 'src/_shared/interface/userAuth.interface';
import { UsersService } from 'src/users/application/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(email: string, pass: string) {
    let user: IUserAuth;
    const findUser: Prisma.UserFindUniqueArgs = {
      where: { email },
      select: {
        id: true,
        restarurantId: true,
        password: true,
        role: {
          select: {
            name: true,
          },
        },
      },
    };
    try {
      user = await this.usersService.findOne(findUser) as IUserAuth;
    } catch (e) {
      if (e.message === 'Entity not found') throw new UnauthorizedException();
      throw e;
    }

    if (!(await validatePassword(pass, user.password))) {
      throw new UnauthorizedException();
    }
    const payload: Payload = {
      userId: user.id,
      restarurantId: user.restarurantId,
      roleName: user.role.name,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
