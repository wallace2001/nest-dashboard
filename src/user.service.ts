import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { Response } from 'express';
import { PrismaService } from "../prisma/prisma.service";
import {
  ActivationDto,
  ForgotPasswordDto,
  LoginDto,
  RegisterDto,
  ResetPasswordDto,
  UserDto,
} from './dto/user.dto';
import { EmailService } from './email/email.service';
interface UserData {
  name: string;
  email: string;
  password: string;
  phone_number: number;
}

@Injectable()
export class UsersService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
  ) {}

  private async issueTokens(user: User, response: Response) {
    const payload = { username: user.name, sub: user.id };

    const accessToken = this.jwtService.sign(
      { ...payload },
      {
        secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
        expiresIn: '150sec',
      },
    );
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
      expiresIn: '7d',
    });

    response.cookie('access_token', accessToken, { httpOnly: true });
    response.cookie('refresh_token', refreshToken, {
      httpOnly: true,
    });

    return { user, accessToken, refreshToken };
  }

  async updateUser(userDto: UserDto, req: any) {
    try {
      const user = req.user;

      await this.prisma.avatar.deleteMany({
        where: {
          userId: user.id // Remover todas as imagens associadas a este usuário
        }
      });

      await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          name: userDto.name,
          avatar: {
            create: {
              url: userDto.imageUrl,
              userId: user.id,
            }
          }
        }
      });

      return {message: "User updated!"};
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        'Error',
      );
    }
  }

  async getUserById(userId: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          avatar: true
        }
      });
  
      if (!user) {
        throw new BadRequestException(
          'User not exists!',
        );
      }
  
      return {user}; 
    } catch (error) {
      throw new BadRequestException(
        'Error',
      );
    }
  }

  async getUser(name: string) {
    try {
      const t = await this.prisma.user.findMany();
      console.log(t);
      const user = await this.prisma.user.findUnique({
        where: {
          name: name,
        },
        include: {
          avatar: true,
          Article: true,
          ProfileUser: {
            include: {
              ProjectPage: true,
              Curriculum: true,
              Contact: true,
              experiences: true,
              linkProfiles: {
                include: {
                  link: true
                }
              },
              techs: true,
              links: true,
            }
          },
          Project: {
            include: {
              images: true
            }
          },
        }
      });
  
      if (!user) {
        throw new BadRequestException(
          'User not exists!',
        );
      }

      const u = {
        ...user,
        ProfileUser: {
          ...user.ProfileUser,
          experiences: user.ProfileUser.experiences.map(experience => ({
            name: experience.name,
            function: experience.function,
            date: {
              from: experience.from,
              to: experience.to
            }
          }))
        }
      };  
      return u; 
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        'Error',
      );
    }
  }

  async getUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      }
    });

    if (!user) {
      throw new BadRequestException(
        'User not exists!',
      );
    }

    return {user};
  }

  // register user service
  async register(registerDto: RegisterDto, response: Response) {
    const { name, email, password, phone_number } = registerDto;

    const isEmailExist = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (isEmailExist) {
      throw new BadRequestException('User already exist with this email!');
    }

    const phoneNumbersToCheck = [phone_number];

    const usersWithPhoneNumber = await this.prisma.user.findMany({
      where: {
        phone_number: {
          not: null,
          in: phoneNumbersToCheck,
        },
      },
    });

    if (usersWithPhoneNumber.length > 0) {
      throw new BadRequestException(
        'User already exist with this phone number!',
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      name,
      email,
      password: hashedPassword,
      phone_number,
    };

    const activationToken = await this.createActivationToken(user);

    const activationCode = activationToken.activationCode;

    const activation_token = activationToken.token;

    await this.emailService.sendMail({
      email,
      subject: 'Activate your account!',
      template: './activation-mail',
      name,
      activationCode,
    });

    return { activation_token, response };
  }

  // create activation token
  async createActivationToken(user: UserData) {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

    const token = this.jwtService.sign(
      {
        user,
        activationCode,
      },
      {
        secret: this.configService.get<string>('ACTIVATION_SECRET'),
        expiresIn: '5m',
      },
    );
    return { token, activationCode };
  }

  // activation user
  async activateUser(activationDto: ActivationDto, response: Response) {
    const { activationToken, activationCode } = activationDto;

    const newUser: { user: UserData; activationCode: string } =
      this.jwtService.verify(activationToken, {
        secret: this.configService.get<string>('ACTIVATION_SECRET'),
      } as JwtVerifyOptions) as { user: UserData; activationCode: string };

    if (newUser.activationCode !== activationCode) {
      throw new BadRequestException('Invalid activation code');
    }

    const { name, email, password, phone_number } = newUser.user;

    const existUser = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existUser) {
      throw new BadRequestException('User already exist with this email!');
    }

    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password,
        phone_number,
      },
    });

    return { user, response };
  }

  async validateUser(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });
    if (user && (await bcrypt.compare(loginDto.password, user.password))) {
      return user;
    }
    return null;
  }

  // Login service
  async Login(loginDto: LoginDto, res: Response) {
    const user = await this.validateUser(loginDto);
    if (!user) {
      throw new BadRequestException({
        invalidCredentials: 'Invalid credentials',
      });
    }
    return this.issueTokens(user, res);
  }

  // compare with hashed password
  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  // generate forgot password link
  async generateForgotPasswordLink(user: User) {
    const forgotPasswordToken = this.jwtService.sign(
      {
        user,
      },
      {
        secret: this.configService.get<string>('FORGOT_PASSWORD_SECRET'),
        expiresIn: '5m',
      },
    );
    return forgotPasswordToken;
  }

  // forgot password
  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const { email } = forgotPasswordDto;
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new BadRequestException('User not found with this email!');
    }
    const forgotPasswordToken = await this.generateForgotPasswordLink(user);

    const resetPasswordUrl =
      this.configService.get<string>('CLIENT_SIDE_URI') +
      `/reset-password?verify=${forgotPasswordToken}`;

    await this.emailService.sendMail({
      email,
      subject: 'Reset your Password!',
      template: './forgot-password',
      name: user.name,
      activationCode: resetPasswordUrl,
    });

    return { message: `Your forgot password request succesful!` };
  }

  // reset password
  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { password, activationToken } = resetPasswordDto;

    const decoded = await this.jwtService.decode(activationToken);

    if (!decoded || decoded?.exp * 1000 < Date.now()) {
      throw new BadRequestException('Invalid token!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.update({
      where: {
        id: decoded.user.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    return { user };
  }

  // get logged in user
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getLoggedInUser(req: any) {
    const user = req.user;
    const refreshToken = req.refreshtoken;
    const accessToken = req.accesstoken;
    return { user, refreshToken, accessToken };
  }

  // log out user
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async Logout(req: any) {
    req.user = null;
    req.refreshtoken = null;
    req.accesstoken = null;
    return { message: 'Logged out successfully!' };
  }

  // get all users service
  async getUsers() {
    return this.prisma.user.findMany({});
  }
}
