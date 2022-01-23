import { Injectable } from '@nestjs/common';
import { EbayTokensModel } from '../auth/models/tokens.model';

@Injectable()
export abstract class NestJsEbayStore {
  public abstract setToken(token: EbayTokensModel): Promise<void>;
  public abstract getToken(): Promise<EbayTokensModel>;
  public abstract unsetToken(): Promise<void>;
}
