import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateProfileResponse } from 'src/profile/types/profile.types';
import { TechResponse } from 'src/types/tech.types';
import { LinkProfileDto, UnlinkLinkProfileDto } from './dto/link.dto';
import { LinksService } from './links.service';
@Resolver()
export class LinksResolver {
    constructor(private readonly techsService: LinksService) {}

    @Query(() => [TechResponse])
    async getAllLinks() {
      return await this.techsService.getAllLinks();
    }

    @Mutation(() => CreateProfileResponse)
    @UseGuards(AuthGuard)
    async unlinkLinkProfile(
      @Context() context: { req: Request },
      @Args("unlinkLinkProfileDto") unlinkLinkProfileDto: UnlinkLinkProfileDto 
    ) {
      return await this.techsService.unlinkLinkProfile(unlinkLinkProfileDto, context.req);
    }

    @Mutation(() => CreateProfileResponse)
    @UseGuards(AuthGuard)
    async linkProfile(
      @Context() context: { req: Request },
      @Args("linkProfileDto") linkProfileDto: LinkProfileDto 
    ) {
      return await this.techsService.linkProfile(linkProfileDto, context.req);
    }
}
