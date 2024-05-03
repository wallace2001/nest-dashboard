import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ContactDto, SendContactDto } from './dto/contact.dto';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class ContactService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly emailService: EmailService
    ) {}

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

    async sendContact(sendContactDto: SendContactDto) {
        try {
            const { name, email, phone, description, emailPortfolio } = sendContactDto;

            const user = await this.prisma.user.findUnique({
                where: {
                    email: emailPortfolio
                }
            });

            if (!user) {
                throw new BadRequestException('Error!');
            }

            this.emailService.sendMailContact({
                description,
                email: emailPortfolio,
                emailClient: email,
                name: user.name,
                nameClient: name,
                phoneClient: phone,
                subject: description,
                template: './client-contact.ejs',
            });

            return { message: "Email send successfully" };
        } catch (error) {
            throw new BadRequestException('Error!');
        }
    }
}
