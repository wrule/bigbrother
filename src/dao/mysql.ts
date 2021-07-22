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

  public async getAllProjectName() {
    const result = await this.sequelize.query(SQL_GetAllProjectName);
    return result;
  }

  public async getProjectApiList(projectName: string) {
    const result = await this.sequelize.query({
      query: SQL_GetProjectApiList,
      values: [projectName],
    });
    return result;
  }

  public async getApiHistory(apiHash: string) {
    const result = await this.sequelize.query({
      query: SQL_GetApiHistory,
      values: [apiHash],
    });
    return result;
  }
}

const SQL_QueryLatestAPI = `
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

const SQL_InsertAPI = `
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

const SQL_GetAllProjectName = `
SELECT DISTINCT
	prjName
FROM
	api
`;

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

const SQL_GetApiHistory = `
SELECT
	*
FROM
	api
WHERE
	\`hash\` = ?
`;
