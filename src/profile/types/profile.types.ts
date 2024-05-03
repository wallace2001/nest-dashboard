import { Field, ObjectType } from "@nestjs/graphql";
import { ProfileUser } from "prisma/prisma-client";
import { LinkProfilesResponse, TechResponse } from "src/types/tech.types";
import { ErrorType } from "../../types/user.types";
import { Avatar, Profile } from "../entities/profile.entities";

@ObjectType()
export class CreateProfileResponse {
  @Field()
  message: string;

  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}

@ObjectType()
export class ProfileResponse {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field({ nullable: true })
  about: string;

  @Field(() => [TechResponse])
  techs: TechResponse[];

  @Field(() => [TechResponse])
  links: TechResponse[];

  @Field(() => [LinkProfilesResponse])
  linkProfiles: LinkProfilesResponse[];
}
@ObjectType()
export class LoggedInPortfolioProfileResponse {
  @Field(() => [Profile], { nullable: true })
  profile: ProfileUser;

  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}

@ObjectType()
export class DeleteProfileUserResponse {
  @Field()
  message: string;

  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}
