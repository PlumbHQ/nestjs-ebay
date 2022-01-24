import { NestJsEbayError } from './ebay.error';
import { AxiosError } from 'axios';

export class NestJsEbayHttpError extends NestJsEbayError {
  public status: number;
  public errors: any;

  constructor(error: AxiosError) {
    super();

    this.status = error.response.status;
    this.errors = error.response.data;
  }
}
