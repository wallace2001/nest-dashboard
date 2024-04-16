import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class UnlinkLinkProfileDto {
  @Field()
  @IsNotEmpty({ message: "Link id is required." })
  @IsString({ message: "Link id must need to be one string." })
  id: string;
}

@InputType()
export class LinkProfileDto {
  @Field()
  @IsNotEmpty({ message: "Link id is required." })
  @IsString({ message: "Link id must need to be one string." })
  id: string;
}

@InputType()
export class LinkDto {
  @Field()
  @IsNotEmpty({ message: "Link id is required." })
  @IsString({ message: "Link id must need to be one string." })
  id: string;

  @Field()
  link?: string;
}