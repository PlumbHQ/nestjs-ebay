import { Injectable } from '@nestjs/common';
import { firstValueFrom, mergeMap } from 'rxjs';
import { NestJsQuickBooksBaseService } from '../../common/base.service';
import {
  FullUpdateQuickBooksCompanyInfoDto,
  QuickBooksCompanyInfoQueryDto,
  QuickBooksCompanyInfoQueryResponseModel,
  QuickBooksCompanyInfoResponseModel,
  SparseUpdateQuickBooksCompanyInfoDto,
} from '..';
import {
  CanFullUpdate,
  CanRead,
  CanSparseUpdate,
} from 'lib/modules/common/interfaces/quick-books-service.interface';

@Injectable()
export class NestJsQuickBooksCompanyInfoService
  extends NestJsQuickBooksBaseService<
    QuickBooksCompanyInfoResponseModel,
    QuickBooksCompanyInfoQueryDto,
    QuickBooksCompanyInfoQueryResponseModel
  >
  implements
    CanRead<QuickBooksCompanyInfoResponseModel>,
    CanFullUpdate<
      FullUpdateQuickBooksCompanyInfoDto,
      QuickBooksCompanyInfoResponseModel
    >,
    CanSparseUpdate<
      SparseUpdateQuickBooksCompanyInfoDto,
      QuickBooksCompanyInfoResponseModel
    >
{
  public resource = 'companyinfo';

  public read(): Promise<QuickBooksCompanyInfoResponseModel> {
    return firstValueFrom(this.getRealm().pipe(mergeMap((x) => this.get(x))));
  }

  public fullUpdate(
    id: string,
    token: string,
    dto: FullUpdateQuickBooksCompanyInfoDto,
  ): Promise<QuickBooksCompanyInfoResponseModel> {
    return this.post({
      ...dto,
      Id: id,
      SyncToken: token,
    });
  }

  public sparseUpdate(
    id: string,
    token: string,
    dto: SparseUpdateQuickBooksCompanyInfoDto,
  ): Promise<QuickBooksCompanyInfoResponseModel> {
    return this.post({
      ...dto,
      Id: id,
      SyncToken: token,
      sparse: true,
    });
  }
}
