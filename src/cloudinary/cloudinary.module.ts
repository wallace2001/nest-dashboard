import { Module } from '@nestjs/common';
import { CloudinaryProvider } from './cloudinary.provider';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryController } from './cloudinary.controller';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [CloudinaryProvider, CloudinaryService, JwtService, PrismaService],
  controllers: [CloudinaryController]
})
export class CloudinaryModule {}
