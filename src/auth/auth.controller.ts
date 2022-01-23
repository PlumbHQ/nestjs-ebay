import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { EbayAuthController } from 'lib/modules/auth/controllers/auth.controller';

@Controller('auth')
export class AuthController extends EbayAuthController {
  @Get()
  public authorize(@Res() res: Response): void {
    return super.authorize(res);
  }

  @Get('callback')
  public async callback(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    try {
      await super.authorizeCode(req);
      return res.redirect('/');
    } catch (e) {
      console.error(e);
    }
  }
}
