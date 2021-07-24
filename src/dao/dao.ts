export interface IDao {
  GetLatestApiHistory(hash: string): Promise<unknown | null>;

  InsertApiHistory(api: unknown): Promise<number | null>;

  GetAllProjectInfo(): Promise<unknown[]>;

  GetProjectApiList(projectName: string): Promise<unknown[]>;

  GetApiHistory(apiHash: string): Promise<unknown[]>;

  GetApiHistoryDetail(id: number): Promise<unknown | null>;
}
