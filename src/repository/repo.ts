export interface IRepository<T> {
  create: (data: any) => Promise<T>;
  update: (id: string, data: any) => Promise<T>;
  delete: (id: string) => Promise<T>;
  getById: (id: string) => Promise<T | null>;
  list: (dto: any) => Promise<T[]>;
  count: (dto: any) => Promise<number>;
}
