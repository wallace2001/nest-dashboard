import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateExperienceDto, DeleteExperienceDto } from './dto/experience.dto';
import { ExperienceService } from './experience.service';
import { CreateExperienceResponse, ExperienceResponse } from './types/experience.types';

@Resolver("experience")
export class ExperienceResolver {
    constructor(private readonly experienceService: ExperienceService) {}

    @Query(() => [ExperienceResponse])
    @UseGuards(AuthGuard)
    async getExperiences(
      @Context() context: { req: Request },
    ) {
      return await this.experienceService.getExperiences(
        context.req
      );
    }

    @Mutation(() => CreateExperienceResponse)
    @UseGuards(AuthGuard)
    async createExperience(
      @Context() context: { req: Request },
      @Args({ name: 'createExperienceDto', type: () => [CreateExperienceDto] }) createExperienceDto: CreateExperienceDto[],
    ) {
      return await this.experienceService.createExperience(
        createExperienceDto,
        context.req,
      );
    }

    @Mutation(() => CreateExperienceResponse)
    @UseGuards(AuthGuard)
    async deleteExperience(
      @Context() context: { req: Request },
      @Args({ name: 'deleteExperienceDto'}) deleteExperienceDto: DeleteExperienceDto,
    ) {
      return await this.experienceService.deleteExperience(
        deleteExperienceDto,
        context.req,
      );
    }
}
