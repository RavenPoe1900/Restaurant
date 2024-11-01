import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PermissionsService } from 'src/permissions/application/permissions.service';
import { RolesService } from 'src/roles/application/roles.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly permissionsService: PermissionsService,
    private readonly rolesService: RolesService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
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
