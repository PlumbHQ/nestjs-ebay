import {
  EbayBookingEntryEnum,
  EbayAmountModel,
  EbayFeeTypeEnum,
  EbayTransactionTypeEnum,
} from '../../common';

export interface EbaySaleTransaction {
  transactionId: string; // '21-08157-16036';
  orderId: string; // '21-08157-16036';
  salesRecordReference: string; // '0';
  buyer: {
    username: string; // 'p26m51';
  };
  transactionType: EbayTransactionTypeEnum; // 'SALE';
  amount: EbayAmountModel;
  totalFeeBasisAmount: EbayAmountModel;
  totalFeeAmount: EbayAmountModel;
  orderLineItems: [
    {
      lineItemId: string; // '10048371894921';
      feeBasisAmount: EbayAmountModel;
      marketplaceFees: [
        {
          feeType: EbayFeeTypeEnum; // 'FINAL_VALUE_FEE_FIXED_PER_ORDER';
          amount: EbayAmountModel;
        },
        {
          feeType: EbayFeeTypeEnum; // 'FINAL_VALUE_FEE';
          amount: EbayAmountModel;
        },
      ];
    },
  ];
  bookingEntry: EbayBookingEntryEnum; // 'CREDIT';
  transactionDate: string; // '2022-01-21T08:24:17.000Z';
  transactionStatus: string; // 'FUNDS_AVAILABLE_FOR_PAYOUT';
  paymentsEntity: string; // 'EBAY_COMMERCE_UK_LTD';
}

export interface EbayNonSaleChargeTransaction {
  transactionId: string; // 'FEE-4514022828215';
  salesRecordReference: string; // '0';
  transactionType: EbayTransactionTypeEnum; // 'NON_SALE_CHARGE';
  amount: EbayAmountModel;
  bookingEntry: EbayBookingEntryEnum; // 'DEBIT';
  transactionDate: string; // '2022-01-21T08:32:32.000Z';
  transactionStatus: string; // 'FUNDS_AVAILABLE_FOR_PAYOUT';
  paymentsEntity: string; // 'EBAY_COMMERCE_UK_LTD';
  references: [
    {
      referenceId: string; // '133794859513';
      referenceType: string; // 'ITEM_ID';
    },
    {
      referenceId: string; // '21-08157-16036';
      referenceType: string; // 'ORDER_ID';
    },
  ];
  feeType: EbayFeeTypeEnum; // 'AD_FEE';
}

export type EbayTransaction =
  | EbaySaleTransaction
  | EbayNonSaleChargeTransaction;

export interface EbayTranscationResponseModel {
  href: string;
  limit: number;
  offset: number;
  transactions: EbayTransaction[];
  total: number;
}
