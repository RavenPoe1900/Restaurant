import {
  Injectable,
  Logger,
  OnModuleInit,
  RequestMethod,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PrismaGenericService } from 'src/_shared/generic/prismaService.generic';
import { Prisma } from '@prisma/client';
import { PermissionEntity } from '../domain/permission.entity';
import { DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core';
@Injectable()
export class PermissionsService
  extends PrismaGenericService<
    PermissionEntity,
    Prisma.PermissionCreateArgs,
    Prisma.PermissionFindUniqueArgs,
    Prisma.PermissionUpdateArgs,
    Prisma.PermissionDeleteArgs,
    Prisma.PermissionFindManyArgs
  >
  implements OnModuleInit
{
  private readonly logger = new Logger(PermissionsService.name);
  constructor(
    private readonly prismaService: PrismaService,
    private readonly discoveryService: DiscoveryService,
    private readonly metadataScanner: MetadataScanner
  ) {
    super(prismaService.permission);
  }
  getRoutes() {
    const httpMethods = {
      0: 'GET',
      1: 'POST',
      2: 'PUT',
      3: 'DELETE',
      4: 'PATCH',
      5: 'OPTIONS',
      6: 'HEAD',
    };
    const controllers = this.discoveryService.getControllers();
    const routes = [];

    controllers.forEach((controller) => {
      const instance = controller.instance;
      const controllerPath =
        Reflect.getMetadata('path', instance.constructor) || '';

      this.metadataScanner.scanFromPrototype(
        instance,
        Object.getPrototypeOf(instance),
        (methodName: string) => {
          let methodPath = Reflect.getMetadata('path', instance[methodName]);
          const requestMethod = Reflect.getMetadata(
            'method',
            instance[methodName]
          );

          if (methodPath) {
            methodPath =
              methodPath.indexOf('/') === -1 && methodPath.indexOf(':') === -1
                ? '/' + methodPath
                : controllerPath !== '/'
                  ? methodPath
                  : '';
            routes.push({
              path: `/${controllerPath}${methodPath}`,
              method: httpMethods[requestMethod],
            });
          }
        }
      );
    });

    return routes;
  }

  async onModuleInit() {
    const routes: { path: string; method: string }[] = this.getRoutes();
    for (const route of routes) {
      const permissionFilter: Prisma.PermissionUpsertArgs = {
        where: { path_method: { path: route.path, method: route.method } },
        update: {},
        create: {
          path: route.path,
          method: route.method,
          description: '',
          active: true,
        },
      };
      await this.model.upsert(permissionFilter);
    }
  }
}
