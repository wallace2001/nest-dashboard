import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'prisma/prisma.service';
import { WebscrapController } from './webscrap.controller';
import { WebscrapService } from './webscrap.service';

@Module({
  imports: [HttpModule],
  controllers: [WebscrapController],
  providers: [WebscrapService, ConfigService, PrismaService]
})
export class WebscrapModule {}
