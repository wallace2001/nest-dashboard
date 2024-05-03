import { Optional } from '@nestjs/common';
import { ObjectType, Field, Directive } from '@nestjs/graphql';
import { DateExperience } from 'src/experience/entities/profile.entities';

@ObjectType()
@Directive('@key(fields:"id")')
export class Avatars {
  @Field()
  id: string;

  @Field()
  url: string;

  @Field()
  userId: string;
}

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field(() => Avatars, { nullable: true })
  avatar?: Avatars | null;

  @Field()
  role: string;

  @Field({ nullable: true })
  address: string;

  @Field({ nullable: true })
  phone_number: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@ObjectType()
export class Experience{
  @Field()
  name: string;

  @Field(() => DateExperience)
  date: DateExperience;
}

@ObjectType()
export class Tech {
  @Field()
  name: string;

  @Field()
  icon: string
}

@ObjectType()
export class LinksProfile {
  @Field(() => Tech)
  link: Tech | unknown;

  @Field()
  linkUrl: string;
}

@ObjectType()
export class Contact {
  @Field()
  title: string;

  @Field()
  description: string;
}

@ObjectType()
export class ProjectPage {
  @Field()
  title: string;

  @Field()
  description: string;
}

@ObjectType()
export class Curriculum {
  @Field()
  url: string;
}

@ObjectType()
export class ProfileUser {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field({ nullable: true })
  about: string;

  @Field(() => [Tech])
  techs: Tech[];

  @Field(() => [Tech])
  links: Tech[];

  @Field(() => [LinksProfile])
  linkProfiles: LinksProfile[];

  @Field(() => [Experience])
  experiences: Experience[];

  @Field(() => Contact)
  Contact?: Contact;

  @Field(() => Curriculum)
  Curriculum?: Curriculum;

  @Field({ nullable: true })
  ProjectPage?: ProjectPage;
}

@ObjectType()
export class Article {
  @Field()
  id: string;
  
  @Field()
  title: string;

  @Field()
  description: string;

  @Field({ nullable: true })
  content: string;

  @Field()
  createdAt?: Date;

  @Field()
  updatedAt?: Date;
}

@ObjectType()
export class ImageR {
  @Field()
  url: string;
}

@ObjectType()
export class Project {
  @Field()
  id: string;
  
  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => ImageR)
  image: ImageR;

  @Field({ nullable: true })
  content: string;

  @Field()
  createdAt?: Date;

  @Field()
  updatedAt?: Date;
}

@ObjectType()
export class UserAdvanced {
  @Field()
  name: string;

  @Field()
  phone_number: number;

  @Field()
  email: string;

  @Field(() => Avatars, { nullable: true })
  avatar?: Avatars | null;

  @Field(() => ProfileUser)
  ProfileUser: ProfileUser

  @Field(() => [Article])
  Article: Article[];

  @Field(() => [Project])
  Project: Project[];
}