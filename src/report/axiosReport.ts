import { AxiosResponse } from 'axios';
import { IReport } from './index';
import URI from 'urijs';

export class AxiosReport implements IReport {
  constructor(private rsp: AxiosResponse<any>) { }

  public get PrjName() {
    return '';
  }

  public get PrjVersion() {
    return '';
  }

  public get HTTPMethod() {
    return this.rsp.config.method || '';
  }

  public get HTTPPath() {
    return URI.parse(this.rsp.config.url || '').path || '';
  }

  public get RspData() {
    return this.rsp.data;
  }
}
