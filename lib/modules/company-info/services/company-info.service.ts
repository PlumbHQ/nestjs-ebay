import { Injectable } from '@nestjs/common';
import { firstValueFrom, mergeMap } from 'rxjs';
import { NestJsQuickBooksBaseService } from '../../common/base.service';
import {
  FullUpdateQuickBooksCompanyInfoDto,
  QuickBooksCompanyInfo,
  QuickBooksCompanyInfoQueryModel,
  QuickBooksCompanyInfoQueryResponseDto,
  QuickBooksCompanyInfoResponseDto,
  SparseUpdateQuickBooksCompanyInfoDto,
} from '..';

@Injectable()
export class NestJsQuickBooksCompanyInfoService extends NestJsQuickBooksBaseService<
  QuickBooksCompanyInfoResponseDto,
  QuickBooksCompanyInfoQueryModel,
  QuickBooksCompanyInfoQueryResponseDto
> {
  public resource = 'companyinfo';

  public read(): Promise<QuickBooksCompanyInfoResponseDto> {
    return firstValueFrom(this.getRealm().pipe(mergeMap((x) => this.get(x))));
  }

  public fullUpdate(
    id: string,
    token: string,
    dto: FullUpdateQuickBooksCompanyInfoDto,
  ): Promise<QuickBooksCompanyInfoResponseDto>;
  public fullUpdate(
    company: QuickBooksCompanyInfo,
    dto: FullUpdateQuickBooksCompanyInfoDto,
  ): Promise<QuickBooksCompanyInfoResponseDto>;
  public fullUpdate(
    ...args: [
      string | QuickBooksCompanyInfo,
      string | FullUpdateQuickBooksCompanyInfoDto,
      FullUpdateQuickBooksCompanyInfoDto?,
    ]
  ): Promise<QuickBooksCompanyInfoResponseDto> {
    const [id, token, dto] = this.getUpdateArguments(args);
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
  ): Promise<QuickBooksCompanyInfoResponseDto>;
  public sparseUpdate(
    company: QuickBooksCompanyInfo,
    dto: SparseUpdateQuickBooksCompanyInfoDto,
  ): Promise<QuickBooksCompanyInfoResponseDto>;
  public sparseUpdate(
    ...args: [
      string | QuickBooksCompanyInfo,
      string | SparseUpdateQuickBooksCompanyInfoDto,
      SparseUpdateQuickBooksCompanyInfoDto?,
    ]
  ): Promise<QuickBooksCompanyInfoResponseDto> {
    const [id, token, dto] = this.getUpdateArguments(args);
    return this.post({
      ...dto,
      Id: id,
      SyncToken: token,
      sparse: true,
    });
  }

  private getUpdateArguments<DTO>(
    args: [string | QuickBooksCompanyInfo, string | DTO, DTO?],
  ): [string, string, DTO] {
    const [idOrCompany, tokenOrDto, dto] = args;
    if (dto) {
      return [idOrCompany as string, tokenOrDto as string, dto];
    }

    const company = idOrCompany as QuickBooksCompanyInfo;
    return [company.Id, company.SyncToken, tokenOrDto as DTO];
  }
}
