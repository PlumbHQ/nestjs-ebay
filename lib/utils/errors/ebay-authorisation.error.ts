import { NestJsEbayError } from './ebay.error';

export class NestJsEbayAuthorisationError extends NestJsEbayError {
  message = 'Ebay Not Authorised';
}
