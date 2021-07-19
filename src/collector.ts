import { ReportFactory } from './report/reportFactory';
import { ITokenPayload } from './token';
import ESClient from '@elastic/elasticsearch';

const client = new ESClient.Client({ node: 'http://localhost:9200' });

export class Collector {
  public static Collect(
    watcher: ITokenPayload,
    data: any,
  ) {
    const report = ReportFactory.Create(watcher, data);
    console.log(report.httpMethod, report.httpPath);
    client.index({
      index: 'api',
      body: report.JsonObject,
    });
  }
}
