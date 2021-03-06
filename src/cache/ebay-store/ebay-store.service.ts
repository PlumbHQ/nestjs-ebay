import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { EbayTokensModel, NestJsEbayStore } from 'lib';

@Injectable()
export class EbayStoreService implements NestJsEbayStore {
  public token: EbayTokensModel;

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  public async setToken(token: EbayTokensModel): Promise<void> {
    await this.cacheManager.set('ebay_token', token, {
      ttl: token.refresh_token_expires_in,
    });
  }

  public async getToken(): Promise<EbayTokensModel> {
    return this.cacheManager.get('ebay_token');
  }

  public async unsetToken(): Promise<void> {
    await this.cacheManager.del('ebay_token');
  }
}
