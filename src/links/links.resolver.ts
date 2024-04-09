import { Query, Resolver } from '@nestjs/graphql';
import { TechResponse } from 'src/types/tech.types';
import { LinksService } from './links.service';

@Resolver()
export class LinksResolver {
    constructor(private readonly techsService: LinksService) {}

    @Query(() => [TechResponse])
    async getAllLinks() {
      return await this.techsService.getAllLinks();
    }
}
