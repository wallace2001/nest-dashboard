import { Field, ObjectType } from "@nestjs/graphql";
import { TechResponse } from "src/types/tech.types";

@ObjectType()
export class Avatar {
  @Field()
  public_id: string;

  @Field()
  url: string;
}

@ObjectType()
export class Profile {
  @Field()
  id?: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  about: string;

  @Field(() => [TechResponse])
  techs: TechResponse[];

  @Field(() => [TechResponse])
  links: TechResponse[];

  @Field()
  createdAt?: Date;

  @Field()
  updatedAt?: Date;
}
