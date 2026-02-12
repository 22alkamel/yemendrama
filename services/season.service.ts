import api from "@/lib/api";

/**
 * جلب مواسم محتوى معيّن
 */
export const getSeasons = async (contentUuid: string) => {
  return api.get(`/contents/${contentUuid}/seasons`);
};

/**
 * إنشاء موسم جديد
 */
export const createSeason = async (
  contentUuid: string,
  data: {
    season_number: number;
    title?: string;
  }
) => {
  return api.post(`/contents/${contentUuid}/seasons`, data);
};
/**
 * تحديث موسم
 */
export const updateSeason = async (
  id: number,
  data: { number?: number }
) => {
  return api.put(`/seasons/${id}`, data);
};

/**
 * حذف موسم
 */
export const deleteSeason = async (id: number) => {
  return api.delete(`/seasons/${id}`);
};
