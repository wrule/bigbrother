import { ReportFactory } from './report/reportFactory';
import { ITokenPayload } from './token';
import { MySQLDao } from './dao/mysql/mysql';
import { Service } from './service';
const mysqlConfig = require('../config/mysql.json');

const dao = new MySQLDao(mysqlConfig);
const service = new Service(dao);

export class Collector {
  public static Collect(
    watcher: ITokenPayload,
    data: any,
  ) {
    const report = ReportFactory.Create(watcher, data);
    console.log(`${report.watcherName}:`, report.prjName, report.httpMethod, report.httpPath);
    service.ScourApi(report);
  }
}
