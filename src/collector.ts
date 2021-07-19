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
    client.index({
      index: 'myapi',
      body: {
        method: report.httpMethod,
        path: report.httpPath,
        rspData: report.rspData,
      }
    });
  }
}
