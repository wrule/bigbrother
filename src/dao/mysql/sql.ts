/**
 * 查询最新的Api历史记录详情SQL
 */
export const SQL_GetLatestApiHistory = `
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
export const SQL_InsertApiHistory = `
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
export const SQL_GetAllProjectInfo = `
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
export const SQL_GetProjectApiList = `
SELECT DISTINCT
  \`hash\`,
  prjName,
  watcherType,
  httpMethod,
  httpPath
FROM
  api
WHERE
  prjName = ?
`;
 
/**
 * 获取某一个Api历史记录SQL
 */
export const SQL_GetApiHistory = `
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
export const SQL_GetApiHistoryDetail = `
SELECT
  *
FROM
  api
WHERE
  id = ?
`;
