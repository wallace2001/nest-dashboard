import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
class DateDto {
  @Field()
  @IsNotEmpty({ message: "Experience date from is required." })
  @IsString({ message: "Experience date from must need to be one string." })
  // @Transform(({ value }) => value.toISOString())
  // @Type(() => Date)
  // @IsDate()
  from: Date;

  @Field({ nullable: true })
  // @Transform(({ value }) => value.toISOString())
  // @Type(() => Date)
  // @IsDate()
  to: Date;
}

@InputType()
export class CreateExperienceDto {
  @Field({ nullable: true })
  id?: string;

  @Field()
  @IsNotEmpty({ message: "Experience Name is required." })
  @IsString({ message: "Experience Name must need to be one string." })
  name: string;

  @Field()
  @IsNotEmpty({ message: "Experience Function is required." })
  @IsString({ message: "Experience Function must need to be one string." })
  function: string;

  @Field(() => DateDto)
  @IsNotEmpty({ message: "Experience dates is required." })
  date: DateDto | unknown;
}

@InputType()
export class DeleteExperienceDto {
  @Field()
  @IsNotEmpty({ message: "Experience id is required." })
  @IsString({ message: "Experience id must need to be one string." })
  id: string;
}

