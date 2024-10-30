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
    private readonly metadataScanner: MetadataScanner,
    private readonly reflector: Reflector
  ) {
    super(prismaService.permission);
  }

  async onModuleInit() {
    // Aquí escaneamos las rutas y las guardamos en la base de datos
    const routes: { path: string; method: RequestMethod; handler: string }[] =
      this.scanEndpoints();

    for (const route of routes) {
      const sd: Prisma.PermissionUpsertArgs = {
        where: { path_handler: { path: route.path, handler: route.handler } },
        update: {},
        create: {
          path: route.path,
          handler: route.handler,
          description: '',
          active: true,
        },
      };
      await this.model.upsert(sd);
    }
  }

  private scanEndpoints() {
    let endpoints: { path: string; method: RequestMethod; handler: string }[] =
      [];

    const controllers = this.discoveryService.getControllers();

    controllers.forEach((controller) => {
      const controllerPath =
        this.reflector.get<string>('path', controller.metatype) || '';

      this.metadataScanner.scanFromPrototype<object, any>(
        controller.instance,
        controller.metatype.prototype,
        (methodName: string) => {
          // Callback now accepts methodName: string
          const method = controller.instance[methodName]; // Get the method using the name
          const routePath = this.reflector.get<string>('path', method) || '';
          const httpMethod = this.reflector.get<RequestMethod>(
            'httpMethod',
            method
          );

          if (routePath) {
            endpoints.push({
              path: `${controllerPath}${routePath}`,
              method: httpMethod,
              handler: methodName, // Use methodName as handler
            });
          }
        }
      );
    });
    return endpoints;
  }
}
