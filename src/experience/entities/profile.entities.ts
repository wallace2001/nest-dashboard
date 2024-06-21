import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class DateExperience {
  @Field()
  from: Date;

  @Field({ nullable: true })
  to?: Date;
}

@ObjectType()
export class Experience {
  @Field()
  id?: string;

  @Field()
  name: string;

  @Field()
  function: string;

  @Field(() => [DateExperience])
  date: DateExperience[];
}
