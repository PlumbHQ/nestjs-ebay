import { Injectable } from '@nestjs/common';
import { from, Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import {
  EbayTokensPayload,
  EbayTokensModel,
  EbayAccessTokensPayload,
} from '..';
import { NestJsEbayConfigService } from '../../config/services/ebay-config.service';
import { NestJsEbayModes } from '../../config';
import { NestJsEbayAuthorisationError } from 'lib/utils/errors/ebay-authorisation.error';
import * as EbayAuthToken from 'ebay-oauth-nodejs-client';

@Injectable()
export class NestJsEbayAuthService {
  private readonly client: EbayAuthToken;

  constructor(private readonly configService: NestJsEbayConfigService) {
    this.client = new EbayAuthToken({
      clientId: this.configService.global.clientId,
      clientSecret: this.configService.global.clientSecret,
      redirectUri: this.configService.global.authRedirectUrl,
    });
  }

  /**
   * Return the current production environment
   * @returns {string}
   */
  public get mode(): NestJsEbayModes {
    return this.configService.global.mode;
  }

  /**
   * Unauthorise this application from eBay
   * @returns {void}
   */
  public async disconnect(): Promise<void> {
    return this.configService.global.store.unsetToken();
  }

  /**
   * Return the URL needed to authorise the application
   * @returns {string}
   */
  public getAuthorizeUri(): string {
    return this.client.generateUserAuthorizationUrl(
      this.mode,
      this.configService.global.scopes,
    );
  }

  /**
   * Authorise the OAuth Code from eBay and get the tokens data
   * @param {string} code
   * @returns {string}
   */
  public async authorizeCode(code: string): Promise<string> {
    let tokens = await this.client.exchangeCodeForAccessToken(this.mode, code);
    tokens = JSON.parse(tokens) as EbayTokensPayload;

    await this.storeToken(tokens);
    return tokens.access_token;
  }

  /**
   * Return the access token needed to authorise eBay comms
   * @returns {string}
   */
  public getToken(): Observable<string> {
    return from(this.configService.global.store.getToken())
      .pipe(
        mergeMap((token) => {
          if (!token) {
            return of(null);
          }

          if (this.isTokenValid(token)) {
            return of(token.access_token);
          }
          return this.refreshAccessToken(token);
        }),
      )
      .pipe(
        map((value) => {
          if (!value) {
            throw new NestJsEbayAuthorisationError();
          }

          return value;
        }),
      );
  }

  /**
   * Calculate if the token is valid
   * @param {EbayTokensModel} tokens
   * @returns {boolean}
   */
  isTokenValid(tokens: EbayTokensModel): boolean {
    const now = this.getNowSeconds();
    const validMax = tokens.time_stored + tokens.expires_in;

    // If timestored + expires seconds is less than
    if (validMax <= now) {
      return false;
    }

    return true;
  }

  /**
   * Store the Token Data in storage
   * Attach time stored for validity calculations
   *
   * @param {EbayTokensPayload} tokenPayload
   * @returns {void}
   */
  async storeToken(tokenPayload: EbayTokensPayload): Promise<void> {
    const tokenData: EbayTokensModel = {
      ...tokenPayload,
      time_stored: this.getNowSeconds(),
    };

    return this.configService.global.store.setToken(tokenData);
  }

  /**
   * Get the current time in seconds
   * @returns {number}
   */
  getNowSeconds(): number {
    return new Date().valueOf();
  }

  /**
   * Refresh the token data for eBay
   * @param {EbayTokensModel} token
   * @returns {string}
   */
  private refreshAccessToken(tokens: EbayTokensModel): Observable<string> {
    return from(this.getNewAccessToken(tokens)).pipe(
      map((refreshed_tokens_string: string) => {
        const refreshed_tokens = JSON.parse(
          refreshed_tokens_string,
        ) as EbayAccessTokensPayload;
        from(this.storeRefreshedTokenData(tokens, refreshed_tokens));

        return refreshed_tokens.access_token;
      }),
    );
  }

  /**
   * Request refreshed Tokens from eBay
   * @param {EbayTokensModel} tokens
   * @returns {EbayAccessTokensPayload}
   */
  async getNewAccessToken(tokens: EbayTokensModel): Promise<string> {
    const res = await this.client.getAccessToken(
      this.mode,
      tokens.refresh_token,
      this.configService.global.scopes,
    );

    return res;
  }

  /**
   * Store the refreshed token data
   * @param {EbayTokensModel} current_tokens
   * @param {EbayAccessTokensPayload} refreshed_tokens
   */
  async storeRefreshedTokenData(
    current_tokens: EbayTokensModel,
    refreshed_tokens: EbayAccessTokensPayload,
  ): Promise<void> {
    current_tokens.access_token = refreshed_tokens.access_token;
    current_tokens.expires_in = refreshed_tokens.expires_in;
    current_tokens.token_type = refreshed_tokens.token_type;

    from(this.storeToken(current_tokens));
  }
}
