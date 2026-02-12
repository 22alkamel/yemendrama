import api from "@/lib/api";

export const getNews = () => api.get("/news");

export const getNewsByCategory = (slug: string) =>
  api.get(`/news?category=${slug}`);

export const getCategories = () => api.get("/news-categories");

export const createCategory = (data: any) => api.post("/news-categories", data);

export const updateCategory = (id: number, data: any) =>
  api.put(`/news-categories/${id}`, data);

export const deleteCategory = (id: number) =>
  api.delete(`/news-categories/${id}`);
