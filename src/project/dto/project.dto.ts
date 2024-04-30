import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class ProjectDto {
  @Field({ nullable: true })
  id?: string;

  @Field()
  @IsNotEmpty({ message: "Project Name is required." })
  @IsString({ message: "Project Name must need to be one string." })
  title: string;

  @Field()
  @IsNotEmpty({ message: "Project description is required." })
  @IsString({ message: "Project description must need to be one string." })
  description: string;

  @Field()
  @IsNotEmpty({ message: "Project image is required." })
  @IsString({ message: "Project image must need to be one string." })
  imageUrl: string;

  @Field()
  content: string;
}

@InputType()
export class DeleteProjectDto {
  @Field()
  @IsNotEmpty({ message: "Project id is required." })
  @IsString({ message: "Project id must need to be one string." })
  id: string;
}

@InputType()
export class GetProjectDto {
  @Field()
  @IsNotEmpty({ message: "Project id is required." })
  @IsString({ message: "Project id must need to be one string." })
  id: string;
}
