import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { EbayTokensModel, NestJsEbayStore } from 'lib';

@Injectable()
export class EbayStoreService implements NestJsEbayStore {
  public token: EbayTokensModel;

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  public async setToken(token: EbayTokensModel): Promise<void> {
    this.token = token;
  }

  public async getToken(): Promise<EbayTokensModel> {
    return this.token;
  }

  public async unsetToken(): Promise<void> {
    this.token = null;
  }
}
