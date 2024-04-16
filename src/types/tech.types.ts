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
  id: string;

  @Field()
  name: string;

  @Field()
  icon: string
}

@ObjectType()
export class LinkProfilesResponse {
  @Field()
  id: string;

  @Field(() => TechResponse)
  link: TechResponse | unknown;

  @Field()
  linkUrl: string;

  @Field()
  linkId: string
}