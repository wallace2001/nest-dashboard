import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { TechsService } from './techs.service';

@Module({
  providers: [TechsService, PrismaService],
})
export class TechsModule {}
