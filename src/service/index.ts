import { IAPI } from '../model/api';
import { JsFactory, ModelLoader } from '@wrule/mishu';
import { Report } from '../report/report';
import { IDao } from '../dao/dao';
import { MySQLDao } from '../dao/mysql/mysql';

export class Service {
  constructor(private dao: IDao) { }

  public async GetLatestApi(hash: string): Promise<IAPI | null> {
    const result: any = await this.dao.GetLatestApiHistory(hash);
    result.httpRspData = JSON.parse(result.httpRspData);
    result.httpRspModel = JSON.parse(result.httpRspModel);
    return result as IAPI;
  }

  public async InsertApiHistory(api: IAPI) {
    const insertData: any = { ...api };
    insertData.httpRspData = JSON.stringify(insertData.httpRspData);
    insertData.httpRspModel = JSON.stringify(insertData.httpRspModel);
    return await this.dao.InsertApiHistory(api);
  }

  public async ScourApi(report: Report) {
    const latestApi = await this.GetLatestApi(report.id);
    if (latestApi) {
      const oldModel = ModelLoader.Load(latestApi.httpRspModel);
      const jsModel = JsFactory.Create('Rsp', report.httpRspData);
      const newModel = oldModel.Update(jsModel);
      if (!newModel.Equal(oldModel)) {
        console.log('发现接口变更: ', report.prjName, report.httpMethod, report.httpPath);
        this.InsertApiHistory({
          ...report.Model,
          httpRspModel: newModel.ToModel(),
        });
      }
    } else {
      const newModel = JsFactory.Create('Rsp', report.httpRspData).ToTs();
      console.log('发现新接口: ', report.prjName, report.httpMethod, report.httpPath);
      this.InsertApiHistory({
        ...report.Model,
        httpRspModel: newModel.ToModel(),
      });
    }
  }
  
}

const mysql = new MySQLDao(jsonObject);
