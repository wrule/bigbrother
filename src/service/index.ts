import { IApi } from '../model/api';
import { JsFactory, ModelLoader } from '@wrule/mishu';
import { Report } from '../report/report';
import { IDao } from '../dao/dao';

export class Service {
  constructor(private dao: IDao) { }

  public async GetLatestApi(hash: string): Promise<IApi | null> {
    const result: any = await this.dao.GetLatestApiHistory(hash);
    if (result) {
      result.httpRspData = JSON.parse(result.httpRspData);
      result.httpRspModel = JSON.parse(result.httpRspModel);
      return result as IApi;
    }
    return null;
  }

  public async InsertApiHistory(api: IApi) {
    const insertData: any = { ...api };
    insertData.httpRspData = JSON.stringify(insertData.httpRspData);
    insertData.httpRspModel = JSON.stringify(insertData.httpRspModel);
    const result = await this.dao.InsertApiHistory(insertData);
    return result;
  }

  public async ScourApi(report: Report) {
    const latestApi = await this.GetLatestApi(report.hash);
    if (latestApi) {
      const latestModel = ModelLoader.Load(latestApi.httpRspModel);
      const api = report.ToApi();
      const jsModel = JsFactory.Create('rsp', api.httpRspData);
      const newModel = latestModel.Update(jsModel);
      if (!newModel.Equal(latestModel)) {
        console.log('发现接口变更: ', report.prjName, report.httpMethod, report.httpPath);
        this.InsertApiHistory(report.ToApi());
      }
    } else {
      console.log('发现新接口: ', report.prjName, report.httpMethod, report.httpPath);
      this.InsertApiHistory(report.ToApi());
    }
  }
}
