import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class LinksService {
    constructor(
        private readonly prisma: PrismaService,
      ) {}

      async getAllLinks () {
        
        try {
            return await this.prisma.link.findMany();
        } catch(err) {
            throw new BadRequestException('Error');
        }
      };
}
