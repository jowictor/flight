import { Module } from '@nestjs/common';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as dotenv from 'dotenv';
import { ConfigService } from './config.service';

const configFactory = {
  provide: ConfigService,
  useFactory: () => {
    dotenv.config();
    const config = new ConfigService();
    config.loadFromEnv();
    return config;
  },
};

@Module({
  imports: [],
  controllers: [],
  providers: [configFactory],
  exports: [configFactory],
})
export class ConfigModule { }
