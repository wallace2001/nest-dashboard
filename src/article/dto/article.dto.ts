import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class ArticleDto {
  @Field({ nullable: true })
  id?: string;

  @Field()
  @IsNotEmpty({ message: "Article Name is required." })
  @IsString({ message: "Article Name must need to be one string." })
  title: string;

  @Field()
  @IsNotEmpty({ message: "Article description is required." })
  @IsString({ message: "Article description must need to be one string." })
  description: string;

  @Field()
  content: string;
}

@InputType()
export class DeleteArticleDto {
  @Field()
  @IsNotEmpty({ message: "Article id is required." })
  @IsString({ message: "Article id must need to be one string." })
  id: string;
}

@InputType()
export class GetArticleDto {
  @Field()
  @IsNotEmpty({ message: "Article id is required." })
  @IsString({ message: "Article id must need to be one string." })
  id: string;
}
