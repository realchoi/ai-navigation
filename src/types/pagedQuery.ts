/**
 * 分页查询输入
 */
export interface PagedQueryInput {
  pageIndex: number;
  pageSize: number;
}

/**
 * 分页查询输出
 */
export interface PagedQueryOutput<T = any> {
  total: number;
  items: T[];
}
