import { Query, Resolver } from '@nestjs/graphql';
import { TechResponse } from 'src/types/tech.types';
import { TechsService } from './techs.service';

@Resolver()
export class TechsResolver {
    constructor(private readonly techsService: TechsService) {}

    @Query(() => [TechResponse])
    async getAllTechs() {
      return await this.techsService.getAllTechs();
    }
}
