export interface IDao {
  getLatestApiHistory(hash: string): Promise<unknown | null>;

  insertApiHistory(api: unknown): Promise<number | null>;

  getAllProjectInfo(): Promise<unknown[]>;

  getProjectApiList(projectName: string): Promise<unknown[]>;

  getApiHistory(apiHash: string): Promise<unknown[]>;
}
