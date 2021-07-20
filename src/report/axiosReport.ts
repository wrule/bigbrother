import URI from 'urijs';
import { AxiosResponse } from 'axios';
import { Report } from './report';
import { ITokenPayload } from '../token';

export class AxiosReport extends Report {
  constructor(
    private watcher: ITokenPayload,
    private axiosRsp: AxiosResponse<any>,
  ) {
    super();
  }

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
    return this.axiosRsp.config.method || '';
  }

  public get httpPath() {
    return URI.parse(this.axiosRsp.config.url || '').path || '';
  }

  public get httpRspData() {
    return this.axiosRsp.data;
  }
}
