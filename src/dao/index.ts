import { IAPI } from '../model/api';

export interface IDao {
  getLatestApiHistory(hash: string): any;

  insertApiHistory(api: any): any;

  getAllProjectInfo(): Promise<any[]>;

  getProjectApiList(projectName: string): Promise<any[]>;

  getApiHistory(apiHash: string): Promise<any[]>;
}
