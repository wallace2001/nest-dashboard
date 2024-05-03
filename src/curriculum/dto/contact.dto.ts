import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

@InputType()
export class CurriculumDto {
  @Field({ nullable: true })
  id?: string;

  @Field()
  @IsNotEmpty({ message: "Curriculum Name is required." })
  @IsString({ message: "Curriculum Name must need to be one string." })
  url: string;
}
