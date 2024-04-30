import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Article {
  @Field()
  id?: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  content: string;

  @Field()
  createdAt?: Date;

  @Field()
  updatedAt?: Date;
}
