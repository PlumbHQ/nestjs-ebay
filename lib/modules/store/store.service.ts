import { Injectable } from '@nestjs/common';
import { TokensModel } from '../auth/models/tokens.model';

@Injectable()
export abstract class QuickBooksStore {
  public abstract unsetToken(realm: string): Promise<void>;
  public abstract unregisterCompany(realm: string): Promise<void>;
  public abstract registerCompany(realm: string): Promise<void>;
  public abstract getDefaultCompany(): Promise<string>;
  public abstract setToken(realm: string, token: TokensModel): Promise<void>;
  public abstract getToken(realm: string): Promise<TokensModel>;
}
