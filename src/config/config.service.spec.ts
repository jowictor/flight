import { DEFAULT_CONFIG } from './config.default';
import { ConfigData } from './config.interface';
import { ConfigService } from './config.service';

describe('ConfigService', () => {
  let config: ConfigService;

  beforeEach(() => {
    config = new ConfigService();
  });

  describe('constructor', () => {
    it('should use default config if parameterless', () => {
      expect(config.get()).toBe(DEFAULT_CONFIG);
    });

    it('should use passed config', () => {
      const testConfig: ConfigData = {
        env: 'testenv',
        port: 1234,
        logLevel: 'test',
        mongo: 'conectionTest',
      };
      config = new ConfigService(testConfig);
      expect(config.get()).toBe(testConfig);
    });
  });
});
