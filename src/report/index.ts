
export abstract class Report {
  constructor() {
    this.reportTime = new Date();
  }

  public readonly reportTime: Date;

  public get id() {
    const desc = `${this.prjName}-${this.watcherType}-${this.httpMethod}-${this.httpPath}`;
    return desc;
  }

  abstract prjName: string;
  abstract prjVersion: string;
  abstract watcherName: string;
  abstract watcherType: string;
  abstract httpMethod: string;
  abstract httpPath: string;
  abstract rspData: any;
}
