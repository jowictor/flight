import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Logger } from '../logger/logger';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private logger: Logger) { }

  catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const errorResponse = { ...exception };
    if (process.env.NODE_ENV !== 'dev' && errorResponse['data'] && Object.prototype.hasOwnProperty.call(errorResponse['data'], 'stack')) delete errorResponse['data']['stack'];

    const stackError = (errorResponse['data'] && Object.prototype.hasOwnProperty.call(errorResponse['data'], 'stack')) ? exception['data']['stack'] : null;
    if (stackError) {
      this.logger.error(`Exception - request-id: ${request.headers['request-id']} ${stackError} ${JSON.stringify(exception)}`);
    } else {
      this.logger.error(`Exception - request-id: ${request.headers['request-id']} ${JSON.stringify(exception)}`);
    }
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}
