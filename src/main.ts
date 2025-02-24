import { NestFactory } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as express from 'express';
import { UsersModule } from './user.module';
import cookieParser = require("cookie-parser");

const expressApp = express();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(UsersModule, new ExpressAdapter(expressApp));

  app.enableCors({
    origin: '*'
  });

  app.use(cookieParser());
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'servers/email-templates'));
  app.setViewEngine('ejs');

  await app.listen(process.env.PORT || 4001);
}
bootstrap();
