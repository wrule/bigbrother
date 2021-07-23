import { IDao } from './index';
import { Options, Sequelize } from 'sequelize';
import { IAPI } from '../model/api';

export class MySQLDao implements IDao {
  constructor(options: Options) {
    this.sequelize = new Sequelize(options);
  }

  private sequelize: Sequelize;

  public async getLatestApi(hash: string) {
    const result: any = (await this.sequelize.query({
      query: SQL_QueryLatestAPI,
      values: [hash],
    }))[0][0];
    if (result) {
      result.id = result.hash;
      result.httpRspData = JSON.parse(result.httpRspData);
      result.httpRspModel = JSON.parse(result.httpRspModel);
      return result;
    }
    return null;
  }

  public async pushApi(api: IAPI) {
    await this.sequelize.query({
      query: SQL_InsertAPI,
      values: [
        api.id,
        api.prjName,
        api.prjVersion,
        api.watcherName,
        api.watcherType,
        api.httpMethod,
        api.httpPath,
        JSON.stringify(api.httpRspData),
        JSON.stringify(api.httpRspModel),
        api.reportTime,
      ],
    });
  }

  /**
   * 获取所有项目的统计信息列表
   * @returns 统计信息列表
   */
  public async getAllProjectInfo() {
    const result = await this.sequelize.query(
      SQL_GetAllProjectInfo
    );
    return result[0] as any[];
  }

  /**
   * 获取项目下所有的Api列表
   * @param projectName 项目名称
   * @returns Api列表
   */
  public async getProjectApiList(projectName: string) {
    const result = await this.sequelize.query({
      query: SQL_GetProjectApiList,
      values: [projectName],
    });
    return result[0] as any[];
  }

  public async getApiHistory(apiHash: string) {
    const result = await this.sequelize.query({
      query: SQL_GetApiHistory,
      values: [apiHash],
    });
    return result;
  }
}

/**
 * 查询最新的Api历史记录详情SQL
 */
const SQL_QueryLatestApiHistory = `
SELECT
	*
FROM
	\`api\`
WHERE
	\`hash\` = ?
ORDER BY
	\`reportTime\`
DESC
LIMIT 1
`;

/**
 * 插入Api历史记录SQL
 */
const SQL_InsertApiHistory = `
INSERT INTO
	\`api\`
VALUES (
	NULL,
	?,
	?,
	?,
	?,
	?,
	?,
	?,
	?,
	?,
	?
)
`;

/**
 * 查询所有项目统计信息SQL
 */
const SQL_GetAllProjectInfo = `
SELECT
	b.*,
	COUNT(1) 'apiHistoryNum'
FROM
	(
		SELECT
			a.prjName,
			COUNT(1) 'apiNum'
		FROM
			(
				SELECT DISTINCT
					prjName,
					\`hash\`
				FROM
					api
			) a
		GROUP BY
			prjName
	) b
LEFT JOIN
	api c
ON
	b.prjName = c.prjName
GROUP BY
	b.prjName,
	b.apiNum
`;

/**
 * 查询项目下Api列表SQL
 */
const SQL_GetProjectApiList = `
SELECT DISTINCT
	\`hash\`,
	prjName,
	watcherType,
	httpMethod,
	httpPath
FROM
	api
WHERE
	prjName = ?;
`;

/**
 * 获取某一个Api历史记录SQL
 */
const SQL_GetApiHistory = `
SELECT
	id,
	\`hash\`,
	prjName,
	prjVersion,
	watcherName,
	watcherType,
	httpMethod,
	httpPath,
	reportTime
FROM
	api
WHERE
	\`hash\` = ?
ORDER BY
	reportTime
DESC
`;

/**
 * 查询某个Api历史记录详情SQL
 */
const SQL_GetApiHistoryDetail = `
SELECT
	*
FROM
	api
WHERE
	id = ?
`;
