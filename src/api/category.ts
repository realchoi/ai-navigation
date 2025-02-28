import http from "@/utils/request";
import type { PagedQueryOutput } from "@/types/pagedQuery";

/**
 * AI 分类 DTO
 */
export interface AiCategoryDto {
  id: string;
  name: string;
}

/**
 * 新增/编辑 AI 分类
 * @param dto AI 分类 DTO
 * @returns 新数据的主键 ID
 */
export function addOrUpdate(dto: AiCategoryDto): Promise<string> {
  return http.post("/ai/category", dto);
}

/**
 * 查询 AI 分类分页列表
 * @param pageIndex 页码
 * @param pageSize 每页条数
 * @returns 分页列表
 */
export function queryPage(
  pageIndex: number,
  pageSize: number
): Promise<PagedQueryOutput<AiCategoryDto>> {
  return http.post("/ai/category/page", {
    pageIndex,
    pageSize,
  });
}
