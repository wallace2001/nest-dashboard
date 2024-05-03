import { Field, ObjectType } from "@nestjs/graphql";
import { ErrorType } from "../../types/user.types";

@ObjectType()
export class CurriculumResponse {
  @Field()
  id: string;

  @Field()
  url: string;
}