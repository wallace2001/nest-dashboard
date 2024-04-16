import { BadRequestException, Injectable } from '@nestjs/common';
import { Link } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { LinkProfileDto, UnlinkLinkProfileDto } from './dto/link.dto';

@Injectable()
export class LinksService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllLinks() {
    try {
      return await this.prisma.link.findMany();
    } catch (err) {
      throw new BadRequestException('Error');
    }
  }

  async unlinkLinkProfile(
    unlinkLinkProfileDto: UnlinkLinkProfileDto,
    req: any,
  ) {
    try {
      const user = req?.user;

      if (!user) throw new BadRequestException('User not found');

      const link = await this.findUniqueLink(unlinkLinkProfileDto.id);

      await this.prisma.linkProfile.delete({
        where: {
          linkId: link.id,
        },
      });

      this.disconnectLinkInProfile(user.id, link);

      return { message: 'Link removed' };
    } catch (error) {
      throw new BadRequestException('Error');
    }
  }

  async linkProfile(linkProfileDto: LinkProfileDto, req: any) {
    try {
      const user = req?.user;

      if (!user) throw new BadRequestException('User not found');

      const link = await this.findUniqueLink(linkProfileDto.id);

      this.connectLinkInProfile(user.id, link);

      return { message: 'Link added' };
    } catch (error) {
      throw new BadRequestException('Error');
    }
  }

  private async findUniqueLink(id: string): Promise<Link> {
    return await this.prisma.link.findUnique({
      where: {
        id,
      },
    });
  }

  private async connectLinkInProfile(id: string, link: Link): Promise<void> {
    await this.prisma.profileUser.update({
      where: { id },
      data: {
        links: { connect: link },
      },
    });
  }

  private async disconnectLinkInProfile(id: string, link: Link): Promise<void> {
    await this.prisma.profileUser.update({
      where: { id },
      data: {
        links: { disconnect: link },
      },
    });
  }
}
