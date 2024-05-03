import { Field, ObjectType } from "@nestjs/graphql";
import { ErrorType } from "../../types/user.types";
import { DateExperience } from "../entities/profile.entities";

@ObjectType()
export class CreateExperienceResponse {
  @Field()
  message: string;

  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}

@ObjectType()
export class ExperienceResponse {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  function: string;

  @Field(() => DateExperience)
  date: DateExperience;
}

@ObjectType()
export class DeleteExperienceResponse {
  @Field()
  message: string;

  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}
