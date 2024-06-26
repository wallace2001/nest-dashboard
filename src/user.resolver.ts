import { BadRequestException, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Request, Response } from 'express';
import {
  ActivationDto,
  ForgotPasswordDto,
  RegisterDto,
  ResetPasswordDto,
  UserDto,
} from './dto/user.dto';
import { User, UserAdvanced } from './entities/user.entities';
import { AuthGuard } from './guards/auth.guard';
import {
  ActivationResponse,
  ForgotPasswordResponse,
  LoginResponse,
  LogoutResponse,
  RegisterResponse,
  ResetPasswordResponse,
} from './types/user.types';
import { UsersService } from './user.service';
import { MessageResponse } from './project/types/project.types';

@Resolver('User')
// @UseFilters
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Mutation(() => RegisterResponse)
  async register(
    @Args('registerDto') registerDto: RegisterDto,
    @Context() context: { res: Response },
  ): Promise<RegisterResponse> {
    if (!registerDto.name || !registerDto.email || !registerDto.password) {
      throw new BadRequestException('Please fill the all fields');
    }

    const { activation_token } = await this.userService.register(
      registerDto,
      context.res,
    );

    return { activation_token };
  }

  @Mutation(() => ActivationResponse)
  async activateUser(
    @Args('activationDto') activationDto: ActivationDto,
    @Context() context: { res: Response },
  ): Promise<ActivationResponse> {
    return await this.userService.activateUser(activationDto, context.res);
  }

  @Mutation(() => LoginResponse)
  async Login(
    @Args('email') email: string,
    @Args('password') password: string,
    @Context() context: { res: Response }
  ): Promise<LoginResponse> {
    return await this.userService.Login({ email, password }, context.res);
  }

  @Mutation(() => MessageResponse)
  @UseGuards(AuthGuard)
  async updateUser(
    @Args('userDto') userDto: UserDto,
    @Context() context: { req: Request }
  ): Promise<MessageResponse> {
    return await this.userService.updateUser(userDto, context.req);
  }

  @Query(() => LoginResponse)
  @UseGuards(AuthGuard)
  async getLoggedInUser(@Context() context: { req: Request, res: Response }) {
    return await this.userService.getLoggedInUser(context.req);
  }

  @Query(() => LoginResponse)
  async getUserById(
    @Args('userId') userId: string
  ) {
    return await this.userService.getUserById(userId);
  }

  @Query(() => UserAdvanced)
  async getUser(
    @Args('name') name: string,
  ) {
    return await this.userService.getUser(
      name
    );
  }

  @Query(() => LoginResponse)
  async getUserByEmail(
    @Args('email') email: string
  ) {
    return await this.userService.getUserByEmail(email);
  }

  @Mutation(() => ForgotPasswordResponse)
  async forgotPassword(
    @Args('forgotPasswordDto') forgotPasswordDto: ForgotPasswordDto,
  ): Promise<ForgotPasswordResponse> {
    return await this.userService.forgotPassword(forgotPasswordDto);
  }

  @Mutation(() => ResetPasswordResponse)
  async resetPassword(
    @Args('resetPasswordDto') resetPasswordDto: ResetPasswordDto,
  ): Promise<ResetPasswordResponse> {
    return await this.userService.resetPassword(resetPasswordDto);
  }

  @Query(() => LogoutResponse)
  @UseGuards(AuthGuard)
  async logOutUser(@Context() context: { req: Request }) {
    return await this.userService.Logout(context.req);
  }

  @Query(() => [User])
  async getUsers() {
    return this.userService.getUsers();
  }
}
