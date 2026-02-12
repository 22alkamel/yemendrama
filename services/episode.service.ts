import api from "@/lib/api";

/**
 * جلب الحلقات
 */
export const getEpisodes = async () => {
  return api.get("/episodes");
};

/**
 * إنشاء حلقة جديدة
 */
export const createEpisode = async (data: {
  content_id: string; // UUID
  season_id?: number | null;
  title: string;
  video_url: string;
  thumbnail?: string | null;
  duration?: string | null;
}) => {
  return api.post("/episodes", data);
};

/**
 * تحديث حلقة
 */
export const updateEpisode = async (
  id: number,
  data: {
    title?: string;
    video_url?: string;
    thumbnail?: string | null;
    duration?: string | null;
  }
) => {
  return api.put(`/episodes/${id}`, data);
};

/**
 * حذف حلقة
 */
export const deleteEpisode = async (id: number) => {
  return api.delete(`/episodes/${id}`);
};
