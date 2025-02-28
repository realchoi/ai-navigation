import http from "@/utils/request";
import type { PagedQueryOutput } from "@/types/pagedQuery";

/**
 * AI网站 DTO
 */
export interface AiWebsiteDto {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  url: string;
  logo: string;
  tags: string[];
}

/**
 * 新增/编辑 AI 网站
 * @param dto AI 网站 DTO
 * @returns 新数据的主键 ID
 */
export function addOrUpdate(dto: AiWebsiteDto): Promise<string> {
  return http.post("/ai/website", dto);
}

/**
 * 查询 AI 网站分页列表
 * @param pageIndex 页码
 * @param pageSize 每页条数
 * @returns 分页列表
 */
export function queryPage(
  categoryId: string,
  keyword: string,
  pageIndex: number,
  pageSize: number
): Promise<PagedQueryOutput<AiWebsiteDto>> {
  return http.post("/ai/website/page", {
    categoryId,
    keyword,
    pageIndex,
    pageSize,
  });
}
