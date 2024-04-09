import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { LinksService } from './links.service';

@Module({
  providers: [LinksService, PrismaService],
})
export class LinksModule {}
