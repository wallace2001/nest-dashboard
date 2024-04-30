import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Image {
  @Field()
  id?: string;

  @Field()
  url: string;
}

@ObjectType()
export class Project {
  @Field()
  id?: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => Image)
  image: Image;

  @Field()
  content: string;

  @Field()
  createdAt?: Date;

  @Field()
  updatedAt?: Date;
}
