import { IAPI } from '../model/api';
import fs from 'fs';
import { JsFactory, JsonObjectLoader } from '@wrule/mishu';
import { Report } from '../report/report';

export function getJsonPathById(id: string) {
  return `./jsons/${id}.json`;
}

export function queryAPIById(id: string) {
  const jsonPath = getJsonPathById(id);
  if (fs.existsSync(jsonPath)) {
    const jsonStr = fs.readFileSync(jsonPath, 'utf8');
    const api = JSON.parse(jsonStr) as IAPI;
    return api;
  }
  return null;
}

export function updateAPI(api: IAPI) {
  const jsonPath = getJsonPathById(api.id);
  fs.writeFileSync(jsonPath, JSON.stringify(api, null, 2));
}

export function scour(report: Report) {
  const oldApi = queryAPIById(report.id);
  if (oldApi) {
    const oldModel = JsonObjectLoader.Load(oldApi.httpRspModel);
    const jsModel = JsFactory.Create('Rsp', report.httpRspData);
    const newModel = oldModel.Update(jsModel);
    if (!newModel.Equal(oldModel)) {
      console.log('发现接口变更: ', report.prjName, report.httpMethod, report.httpPath);
      updateAPI({
        ...report.JsonObject,
        httpRspModel: newModel.ToJsonObject(),
      });
    }
  } else {
    const newModel = JsFactory.Create('Rsp', report.httpRspData).ToTs();
    console.log('发现新接口: ', report.prjName, report.httpMethod, report.httpPath);
    updateAPI({
      ...report.JsonObject,
      httpRspModel: newModel.ToJsonObject(),
    });
  }
}
