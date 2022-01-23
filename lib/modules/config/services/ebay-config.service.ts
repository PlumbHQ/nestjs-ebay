import { Inject, Injectable } from '@nestjs/common';
import { NestJsEbayConfigAuthModel } from '../models/ebay-config-auth.model';
import { NestJsEbayConfigModel } from '../models/ebay-config.model';
import { NESTJS_EBAY_CONFIG } from '../../../constants';

@Injectable()
export class NestJsEbayConfigService {
  public readonly auth: NestJsEbayConfigAuthModel;

  constructor(
    @Inject(NESTJS_EBAY_CONFIG)
    public readonly global: NestJsEbayConfigModel,
  ) {
    this.auth = new NestJsEbayConfigAuthModel();
  }
}
