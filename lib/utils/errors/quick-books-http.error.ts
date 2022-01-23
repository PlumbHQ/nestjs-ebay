import { NestJsEbayError } from './quick-books.error';

export interface IEbayError {
  Message: string;
  Detail: string;
  code: string;
  element: string;
}

export interface IEbayErrorResponse {
  errors: IEbayError[];
  time: string;
  status: number;
}

export interface IEbayHttpError {
  Fault: {
    Error: {
      Message: string;
      Detail: string;
      code: string;
      element: string;
    }[];
    type: string;
  };
  time: string;
}

export interface INestJSEbayHttpError {
  message: string;
  detail: string;
  code: string;
}

export class NestJsEbayHttpError extends NestJsEbayError {
  public time: string;
  public type: string;
  public status: number;
  public errors: INestJSEbayHttpError[];

  constructor(errorData: IEbayHttpError, status: number) {
    super();

    this.message = errorData.Fault.type;
    this.status = status;
    this.type = errorData.Fault.type;
    this.time = errorData.time;

    this.errors = errorData.Fault.Error.map(
      (Error): INestJSEbayHttpError => ({
        message: Error.Message,
        detail: Error.Detail,
        code: Error.code,
      }),
    );
  }
}
