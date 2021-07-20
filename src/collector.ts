import { ReportFactory } from './report/reportFactory';
import { ITokenPayload } from './token';
import fs from 'fs';
export class Collector {
  public static Collect(
    watcher: ITokenPayload,
    data: any,
  ) {
    const report = ReportFactory.Create(watcher, data);
    console.log(`${report.watcherName}:`, report.prjName, report.httpMethod, report.httpPath);
    fs.writeFileSync(`./jsons/${report.id}.json`, JSON.stringify(report.JsonObject.httpRspData, null, 2));
    // client.index({
    //   index: 'api',
    //   body: report.JsonObject,
    // });
  }
}
