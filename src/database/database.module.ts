import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { Module, DynamicModule } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';

@Module({})
export class DatabaseModule {
  public static getMongoConnectionOptions(config: ConfigService): MongooseModuleOptions {
    const dbdata = config.get().mongo;

    if (!dbdata) {
      throw new Error('Database config is missing');
    }
    return {
      uri: dbdata,
    };
  }

  public static forRoot(): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => DatabaseModule.getMongoConnectionOptions(configService),
          inject: [ConfigService],
        }),
      ],
      controllers: [],
      providers: [],
      exports: [],
    };
  }
}
