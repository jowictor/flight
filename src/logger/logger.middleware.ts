import { Injectable, NestMiddleware } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from 'express';
import * as moment from 'moment';
import { Logger } from './logger';

/*
  - COMBINED LOG FORMAT -
  %h %u %t \"%r\" %>s  %n"

  %h: ip
  %u: HTTP auth userid (can leave as '-')
  %t: time (e.g. '[10/Oct/2000:13:55:36 -0700]')
  %r: request line (e.g. 'GET /apache_pb.gif HTTP/1.0')
  %>s: HTTP status code
  %n: response time ms
*/

@Injectable()
export class LoggerMiddleware implements NestMiddleware<Request, Response> {
  public constructor(private logger: Logger) { }

  public use(req: Request, res: Response, next: () => void): any {
    req.headers['request-id'] = uuidv4();

    this.logger.http(this.generateLogHttpAcessMessage(req));
    const before = Date.now();
    res.on('close', () => this.logger.http(this.generateLogMessage(req, res, Date.now() - before)));
    next();
  }

  private generateLogMessage(req: Request, res: Response, timeTaken: number): string {
    const reqUser = (req.headers['user-id']) ? req.headers['user-id'] : '';
    const terms: { [key: string]: string } = {
      '%t': `[${moment(Date.now()).format('DD/MM/YYYY:HH:mm:ss ZZ')}] [request-id: ${req.headers['request-id']}]`,
      '%u': `${reqUser} res`,
      '%>s': `status[${res.statusCode}]`,
      '%n': timeTaken ? `${timeTaken} ms` : '',
    };
    let str = '%t %u %>s %n';
    for (const term in terms) {
      if (term in terms) {
        str = str.replace(term, terms[term]);
      }
    }
    return str;
  }

  private generateLogHttpAcessMessage(req: Request): string {
    const reqUser = (req.headers['user-id']) ? req.headers['user-id'] : '';
    const terms: { [key: string]: string } = {
      '%t': `[${moment(Date.now()).format('DD/MM/YYYY:HH:mm:ss ZZ')}] [request-id: ${req.headers['request-id']}]`,
      '%u': `${reqUser} call`,
      '%r': `${req.method} ${req.originalUrl}`,
      '%b': JSON.stringify(req.body),
      '%h': JSON.stringify(req.rawHeaders),
    };
    let str = '%t %u "%r" %b %h';
    for (const term in terms) {
      if (term in terms) {
        str = str.replace(term, terms[term]);
      }
    }
    return str;
  }
}
