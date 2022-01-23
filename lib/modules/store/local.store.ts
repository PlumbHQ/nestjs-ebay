import { NestJsEbayStore } from './store.service';
import { Injectable } from '@nestjs/common';
import { EbayTokensModel } from '../auth/models/tokens.model';

@Injectable()
export class LocalStore extends NestJsEbayStore {
  token: EbayTokensModel;

  public async getToken(): Promise<EbayTokensModel> {
    return this.token;
  }

  public async setToken(token: EbayTokensModel): Promise<void> {
    this.token = token;
  }

  public async unsetToken(): Promise<void> {
    this.token = null;
  }
}
