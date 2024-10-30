import { Module } from '@nestjs/common';
import { PermissionsController } from './infrastructure/permissions.controller';
import { PermissionsService } from './application/permissions.service';
import { PrismaService } from 'nestjs-prisma';
import { DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core';

@Module({
  controllers: [PermissionsController],
  providers: [
    PermissionsService,
    PrismaService,
    MetadataScanner,
    Reflector,
    DiscoveryService,
  ],
  exports: [PermissionsService],
})
export class PermissionsModule {}
