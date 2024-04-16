import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

@InputType()
class LinkResponse {
  @Field()
  id?: string;
  
  @Field()
  name: string;

  @Field()
  icon: string
}

@InputType()
class LinkUpdateResponse {
  @Field({ nullable: true })
  id?: string;
  
  @Field(() => LinkResponse)
  link: LinkResponse | unknown;

  @Field()
  linkUrl: string;
}

@InputType()
class TechsResponse {
  @Field()
  id: string;
  
  @Field()
  name: string;

  @Field()
  icon: string
}

@InputType()
export class UpdateAboutDto {
  @Field()
  id: string;

  @Field()
  about: string;
}

@InputType()
export class CreateProfileDto {
  @Field()
  id?: string;

  @Field()
  @IsNotEmpty({ message: "Profile Name is required." })
  @IsString({ message: "Profile Name must need to be one string." })
  title: string;

  @Field()
  @IsNotEmpty({ message: "Profile description is required." })
  @IsString({ message: "Profile description must need to be one string." })
  description: string;

  // @Field()
  // @IsString({ message: "Profile about must need to be one string." })
  // about?: string;

  @Field(() => [TechsResponse])
  @IsNotEmpty({ message: "Profile techs is required." })
  techs: TechsResponse[] | unknown;

  @Field(() => [LinkResponse])
  @IsNotEmpty({ message: "Profile techs is required." })
  links: LinkResponse[] | unknown;

  @Field(() => [LinkUpdateResponse])
  @IsOptional()
  linksGroup?: LinkUpdateResponse[] | unknown;
}

@InputType()
export class UpdateProfileDto {
  @Field()
  @IsNotEmpty({ message: "Profile Id is required." })
  @IsString({ message: "Profile Id must need to be one string." })
  id: string;

  @Field()
  @IsNotEmpty({ message: "Profile Name is required." })
  @IsString({ message: "Profile Name must need to be one string." })
  title: string;

  @Field()
  @IsNotEmpty({ message: "Profile description is required." })
  @IsString({ message: "Profile description must need to be one string." })
  description: string;

  // @Field()
  // @IsString({ message: "Profile about must need to be one string." })
  // about?: string;

  @Field(() => [TechsResponse])
  @IsNotEmpty({ message: "Profile techs is required." })
  techs: TechsResponse[] | unknown;

  @Field(() => [LinkResponse])
  @IsNotEmpty({ message: "Profile techs is required." })
  links: LinkResponse[] | unknown;
}

@InputType()
export class DeleteProfileDto {
  @Field()
  @IsNotEmpty({ message: "Profile id is required." })
  @IsString({ message: "Profile id must need to be one string." })
  id: string;
}
