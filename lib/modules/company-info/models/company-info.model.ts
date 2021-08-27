import {
  QuickBooksDateTimeModel,
  QuickBooksEmailModel,
  QuickBooksEntity,
  QuickBooksPhoneNumberModel,
  QuickBooksPhysicalAddressModel,
  QuickBooksWebsiteModel,
} from '../../common/models';
import { QuickBooksMonthsEnum } from '../../common/enums';

export interface QuickBooksCompanyInfo extends QuickBooksEntity {
  CompanyName: string;
  PhysicalAddress: QuickBooksPhysicalAddressModel;
  LegalAddr: QuickBooksPhysicalAddressModel;
  SupportedLanguages: string;
  Country: string;
  Email: QuickBooksEmailModel;
  WebAddr: QuickBooksWebsiteModel;
  NameValue: { name: string; value: string }[];
  FiscalYearStartMonth: QuickBooksMonthsEnum;
  CustomerCommunicationAddr: QuickBooksPhysicalAddressModel;
  PrimaryPhone: QuickBooksPhoneNumberModel;
  LegalName: string;
  CompanyStartDate: QuickBooksDateTimeModel;
}
