import { Field, ObjectType } from "@nestjs/graphql";
import { ErrorType } from "../../types/user.types";
import { Image } from "../entities/project.entities";

@ObjectType()
export class MessageResponse {
  @Field()
  message: string;

  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}

@ObjectType()
export class ProjectResponse {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => [Image])
  images: Image[];

  @Field({ nullable: true })
  content: string;

  @Field()
  createdAt?: Date;

  @Field()
  updatedAt?: Date;
}

@ObjectType()
export class ProjectPageResponse {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;
}

@ObjectType()
export class DeleteProjectResponse {
  @Field()
  message: string;

  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}
