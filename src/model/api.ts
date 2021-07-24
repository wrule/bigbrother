import { IModel } from '@wrule/mishu';

export interface IAPI {
  hash: string;
  prjName: string,
  prjVersion: string,
  watcherName: string,
  watcherType: string,
  httpMethod: string,
  httpPath: string,
  httpRspData: any,
  httpRspModel: IModel,
  reportTime: Date,
}
