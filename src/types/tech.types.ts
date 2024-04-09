import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ErrorType {
  @Field()
  message: string;

  @Field({ nullable: true })
  code?: string;
}

@ObjectType()
export class TechResponse {
  @Field()
  name: string;

  @Field()
  icon: string
}