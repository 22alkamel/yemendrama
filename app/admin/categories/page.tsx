"use client";

import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "@/services/category.service";
import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";

export default function AdminCategories() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [type, setType] = useState("genre");
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await getCategories();

      // إذا كان res.data.data هو المصفوفة الحقيقية
      const categoriesArray = Array.isArray(res.data)
        ? res.data
        : res.data.data;

      setCategories(categoriesArray || []);
    } catch (err) {
      console.error(err);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreateOrUpdate = async () => {
    if (editingId) {
      // تعديل
      await updateCategory(editingId, { name, type });
      setEditingId(null);
    } else {
      // إنشاء
      await createCategory({ name, type });
    }
    setName("");
    setType("genre");
    fetchCategories();
  };

  const handleEdit = (cat: any) => {
    setName(cat.name);
    setType(cat.type);
    setEditingId(cat.id);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("هل أنت متأكد من الحذف؟")) return;
    await deleteCategory(id);
    fetchCategories();
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">إدارة التصنيفات</h2>

        {/* إضافة / تعديل */}
        <div className="flex gap-2 mb-6">
          <input
            placeholder="اسم التصنيف"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 rounded bg-gray-700 text-white"
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="p-2 rounded bg-gray-700 text-white"
          >
            <option value="genre">نوع</option>
            <option value="topic">موضوع</option>
            <option value="age">الفئة العمرية</option>
          </select>
          <button
            onClick={handleCreateOrUpdate}
            className="bg-red-600 px-4 rounded text-white"
          >
            {editingId ? "تعديل" : "إضافة"}
          </button>
          {editingId && (
            <button
              onClick={() => {
                setEditingId(null);
                setName("");
                setType("genre");
              }}
              className="bg-gray-600 px-4 rounded text-white"
            >
              إلغاء
            </button>
          )}
        </div>

        {/* جدول التصنيفات */}
        {loading ? (
          <p>جارٍ التحميل...</p>
        ) : (
          <table className="min-w-full bg-gray-800 text-white rounded-lg ">
            <thead className="text-right">
              <tr>
                <th className="p-2">#</th>
                <th className="p-2">الاسم</th>
                <th className="p-2">النوع</th>
                <th className="p-2">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat, idx) => (
                <tr key={cat.id} className="border-t border-gray-700">
                  <td className="p-2">{idx + 1}</td>
                  <td className="p-2">{cat.name}</td>
                  <td className="p-2">{cat.type}</td>
                  <td className="p-2 flex gap-2">
                    <button
                      onClick={() => handleEdit(cat)}
                      className="bg-yellow-500 px-2 rounded"
                    >
                      تعديل
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="bg-red-600 px-2 rounded"
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
}
