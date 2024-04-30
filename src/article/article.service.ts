import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ArticleDto, DeleteArticleDto } from './dto/article.dto';

@Injectable()
export class ArticleService {
    constructor(private readonly prisma: PrismaService) {}

    async createOrUpdateArticle(articleDto: ArticleDto, req: any) {
        try {
            const { id, title, description, content } = articleDto;
            const user = req?.user;

            const userProfile = await this.prisma.user.findUnique({
                where: {
                    id: user?.id
                }
            });

            if (id) {
                await this.prisma.article.update({
                    where: {
                        id,
                    },
                    data: {
                        title,
                        description,
                        content,
                    }
                });
            } else {
                await this.prisma.article.create({
                    data: {
                        title,
                        description,
                        content,
                        userId: user.id,
                    },
                })
            }

            return { message: id ? 'Article Updated Successfully!' : 'Article Created Successfully!' };
        } catch (error) {
            console.log(error);
            throw new BadRequestException('Error!');
        }
    }

    async deleteArticle(deleteArticleDto: DeleteArticleDto) {
        try {
            await this.prisma.article.delete({
                where: {
                    id: deleteArticleDto.id,
                }
            });

            return { message: 'Article deleted!' };
        } catch (error) {
            throw new BadRequestException('Error!');
        }
    }

    async getAllArticles(req: any) {
        try {
            const user = req?.user;

            return await this.prisma.article.findMany({
                where: {
                    userId: user?.id,
                }
            });
        } catch (error) {
            throw new BadRequestException('Error!');
        }
    }

    async getArticleById(idArticle: string) {
        try {
            return await this.prisma.article.findUnique({
                where: {
                    id: idArticle,
                }
            });
        } catch (error) {
            throw new BadRequestException('Error!');
        }
    }
}
