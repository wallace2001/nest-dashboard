import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProjectService } from './project.service';
import { MessageResponse, ProjectResponse } from './types/project.types';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { DeleteProjectDto, GetProjectDto, ProjectDto } from './dto/project.dto';

@Resolver()
export class ProjectResolver {
    constructor(private readonly projectService: ProjectService) {}

    @Query(() => [ProjectResponse])
    @UseGuards(AuthGuard)
    async getProjects(
      @Context() context: { req: Request },
    ) {
      return await this.projectService.getAllProjects(
        context.req
      );
    }

    @Query(() => ProjectResponse)
    @UseGuards(AuthGuard)
    async getProjectById(
      @Args('getProjectDto') getProjectDto: GetProjectDto,
    ) {
      return await this.projectService.getProjectById(
        getProjectDto.id
      );
    }

    @Mutation(() => MessageResponse)
    @UseGuards(AuthGuard)
    async createOrUpdateProject(
      @Context() context: { req: Request },
      @Args('projectDto') projectDto: ProjectDto,
    ) {
      return await this.projectService.createOrUpdateProject(
        projectDto,
        context.req,
      );
    }

    @Mutation(() => MessageResponse)
    @UseGuards(AuthGuard)
    async deleteProject(
      @Args('deleteProjectDto') deleteProjectDto: DeleteProjectDto,
    ) {
      return await this.projectService.deleteProject(
        deleteProjectDto,
      );
    }
}
