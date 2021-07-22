import { IAPI } from '../model/api';
import { JsFactory, ModelLoader } from '@wrule/mishu';
import { Report } from '../report/report';
import { MySQLDao } from '../dao/mysql';
const jsonObject = require('../../config/mysql.json');

console.log(jsonObject);

const mysql = new MySQLDao(jsonObject);

export async function queryAPIById(id: string): Promise<IAPI | null> {
  return await mysql.getLatestApi(id);
}

export async function updateAPI(api: IAPI) {
  return await mysql.pushApi(api);
}

export async function scour(report: Report) {
  const oldApi = await queryAPIById(report.id);
  if (oldApi) {
    const oldModel = ModelLoader.Load(oldApi.httpRspModel);
    const jsModel = JsFactory.Create('Rsp', report.httpRspData);
    const newModel = oldModel.Update(jsModel);
    if (!newModel.Equal(oldModel)) {
      console.log('发现接口变更: ', report.prjName, report.httpMethod, report.httpPath);
      updateAPI({
        ...report.Model,
        httpRspModel: newModel.ToModel(),
      });
    }
  } else {
    const newModel = JsFactory.Create('Rsp', report.httpRspData).ToTs();
    console.log('发现新接口: ', report.prjName, report.httpMethod, report.httpPath);
    updateAPI({
      ...report.Model,
      httpRspModel: newModel.ToModel(),
    });
  }
}
