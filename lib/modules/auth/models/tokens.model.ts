export interface EbayAccessTokensPayload {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export interface EbayTokensPayload extends EbayAccessTokensPayload {
  refresh_token: string;
  refresh_token_expires_in: number;
}

export interface EbayTokensModel extends EbayTokensPayload {
  time_stored: number;
}
