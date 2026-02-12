import api from '@/lib/api';

export const getCategories = () => api.get("/categories"); // ✅ GET كل التصنيفات
export const createCategory = (data: any) => api.post("/categories", data); // إنشاء
export const updateCategory = (id: number, data: any) => api.put(`/categories/${id}`, data); // تعديل
export const deleteCategory = (id: number) => api.delete(`/categories/${id}`); // حذف