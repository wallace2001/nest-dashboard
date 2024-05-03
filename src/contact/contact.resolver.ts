import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ContactService } from './contact.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { ContactDto } from './dto/contact.dto';
import { ContactResponse } from './types/contact.types';
import { Response } from 'src/article/types/article.types';

@Resolver()
export class ContactResolver {
    constructor(private readonly contactService: ContactService) {}

    @Query(() => ContactResponse)
    @UseGuards(AuthGuard)
    async getContact(
        @Context() context: { req: Request },
    ) {
      return await this.contactService.getContact(context.req);
    }

    @Mutation(() => Response)
    @UseGuards(AuthGuard)
    async createOrUpdateContact(
      @Context() context: { req: Request },
      @Args('contactDto') contactDto: ContactDto,
    ) {
      return await this.contactService.createOrUpdateContact(
        contactDto,
        context.req,
      );
    }
}
