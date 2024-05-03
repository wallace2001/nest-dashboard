import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class ContactDto {
  @Field({ nullable: true })
  id?: string;

  @Field()
  @IsNotEmpty({ message: "Contact Name is required." })
  @IsString({ message: "Contact Name must need to be one string." })
  title: string;

  @Field()
  @IsNotEmpty({ message: "Contact description is required." })
  @IsString({ message: "Contact description must need to be one string." })
  description: string;
}
