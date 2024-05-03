import { Field, ObjectType } from "@nestjs/graphql";
import { ErrorType } from "../../types/user.types";

@ObjectType()
export class ContactResponse {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;
}