import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { NestJsEbayIdentityService, NestJsEbayAuthorisationError } from 'lib';

@Controller()
export class AppController {
  constructor(private readonly identity: NestJsEbayIdentityService) {}

  @Get()
  async getHello(@Res() res: Response): Promise<any> {
    const result = await this.identity.read().catch((err) => {
      if (err instanceof NestJsEbayAuthorisationError) {
        return res.redirect('/auth');
      }

      console.error('getHello');
      console.error(err);
    });

    return res.send(result);
  }
}
