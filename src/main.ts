/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-import-module-exports */
import { NestApplicationOptions, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';
import * as dotenv from 'dotenv';
import { Logger } from './logger/logger';
import { createDocument } from './swagger/swagger';
import { AppModule } from './app/app.module';
import { OptionsInterceptor } from './shared/middleware/options.middleware';
import { ConfigService } from './config/config.service';

dotenv.config();

declare const module: any;
async function bootstrap() {
  const opts: NestApplicationOptions = {};
  opts.logger = ['error', 'warn'];
  opts.bufferLogs = false;

  const app = await NestFactory.create(AppModule, opts);
  app.use(helmet());
  app.use(cookieParser());
  app.use(OptionsInterceptor);
  app.setGlobalPrefix('api/v1/');
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.useLogger(app.get(Logger));

  SwaggerModule.setup('api/v1', app, createDocument(app));
  const configService = app.get(ConfigService);

  await app.listen(configService.get().port);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  // eslint-disable-next-line no-console
  console.info('Aplication started on', configService.get().port);
}
bootstrap();
