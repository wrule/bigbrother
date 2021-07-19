import { AxiosResponse } from 'axios';
import { IReport } from './index';
import URI from 'urijs';
import { ITokenPayload } from '../token';

export class AxiosReport implements IReport {
  constructor(
    private watcher: ITokenPayload,
    private rsp: AxiosResponse<any>,
  ) {
    this.reportTime = Number(new Date());
  }

  public readonly reportTime: number;

  public get prjName() {
    return this.watcher.prj;
  }

  public get prjVersion() {
    return this.watcher.ver;
  }

  public get watcherName() {
    return this.watcher.name;
  }

  public get watcherType() {
    return this.watcher.type;
  }

  public get httpMethod() {
    return this.rsp.config.method || '';
  }

  public get httpPath() {
    return URI.parse(this.rsp.config.url || '').path || '';
  }

  public get rspData() {
    return this.rsp.data;
  }
}
