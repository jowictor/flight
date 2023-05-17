import { ConfigData } from './config.interface';

export const DEFAULT_CONFIG: ConfigData = {
  env: 'dev',
  port: 3040,
  logLevel: 'verbose',
  mongo: 'mongodb://localhost:27017/flights?retryWrites=false&serverSelectionTimeoutMS=5000&connectTimeoutMS=10000',
};
