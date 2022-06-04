import IApiResult from '../interfaces/IApiResult';

export class ApiResult<T> implements IApiResult {
  public code?: number;
  public status: boolean;
  public message: string;
  public data: T;
  public meta?: any;

  constructor(data: T, meta?: any) {
    this.code = 200;
    this.status = true;
    this.message = 'Operation was successed !';
    this.data = data;
    this.meta = meta;
  }
}
