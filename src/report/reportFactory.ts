import { IReport } from '.';
import { ITokenPayload } from '../token';
import { AxiosReport } from './axiosReport';

export class ReportFactory {
  public static Create(
    watcher: ITokenPayload,
    data: any,
  ): IReport {
    switch (watcher.type) {
      case 'axios':
        return new AxiosReport(watcher, data);
      default:
        throw new Error('未识别的类型');
    }
  }
}
