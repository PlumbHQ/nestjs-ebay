import { Injectable } from '@nestjs/common';
import { NestJsEbayBaseService } from '../../common/base.service';
import { EbayTranscationResponseModel } from '..';

@Injectable()
export class NestJsEbayTransactionService extends NestJsEbayBaseService {
  /**
   * Return the transactions associated with an order
   * @param {string} orderId
   * @returns {EbayTranscationResponseModel}
   */
  public findForOrder(orderId: string): Promise<EbayTranscationResponseModel> {
    return this.get(
      `sell/finances/v1/transaction?filter=orderId:{${orderId}}`,
      'apiz',
    );
  }
}
