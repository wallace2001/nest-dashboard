import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateExperienceDto, DeleteExperienceDto } from './dto/experience.dto';

type Experience = {
  id?: string;
  name: string;
  function: string;
  date: {
    from: Date;
    to?: Date;
  };
};

@Injectable()
export class ExperienceService {
  constructor(private readonly prisma: PrismaService) {}

  removeNullValues(obj): any {
    const newObj = {};
    Object.keys(obj).forEach((key) => {
      if (obj[key] !== null) {
        newObj[key] = obj[key];
      }
    });
    return newObj;
  }

  private async getProfileUser(userId: string) {
    try {  
        return await this.prisma.profileUser.findUnique({
          where: {
              userId,
          }
        });
    } catch (error) {
        throw new BadRequestException('Error!');
    }
  }

  async createExperience(createExperienceDto: CreateExperienceDto[], req: any) {
    try {
      const experiences = createExperienceDto as Experience[];

      const profileUser = await this.getProfileUser(req?.user?.id);

      if (!profileUser.id) {
      throw new BadRequestException('Error!');
      }

      for (const experience of experiences) {
        if (experience.id) {
            await this.prisma.experience.update({
              where: {
                id: experience.id,
              },
              data: {
                name: experience.name,
                function: experience.function,
                from: experience.date.from,
                to: experience.date?.to,
              },
            });
          } else {
            await this.prisma.experience.create({
              data: {
                name: experience.name,
                function: experience.function,
                from: experience.date.from,
                to: experience.date?.to,
                profileUserId: profileUser.id,
              },
            });
          }
      }

      return { message: 'Successfully' };

    } catch (error) {
        console.log(error);
      throw new BadRequestException('Error!');
    }
  }

  async deleteExperience(deleteExperienceDto: DeleteExperienceDto, req: any) {
    try {
        
        await this.prisma.experience.delete({
            where: {
                id: deleteExperienceDto.id
            }
        });

        return {message: "Experience Deleted!"};
    } catch (error) {
        throw new BadRequestException('Error!');
    }
  }

  async getExperiences(req: any) {
    const profileUser = await this.getProfileUser(req?.user?.id);
    try {
      const experiences = await this.prisma.experience.findMany({
        where: { profileUserId: profileUser?.id },
      });

      return experiences.map((experience) => ({
        id: experience.id,
        name: experience.name,
        function: experience.function,
        date: {
          from: experience.from,
          to: experience.to,
        },
      }));
    } catch (error) {
      throw new BadRequestException('Error!');
    }
  }
}
