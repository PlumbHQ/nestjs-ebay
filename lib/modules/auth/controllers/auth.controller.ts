import { NestJsEbayAuthService } from '../services/auth.service';
import { Request, Response } from 'express';
import { Controller } from '@nestjs/common';

@Controller()
export class EbayAuthController {
  constructor(private readonly authService: NestJsEbayAuthService) {}

  public authorize(res: Response): void {
    res.redirect(this.authService.getAuthorizeUri());
  }

  public async authorizeCode(req: Request): Promise<string> {
    return this.authService.authorizeCode(req.query.code as string);
  }
}
