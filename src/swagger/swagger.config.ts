import { SwaggerConfig } from './swagger.interface';

/**
 * Configuration for the swagger UI (found at /api).
 */
export const SWAGGER_CONFIG: SwaggerConfig = {
  title: 'Flight - Service',
  description: 'A service to management flight',
  version: '1.0',
  tags: ['flight'],
};
