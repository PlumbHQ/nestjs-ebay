import {
  QuickBooksAccountTypesEnum,
  QuickBooksEntity,
  QuickBooksRefModel,
} from '../../common';

export interface QuickBooksAccounts extends QuickBooksEntity {
  Name: string;
  AcctNum?: string;
  CurrencyRef?: QuickBooksRefModel;
  ParentRef?: QuickBooksRefModel;
  Description?: string;
  Active: boolean;
  SubAccount?: boolean;
  Classification?: string;
  FullyQualifiedName?: string;
  TxnLocationType?: string;
  AccountType: QuickBooksAccountTypesEnum;
  CurrentBalanceWithSubAccounts: number;
  AccountAlias: string;
  TaxCodeRef: QuickBooksRefModel;
  AccountSubType: string;
  CurrentBalance: number;
}
