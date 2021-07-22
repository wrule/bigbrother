import { IAPI } from '../model/api';

export interface IDao {
  getLatestApi(hash: string): any;

  pushApi(api: IAPI): any;

  getAllProjectName(): any;
}
