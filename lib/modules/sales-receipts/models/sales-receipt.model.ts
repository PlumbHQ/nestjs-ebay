import {
  QuickBooksEmailDto,
  QuickBooksEmailStatusesEnum,
  QuickBooksGlobalTaxCalculationsEnum,
  QuickBooksEntity,
  QuickBooksPhysicalAddressDto,
  QuickBooksRefDto,
  QuickBooksTxnTaxDetailDto,
} from 'lib/modules/common';
import { QuickBooksSalesItemLine } from 'lib/modules/common/dto/line-items.dto';
import { QuickBooksPrintStatusEnum } from 'lib/modules/common/enums/print-status.enum';

export interface QuickBooksSalesReceipts extends QuickBooksEntity {
  Line: QuickBooksSalesItemLine[];
  CustomerRef: QuickBooksRefDto;
  CurrencyRef: QuickBooksRefDto;
  BillEmail: QuickBooksEmailDto;
  TxnDate: string; // yyyy/MM/dd
  ShipFromAddr: QuickBooksPhysicalAddressDto;
  ShipDate: string; // yyyy/MM/dd
  TrackingNum: string;
  ClassRef: QuickBooksRefDto;
  PrintStatus: QuickBooksPrintStatusEnum;
  PaymentRefNum: string;
  TxnSource: string;
  GlobalTaxCalculation: QuickBooksGlobalTaxCalculationsEnum;
  DocNumber: string;
  PrivateNote: string;
  DepositToAccountRef: QuickBooksRefDto;
  CustomerMemo: string;
  EmailStatus: QuickBooksEmailStatusesEnum;
  TxnTaxDetail: QuickBooksTxnTaxDetailDto;
  PaymentMethodRef: QuickBooksRefDto;
  ExchangeRate: number;
  ShipAddr: QuickBooksPhysicalAddressDto;
  DepartmentRef: QuickBooksRefDto;
  ShipMethodRef: QuickBooksRefDto;
  BillAddr: QuickBooksPhysicalAddressDto;
  TotalAmt: number;
}
