import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { DeleteProjectDto, ProjectDto } from './dto/project.dto';

@Injectable()
export class ProjectService {
    constructor(private readonly prisma: PrismaService) {}

    async createOrUpdateProject(projectDto: ProjectDto, req: any) {
        try {
            const { id, title, description, content, imageUrl } = projectDto;
            const user = req?.user;

            if (id) {
                await this.prisma.project.update({
                    where: {
                        id,
                    },
                    data: {
                        title,
                        description,
                        content,
                        image: {
                            update: {
                                where: {
                                    projectId: id,
                                },
                                data: {
                                    url: imageUrl
                                }
                            }
                        }
                    }
                });
            } else {
                await this.prisma.project.create({
                    data: {
                        title,
                        description,
                        content,
                        userId: user.id,
                        image: {
                            create: {
                                url: imageUrl
                            }
                        }
                    },
                })
            }

            return { message: id ? 'Project Updated Successfully!' : 'Project Created Successfully!' };
        } catch (error) {
            console.log(error);
            throw new BadRequestException('Error!');
        }
    }

    async deleteProject(deleteProjectDto: DeleteProjectDto) {
        try {
            await this.prisma.project.delete({
                where: {
                    id: deleteProjectDto.id,
                }
            });

            return { message: 'Project deleted!' };
        } catch (error) {
            throw new BadRequestException('Error!');
        }
    }

    async getAllProjects(req: any) {
        try {
            const user = req?.user;

            return await this.prisma.project.findMany({
                where: {
                    userId: user?.id,
                },
                include: {
                    image: true
                }
            });
        } catch (error) {
            throw new BadRequestException('Error!');
        }
    }

    async getProjectById(idProject: string) {
        try {
            return await this.prisma.project.findUnique({
                where: {
                    id: idProject,
                },
                include: {
                    image: true
                }
            });
        } catch (error) {
            throw new BadRequestException('Error!');
        }
    }
}