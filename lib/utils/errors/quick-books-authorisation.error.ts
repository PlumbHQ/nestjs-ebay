import { NestJsEbayError } from './quick-books.error';

export class NestJsEbayAuthorisationError extends NestJsEbayError {
  message = 'Ebay Not Authorised';
}
