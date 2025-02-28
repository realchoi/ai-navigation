import http from "@/utils/request";
import type { PagedQueryOutput } from "@/types/pagedQuery";

/**
 * AI 收藏 DTO
 */
export interface AiFavoriteDto {
  id: string;
  userId: string;
  websiteId: string;
}

/**
 * 新增/编辑 AI 收藏
 * @param dto AI 收藏 DTO
 * @returns 新数据的主键 ID
 */
export function addOrUpdate(dto: AiFavoriteDto): Promise<string> {
  return http.post("/ai/favorite", dto);
}

/**
 * 查询 AI 收藏分页列表
 */
export function queryAiFavoritePage(
  pageIndex: number,
  pageSize: number
): Promise<PagedQueryOutput<AiFavoriteDto>> {
  return http.post("/ai/favorite/page", { pageIndex, pageSize });
}
