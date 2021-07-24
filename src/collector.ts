import { ReportFactory } from './report/reportFactory';
import { ITokenPayload } from './token';
import fs from 'fs';
import * as Mishu from '@wrule/mishu';
import { scour } from './service';

export class Collector {
  public static Collect(
    watcher: ITokenPayload,
    data: any,
  ) {
    const report = ReportFactory.Create(watcher, data);
    console.log(`${report.watcherName}:`, report.prjName, report.httpMethod, report.httpPath);
    ScourApi(report);
  }
}
