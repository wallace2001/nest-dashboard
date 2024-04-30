import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from "../prisma/prisma.service";
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { EmailModule } from './email/email.module';
import { LinksModule } from './links/links.module';
import { LinksResolver } from './links/links.resolver';
import { LinksService } from './links/links.service';
import { ProfileResolver } from './profile/profile.resolver';
import { ProfileService } from './profile/profile.service';
import { TechsModule } from './techs/techs.module';
import { TechsResolver } from './techs/techs.resolver';
import { TechsService } from './techs/techs.service';
import { TokenService } from './token/token.service';
import { UsersResolver } from './user.resolver';
import { UsersService } from './user.service';
import { WebscrapModule } from './webscrap/webscrap.module';
import { ExperienceService } from './experience/experience.service';
import { ExperienceResolver } from './experience/experience.resolver';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRootAsync<ApolloFederationDriverConfig>({
      imports: [ConfigModule],
      inject: [ConfigService],
      driver: ApolloFederationDriver,
      useFactory: async (
        configService: ConfigService,
        tokenService: TokenService,
      ) => {
        return {
          playground: true,
          autoSchemaFile: {
            federation: 2,
          },
          sortSchema: true,
          onConnect: (connectionParams) => {
            const token = tokenService.extractToken(connectionParams);

            if (!token) {
              throw new Error('Token not provided');
            }
            const user = tokenService.validateToken(token);
            if (!user) {
              throw new Error('Invalid token');
            }
            return { user };
          },
          context: ({ req, res, connection }) => {
            if (connection) {
              return { req, res, user: connection.context.user };
            }
            return { req, res };
          },
        };
      },
    }),
    EmailModule,
    WebscrapModule,
    TechsModule,
    LinksModule,
    CloudinaryModule
  ],
  controllers: [],
  providers: [
    UsersService,
    TechsService,
    ConfigService,
    JwtService,
    PrismaService,
    UsersResolver,
    TechsResolver,
    LinksResolver,
    LinksService,
    ProfileResolver,
    ProfileService,
    CloudinaryService,
    ExperienceService,
    ExperienceResolver,
  ],
})
export class UsersModule {}
