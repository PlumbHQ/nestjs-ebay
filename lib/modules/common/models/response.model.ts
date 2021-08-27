import { QuickBooksCompanyInfoEntity } from 'lib';
import { QuickBooksBaseEntity } from './quickbooks.model';

export interface QuickBooksResponseModel {
  [key: string]:
    | QuickBooksCompanyInfoEntity
    | QuickBooksDeleteResponseModel
    | QuickBooksBaseEntity
    | QuickBooksQueryResponseData
    | string;
  time: string;
}

export interface QuickBooksDeleteResponseModel {
  status: string;
  domain: string;
  Id: string;
}

export interface QuickBooksQueryResponseData {
  [key: string]: number | string | QuickBooksBaseEntity[];
  startPosition: number;
  maxResults: number;
}

export interface QuickBooksQueryResponseModel extends QuickBooksResponseModel {
  QueryResponse: QuickBooksQueryResponseData;
}
