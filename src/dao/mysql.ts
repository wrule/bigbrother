import { IDao } from './index';
import { Sequelize } from 'sequelize';
import { IAPI } from '../model/api';

export class MySQLDao implements IDao {
  constructor() {
    this.sequelize = new Sequelize({
      dialect: 'mysql',
      host: 'midware.dev.perfma-inc.com',
      port: 3306,
      username: 'app_tuba',
      password: 'Perfma@1234',
      database: 'perfma_tuba',
    });
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
