import { IDao } from '../dao';
import { Options, Sequelize } from 'sequelize';
import * as SQL from './sql';

export class MySQLDao implements IDao {
  constructor(options: Options) {
    this.sequelize = new Sequelize(options);
  }

  private sequelize: Sequelize;

  public get Sequelize() {
    return this.sequelize;
  }

  /**
   * 查询最新的Api历史记录详情
   * @param hash Api的hash
   * @returns 记录详情
   */
  public async GetLatestApiHistory(hash: string): Promise<unknown | null> {
    const result = (await this.sequelize.query({
      query: SQL.SQL_GetLatestApiHistory,
      values: [hash],
    }))[0][0];
    return result || null;
  }

  /**
   * 插入Api历史记录
   * @param api Api
   */
  public async InsertApiHistory(api: any): Promise<number | null> {
    const result = await this.sequelize.query({
      query: SQL.SQL_InsertApiHistory,
      values: [
        api.id,
        api.prjName,
        api.prjVersion,
        api.watcherName,
        api.watcherType,
        api.httpMethod,
        api.httpPath,
        api.httpRspData,
        api.httpRspModel,
        api.reportTime,
      ],
    });
    return 1 || null;
  }

  /**
   * 获取所有项目的统计信息列表
   * @returns 统计信息列表
   */
  public async GetAllProjectInfo(): Promise<unknown[]> {
    const result = await this.sequelize.query(
      SQL.SQL_GetAllProjectInfo
    );
    return result[0];
  }

  /**
   * 获取项目下所有的Api列表
   * @param projectName 项目名称
   * @returns Api列表
   */
  public async GetProjectApiList(projectName: string): Promise<unknown[]> {
    const result = await this.sequelize.query({
      query: SQL.SQL_GetProjectApiList,
      values: [projectName],
    });
    return result[0];
  }

  /**
   * 获取某一个Api历史记录
   * @param hash api的hash
   * @returns 历史记录
   */
  public async GetApiHistory(hash: string): Promise<unknown[]> {
    const result = await this.sequelize.query({
      query: SQL.SQL_GetApiHistory,
      values: [hash],
    });
    return result[0];
  }

  /**
   * 查询某个Api历史记录详情
   * @param id 历史记录id
   * @returns 历史记录详情
   */
  public async GetApiHistoryDetail(id: number): Promise<unknown | null> {
    const result = (await this.sequelize.query({
      query: SQL.SQL_GetApiHistoryDetail,
      values: [id],
    }))[0][0];
    return result || null;
  }
}
