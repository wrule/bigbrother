import { TS } from '@wrule/mishu';
import { IApi } from '../model/api';
import { StringHash } from '../utils';

export abstract class Report {
  constructor() {
    this.reportTime = new Date();
  }

  public readonly reportTime: Date;

  public get hash() {
    const desc = `${this.prjName}-${this.httpMethod}-${this.httpPath}`;
    return StringHash(desc);
  }

  abstract prjName: string;
  abstract prjVersion: string;
  abstract watcherName: string;
  abstract watcherType: string;
  abstract httpMethod: string;
  abstract httpPath: string;
  abstract httpRspData: any;

  public ToApi(): IApi {
    return {
      hash: this.hash,
      prjName: this.prjName,
      prjVersion: this.prjVersion,
      watcherName: this.watcherName,
      watcherType: this.watcherType,
      httpMethod: this.httpMethod,
      httpPath: this.httpPath,
      httpRspData: this.httpRspData,
      httpRspModel: TS(this.httpRspData).ToModel(),
      reportTime: this.reportTime,
    };
  }
}
