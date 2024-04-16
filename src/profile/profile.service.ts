import { BadRequestException, Injectable } from '@nestjs/common';
import { Link, ProfileUser, TechLanguages } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateProfileDto, UpdateAboutDto } from './dto/profile.dto';

type LinkProfile = {
  id?: string;
  linkUrl: string;
  link?: {
    id?: string;
    name: string;
    icon: string;
  };
};

type Profile = {
  id?: string;
  title: string;
  description: string;
  about: string;
  linksGroup?: LinkProfile[];
  techs: TechLanguages[];
  links: Link[];
};

@Injectable()
export class ProfileService {
  private profileUser: ProfileUser;
  constructor(private readonly prisma: PrismaService) {
  }

  removeNullValues(obj): any {
    const newObj = {};
    Object.keys(obj).forEach((key) => {
      if (obj[key] !== null) {
        newObj[key] = obj[key];
      }
    });
    return newObj;
  }

  async fetchProfile(req: any) {
    try {
      const user = req?.user;

      const profile = await this.prisma.profileUser.findUnique({
        where: {
          userId: user.id,
        },
        include: {
          techs: true,
          links: true,
          linkProfiles: {
            include: {
              link: true,
            }
          }
        },
      });

      if (!profile) {
        throw new BadRequestException('Profile not found!');
      }

      return profile;
    } catch (error) {
      throw new BadRequestException('Error!');
    }
  }

  async createProfile(
    createProfileDto: CreateProfileDto,
    req: any,
  ) {
    try {
      const { id, title, description, linksGroup, about, techs, links } = createProfileDto as unknown as Profile;
      const user = req?.user;
      const userFilter = this.removeNullValues(user);
  
      if (id) {
        const profileUserUpdated = await this.updateProfile(id, title, description, about, techs, links);
        this.profileUser = profileUserUpdated;
        await this.updateLinkProfiles(linksGroup);
      } else {
        await this.createProfileUser(title, description, userFilter?.id, techs, links);
      }
  
      return { message: id ? 'Profile Updated Successfully!' : 'Profile Created Successfully!' };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Error!');
    }
  }

  async updateAboutProfile(
    updateAboutDto: UpdateAboutDto,
    req: any,
  ) {
    try {
      const { id, about } = updateAboutDto;
    
      if (id) {
        await this.prisma.profileUser.update({
          where: { id },
          data: { about },
        });
      }

      return {message: "About updated Successfully!"}
      
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Error!');
    }
  }

  private async updateProfile(id: string, title: string, description: string, about: string, techs: TechLanguages[], links: Link[]): Promise<ProfileUser> {
    return await this.prisma.profileUser.update({
      where: { id },
      data: { title, description, about, techs: { connect: techs }, links: { connect: links } },
    });
  }
  
  private async updateLinkProfiles(linksGroup: LinkProfile[]): Promise<void> {
    for (const link of linksGroup) {
      if (link.id) {
        await this.updateLinkProfile(link.id, link.linkUrl);
      } else {
        await this.createLinkProfile(link);
      }
    }
  }
  
  private async updateLinkProfile(id: string, linkUrl: string): Promise<void> {
    await this.prisma.linkProfile.update({
      where: { id },
      data: { linkUrl },
    });
  }
  
  private async createLinkProfile(link: LinkProfile): Promise<void> {
    await this.prisma.linkProfile.create({
      data: { linkUrl: link.linkUrl, profileUser: { connect: { id: this.profileUser.id } }, link: { connect: { id: link.link?.id } } },
    });
  }
  
  private async createProfileUser(title: string, description: string, userId: string, techs: TechLanguages[], links: Link[]): Promise<void> {
    await this.prisma.profileUser.create({
      data: { title, description, user: { connect: { id: userId } }, techs: { connect: techs }, links: { connect: links } },
    });
  }
}
