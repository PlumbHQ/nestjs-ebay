import { Injectable } from '@nestjs/common';
import { from, Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { EbayTokensModel } from '..';
import { NestJsEbayConfigService } from '../../config/services/ebay-config.service';
import { NestJsEbayModes } from '../../config';
import { NestJsEbayAuthorisationError } from 'lib/utils/errors/quick-books-authorisation.error';
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

  public get mode(): NestJsEbayModes {
    return this.configService.global.mode;
  }

  public async disconnect(): Promise<void> {
    return this.configService.global.store.unsetToken();
  }

  public getAuthorizeUri(): string {
    return this.client.generateUserAuthorizationUrl(
      this.mode,
      this.configService.global.scopes,
    );
  }

  public async authorizeCode(code: string): Promise<string> {
    let token = await this.client.exchangeCodeForAccessToken(this.mode, code);
    token = JSON.parse(token) as EbayTokensModel;

    await this.configService.global.store.setToken(token);
    return token.access_token;
  }

  public getToken(): Observable<string> {
    return from(this.configService.global.store.getToken())
      .pipe(
        mergeMap((token) => {
          if (!token) {
            return of(null);
          }

          if (token) {
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

  private refreshAccessToken(token: EbayTokensModel): Observable<string> {
    return from(
      this.client.getAccessToken(
        this.mode,
        token.refresh_token,
        this.configService.global.scopes,
      ),
    ).pipe(
      map((access_token: string) => {
        token.access_token = access_token;
        from(this.configService.global.store.setToken(token));
        return access_token;
      }),
    );
  }
}
