import { EbayTokensModel } from '../../auth';

export enum NestJsEbayScopes {
  Identity = 'https://api.ebay.com/oauth/api_scope/commerce.identity.readonly',
  SellFinances = 'https://api.ebay.com/oauth/api_scope/sell.finances',
}

export type NestJsEbayModes = 'PRODUCTION' | 'SANDBOX';
export enum NestJsEbayModesEnum {
  Production = 'PRODUCTION',
  Sandbox = 'SANDBOX',
}

export interface NestJsEbayConfigModel {
  clientId: string;
  clientSecret: string;
  scopes: NestJsEbayScopes[];
  mode: NestJsEbayModes;
  serverUrl: string;
  authRedirectUrl: string;
  store: {
    getToken: () => Promise<EbayTokensModel>;
    setToken: (tokenData: EbayTokensModel) => Promise<void>;
    unsetToken: () => Promise<void>;
  };
}

export class NestJsEbayConfigModel {
  public clientId: string;
  public clientSecret: string;
  public scopes: NestJsEbayScopes[];
  public mode: NestJsEbayModes;
  public serverUrl: string;
  public authRedirectUrl: string;
  public store: {
    getToken: () => Promise<EbayTokensModel>;
    setToken: (tokenData: EbayTokensModel) => Promise<void>;
    unsetToken: () => Promise<void>;
  };

  constructor(config: Partial<NestJsEbayConfigModel>) {
    Object.assign(this, config);
  }
}
