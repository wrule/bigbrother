import { ReportFactory } from './report/reportFactory';
import { ITokenPayload } from './token';

export class Collector {
  public static Collect(
    watcher: ITokenPayload,
    data: any,
  ) {
    const report = ReportFactory.Create(watcher, data);
    console.log(report.httpMethod, report.httpPath);
  }
}
