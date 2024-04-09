import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class TechsService {
    constructor(
        private readonly prisma: PrismaService,
      ) {}

      async getAllTechs () {
        
        try {
            return await this.prisma.techLanguages.findMany();
        } catch(err) {
            throw new BadRequestException('Error');
        }
      };
}
