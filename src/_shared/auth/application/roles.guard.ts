import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { RolesService } from 'src/roles/application/roles.service';
import { IS_PUBLIC_KEY } from '../domain/public.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly rolesService: RolesService,
    private reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    const { user, route } = context.switchToHttp().getRequest();

    let httpMethod: string;

    if (route.get) {
      httpMethod = 'GET';
    } else if (route.post) {
      httpMethod = 'POST';
    } else if (route.put) {
      httpMethod = 'PUT';
    } else if (route.delete) {
      httpMethod = 'DELETE';
    } else {
      throw new UnauthorizedException('Método HTTP no soportado');
    }

    if (user.roleName === 'admin') return true;

    try {
      const roleFilter: Prisma.RoleFindUniqueArgs = {
        where: {
          name: user.roleName,
          permissions: {
            some: {
              path: route.path,
              method: httpMethod,
            },
          },
        },
      };

      const role = await this.rolesService.findOne(roleFilter);

      return true;
    } catch (err) {
      return false;
    }
  }
}
