import { IAPI } from '../model/api';
import { JsFactory, ModelLoader } from '@wrule/mishu';
import { Report } from '../report/report';
import { IDao } from '../dao';

export class Service {
  constructor(private dao: IDao) { }

  public async getLatestApi(hash: string): Promise<IAPI | null> {
    return await this.dao.getLatestApiHistory(hash);
  }

  public async insertApiHistory(api: IAPI) {
    return await this.dao.insertApiHistory(api);
  }

  public async scourApi(report: Report) {
    const oldApi = await this.getLatestApi(report.id);
    if (oldApi) {
      const oldModel = ModelLoader.Load(oldApi.httpRspModel);
      const jsModel = JsFactory.Create('Rsp', report.httpRspData);
      const newModel = oldModel.Update(jsModel);
      if (!newModel.Equal(oldModel)) {
        console.log('发现接口变更: ', report.prjName, report.httpMethod, report.httpPath);
        this.insertApiHistory({
          ...report.Model,
          httpRspModel: newModel.ToModel(),
        });
      }
    } else {
      const newModel = JsFactory.Create('Rsp', report.httpRspData).ToTs();
      console.log('发现新接口: ', report.prjName, report.httpMethod, report.httpPath);
      this.insertApiHistory({
        ...report.Model,
        httpRspModel: newModel.ToModel(),
      });
    }
  }
  
}

const mysql = new MySQLDao(jsonObject);
