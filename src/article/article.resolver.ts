import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ArticleService } from './article.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { ArticleResponse, Response } from './types/article.types';
import { ArticleDto, DeleteArticleDto, GetArticleDto } from './dto/article.dto';

@Resolver()
export class ArticleResolver {
    constructor(private readonly articleService: ArticleService) {}

    @Query(() => [ArticleResponse])
    @UseGuards(AuthGuard)
    async getArticles(
      @Context() context: { req: Request },
    ) {
      return await this.articleService.getAllArticles(
        context.req
      );
    }

    @Query(() => ArticleResponse)
    @UseGuards(AuthGuard)
    async getArticleById(
      @Args('getArticleDto') getArticleDto: GetArticleDto,
    ) {
      return await this.articleService.getArticleById(
        getArticleDto.id
      );
    }

    @Mutation(() => Response)
    @UseGuards(AuthGuard)
    async createOrUpdateArticle(
      @Context() context: { req: Request },
      @Args('articleDto') articleDto: ArticleDto,
    ) {
      return await this.articleService.createOrUpdateArticle(
        articleDto,
        context.req,
      );
    }

    @Mutation(() => Response)
    @UseGuards(AuthGuard)
    async deleteArticle(
      @Args('deleteArticleDto') deleteArticleDto: DeleteArticleDto,
    ) {
      return await this.articleService.deleteArticle(
        deleteArticleDto,
      );
    }
}
