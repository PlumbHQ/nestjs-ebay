import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class CatchAllFilter implements ExceptionFilter {
  /**
   * Catch all Exceptions and handle appropriately to return
   * correct statuses and messages to users
   * @param exception
   * @param host
   */
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    console.error('CatchAllFilter');
    console.error(exception);

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      error: 'Oops - Something bad happened. Please try again later. Thanks.',
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
