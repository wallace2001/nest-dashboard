import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProjectService } from './project.service';
import { ProjectPageResponse, ProjectResponse } from './types/project.types';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { DeleteProjectDto, GetProjectDto, ProjectDto, ProjectPageDto } from './dto/project.dto';
import { Response } from 'src/article/types/article.types';

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
    async getProjectById(
      @Args('getProjectDto') getProjectDto: GetProjectDto,
    ) {
      return await this.projectService.getProjectById(
        getProjectDto.id
      );
    }

    @Mutation(() => Response)
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

    @Mutation(() => Response)
    @UseGuards(AuthGuard)
    async createOrUpdateProjectPage(
      @Context() context: { req: Request },
      @Args('projectPageDto') projectPageDto: ProjectPageDto,
    ) {
      return await this.projectService.createOrUpdateProjectPage(
        projectPageDto,
        context.req,
      );
    }

    @Query(() => ProjectPageResponse)
    @UseGuards(AuthGuard)
    async getProjectPage(
      @Context() context: { req: Request },
    ) {
      return await this.projectService.getProjectPage(
        context.req
      );
    }

    @Mutation(() => Response)
    @UseGuards(AuthGuard)
    async deleteProject(
      @Args('deleteProjectDto') deleteProjectDto: DeleteProjectDto,
    ) {
      return await this.projectService.deleteProject(
        deleteProjectDto,
      );
    }
}
