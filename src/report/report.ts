import { StringHash } from '../utils';

export abstract class Report {
  constructor() {
    this.reportTime = new Date();
  }

  public readonly reportTime: Date;

  public get id() {
    const desc = `${this.prjName}-${this.watcherType}-${this.httpMethod}-${this.httpPath}`;
    return StringHash(desc);
  }

  abstract prjName: string;
  abstract prjVersion: string;
  abstract watcherName: string;
  abstract watcherType: string;
  abstract httpMethod: string;
  abstract httpPath: string;
  abstract httpRspData: any;

  public get JsonObject() {
    return {
      id: this.id,
      prjName: this.prjName,
      prjVersion: this.prjVersion,
      watcherName: this.watcherName,
      watcherType: this.watcherType,
      httpMethod: this.httpMethod,
      httpPath: this.httpPath,
      httpRspData: this.httpRspData,
      reportTime: this.reportTime,
    };
  }
}
