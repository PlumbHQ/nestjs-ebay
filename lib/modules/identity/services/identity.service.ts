import { Injectable } from '@nestjs/common';
import { NestJsEbayBaseService } from '../../common/base.service';
import { EbayIdentityResponseModel } from '..';

@Injectable()
export class NestJsEbayIdentityService extends NestJsEbayBaseService {
  /**
   * Return the identity of the logged in user
   * @returns {EbayIdentityResponseModel}
   */
  public read(): Promise<EbayIdentityResponseModel | any> {
    return this.get('commerce/identity/v1/user/', 'apiz');
  }
}
