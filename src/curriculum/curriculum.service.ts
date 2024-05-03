import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CurriculumDto } from './dto/contact.dto';

@Injectable()
export class CurriculumService {
    constructor(
        private readonly prisma: PrismaService,
    ) {}

    async createOrUpdateCurriculum(curriculumDto: CurriculumDto, req: any) {
        try {
            const { id, url } = curriculumDto;
            const user = req?.user;

            const profileUser = await this.prisma.profileUser.findUnique({
                where: {
                    userId: user.id
                }
            });

            if (id) {
                await this.prisma.curriculum.update({
                    where: {
                        id,
                    },
                    data: {
                        url,
                    }
                });
            } else {
                await this.prisma.curriculum.create({
                    data: {
                        url,
                        profileUserId: profileUser.id,
                    },
                })
            }

            return { message: id ? 'Curriculum Updated Successfully!' : 'Curriculum Created Successfully!' };
        } catch (error) {
            console.log(error);
            throw new BadRequestException('Error!');
        }
    }

    async getCurriculumBy(req: any) {
        try {
            const user = req?.user;

            const userProfile = await this.prisma.profileUser.findUnique({
                where: {
                    userId: user?.id
                }
            });

            return await this.prisma.curriculum.findUnique({
                where: {
                    profileUserId: userProfile.id
                }
            });
        } catch (error) {
            throw new BadRequestException('Error!');
        }
    }
}
