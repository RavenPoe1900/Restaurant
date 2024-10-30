import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { validatePassword } from 'src/_shared/domain/hash';
import { Payload } from 'src/_shared/domain/interface/request-user';
import { UsersService } from 'src/users/application/users.service';
import { UserEntity } from 'src/users/domain/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string) {
    let user: UserEntity;
    try {
      user = await this.usersService.findOne({ where: { email } });
    } catch (e) {
      if (e.message === 'Entity not found') throw new UnauthorizedException();
      throw e;
    }

    if (!await validatePassword(pass, user.password)) {
      throw new UnauthorizedException();
    }
    const payload: Payload = {
      userId: user.id,
      restarurantId: user.restarurantId,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
