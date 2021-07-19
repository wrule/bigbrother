
export abstract class Report {
  constructor() {
    this.reportTime = new Date();
  }

  public readonly reportTime: Date;

  public get id() {
    const desc = `${this.prjName}-${this.watcherType}-${this.httpMethod}-${this.httpPath}`;
    return desc;
  }

  public get JsonObject() {
    return {
      id: this.id,
      prjName: this.prjName,
      prjVersion: this.prjVersion,
      watcherName: this.watcherName,
      watcherType: this.watcherType,
      httpMethod: this.httpMethod,
      httpPath: this.httpPath,
      rspData: this.rspData,
      reportTime: this.reportTime,
    };
  }

  abstract prjName: string;
  abstract prjVersion: string;
  abstract watcherName: string;
  abstract watcherType: string;
  abstract httpMethod: string;
  abstract httpPath: string;
  abstract rspData: any;
}
