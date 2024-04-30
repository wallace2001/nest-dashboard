import { Field, ObjectType } from "@nestjs/graphql";
import { ErrorType } from "../../types/user.types";

@ObjectType()
export class Response {
  @Field()
  message: string;

  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}

@ObjectType()
export class ArticleResponse {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field({ nullable: true })
  content: string;

  @Field()
  createdAt?: Date;

  @Field()
  updatedAt?: Date;
}

@ObjectType()
export class DeleteArticleResponse {
  @Field()
  message: string;

  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}
