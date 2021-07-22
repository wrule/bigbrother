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
    const result = await this.sequelize.query({
      query: SQL_QueryLatestAPI,
      values: [hash],
    });
    return result[0][0];
  }

  public async pushApi(api: IAPI) {
    await this.sequelize.query({
      query: SQL_InsertAPI,
      values: [
        '',
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
