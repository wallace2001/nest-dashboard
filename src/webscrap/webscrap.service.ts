import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { environment } from 'environment';
import * as fs from 'fs';
import * as path from 'path';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class WebscrapService {
  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
    ) {}

  async getTechs() {
    try {
      const filePath = path.resolve(environment.rootPath, this.configService.getOrThrow('PATH_JSON_LANGUAGES'));
      const data = fs.readFileSync(filePath, 'utf-8');
      
      const techs = JSON.parse(data);

      await this.prisma.techLanguages.createMany({
        data: techs,
        skipDuplicates: true
      });

      return true;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        'Error!', error
      );
    }
  }

  async getLinks() {
    try {
      const filePath = path.resolve(environment.rootPath, this.configService.getOrThrow('PATH_JSON_LINKS'));
      const data = fs.readFileSync(filePath, 'utf-8');
      
      const links = JSON.parse(data);

      await this.prisma.link.createMany({
        data: links,
        skipDuplicates: true
      });

      return true;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        'Error!', error
      );
    }
  }
}

