import { Injectable } from '@nestjs/common';
import { NestJsEbayAuthService } from '../auth/services/auth.service';
import { firstValueFrom, Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { HttpService } from '@nestjs/axios';
import { NestJsEbayHttpError } from '../../utils';
import { NestJsEbayModesEnum } from '../config';
import { AxiosError } from 'axios';

@Injectable()
export abstract class NestJsEbayBaseService {
  public resource: string;

  private readonly sandboxUrl = 'https://api.sandbox.ebay.com';
  private readonly liveUrl = 'https://api.ebay.com';

  constructor(
    private readonly authService: NestJsEbayAuthService,
    private readonly http: HttpService,
  ) {}

  protected get apiUrl(): string {
    return this.authService.mode === 'PRODUCTION'
      ? this.liveUrl
      : this.sandboxUrl;
  }

  /**
   * HTTP GET
   * @param {string} path
   * @param queryParams
   * @param headers
   * @returns
   */
  protected get<R = Response>(path: string, subdomain = 'api'): Promise<R> {
    return firstValueFrom(
      this.getHttpHeaders()
        .pipe(
          mergeMap((authHeaders) =>
            this.http.get<R>(this.url(path, subdomain), {
              headers: {
                ...authHeaders,
              },
            }),
          ),
        )
        .pipe(
          map((x) => x.data),
          catchError(this.handleHttpError),
        ),
    );
  }

  /**
   * Handle any Http Error
   * @param error
   * @returns
   */
  handleHttpError(error: any): Observable<any> {
    console.log('handleHttpError');

    if (error.response) {
      const err = new NestJsEbayHttpError(error as AxiosError);

      console.error('handleHttpError.response');
      console.error('EBAY ERROR: ' + err.message);
      console.log(JSON.stringify(err, null, 2));

      throw err;
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.error('handleHttpError.request');
      console.log(JSON.stringify(error, null, 2));
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('handleHttpError.other');
      console.log(JSON.stringify(error, null, 2));

      throw error;
    }

    return of(error);
  }

  /**
   * Return the URL string
   * @param {string} path
   * @returns {string}
   */
  protected url(path: string, subdomain = 'api'): string {
    let url = `https://${subdomain}.`;

    if (this.authService.mode === NestJsEbayModesEnum.Sandbox) {
      url += 'sandbox.';
    }

    url += `ebay.com/${path}`;

    return url;
  }

  /**
   * Construct the HTTP Headers for the request
   * @returns {Observable<any>}
   */
  private getHttpHeaders(): Observable<any> {
    return this.authService.getToken().pipe(
      map((accessToken) => ({
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      })),
    );
  }
}
