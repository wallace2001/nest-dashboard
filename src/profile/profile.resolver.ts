import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateProfileDto } from './dto/profile.dto';
import { ProfileService } from './profile.service';
import { CreateProfileResponse, ProfileResponse } from './types/profile.types';

@Resolver('profile')
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => ProfileResponse)
  @UseGuards(AuthGuard)
  async fetchProfile(
    @Context() context: { req: Request },
  ) {
    return await this.profileService.fetchProfile(
      context.req
    );
  }

  @Mutation(() => CreateProfileResponse)
  @UseGuards(AuthGuard)
  async createProfile(
    @Context() context: { req: Request },
    @Args('createProfileDto') createProfileDto: CreateProfileDto,
  ) {
    return await this.profileService.createProfile(
      createProfileDto,
      context.req,
    );
  }
}
