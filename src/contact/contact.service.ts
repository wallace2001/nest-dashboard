import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ContactDto } from './dto/contact.dto';

@Injectable()
export class ContactService {
    constructor(private readonly prisma: PrismaService) {}

    async createOrUpdateContact(contactDto: ContactDto, req: any) {
        try {
            const { id, title, description } = contactDto;
            const user = req?.user;

            const profileUser = await this.prisma.profileUser.findUnique({
                where: {
                    userId: user.id
                }
            });

            if (id) {
                await this.prisma.contact.update({
                    where: {
                        id,
                    },
                    data: {
                        title,
                        description,
                    }
                });
            } else {
                await this.prisma.contact.create({
                    data: {
                        title,
                        description,
                        profileUserId: profileUser.id,
                    },
                })
            }

            return { message: id ? 'Contact Updated Successfully!' : 'Contact Created Successfully!' };
        } catch (error) {
            console.log(error);
            throw new BadRequestException('Error!');
        }
    }

    async getContact(req: any) {
        try {
            const user = req?.user;

            const userProfile = await this.prisma.profileUser.findUnique({
                where: {
                    userId: user?.id
                }
            });

            return await this.prisma.contact.findUnique({
                where: {
                    profileUserId: userProfile.id
                }
            });
        } catch (error) {
            throw new BadRequestException('Error!');
        }
    }
}
