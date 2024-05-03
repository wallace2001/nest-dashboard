import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurriculumService } from './curriculum.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurriculumDto } from './dto/contact.dto';
import { CurriculumResponse } from './types/contact.types';
import { Response } from 'src/article/types/article.types';

@Resolver()
export class CurriculumResolver {
    constructor(private readonly curriculumService: CurriculumService) {}

    @Mutation(() => Response)
    @UseGuards(AuthGuard)
    async createOrUpdateCurriculum(
      @Context() context: { req: Request },
      @Args('curriculumDto') curriculumDto: CurriculumDto,
    ) {
      return await this.curriculumService.createOrUpdateCurriculum(
        curriculumDto,
        context.req,
      );
    }

    @Query(() => CurriculumResponse)
    @UseGuards(AuthGuard)
    async getCurriculum(
        @Context() context: { req: Request },
    ) {
      return await this.curriculumService.getCurriculumBy(context.req);
    }
}
