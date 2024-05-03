import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Contact {
  @Field()
  id?: string;

  @Field()
  title: string;

  @Field()
  description: string;
}
