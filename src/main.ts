import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { UsersModule } from './user.module';
import cookieParser = require("cookie-parser");

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(UsersModule);

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
