"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategories,
} from "@/services/newsCategory.service"; // تأكد أن هذا الـ service يحتوي على الـ API الصحيح

export default function AdminNewsCategories() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  // جلب التصنيفات من API
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await getCategories();
      const data = Array.isArray(res.data) ? res.data : res.data.data;
      setCategories(data || []);
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

  // إنشاء / تعديل تصنيف
  const handleCreateOrUpdate = async () => {
    if (!name.trim()) return alert("أدخل اسم التصنيف");

    try {
      if (editingId) {
        await updateCategory(editingId, { name });
        setEditingId(null);
      } else {
        await createCategory({ name });
      }
      setName("");
      fetchCategories();
    } catch (err) {
      console.error(err);
      alert("حدث خطأ، حاول مرة أخرى");
    }
  };

  // تعديل عنصر
  const handleEdit = (cat: any) => {
    setName(cat.name);
    setEditingId(cat.id);
  };

  // حذف عنصر
  const handleDelete = async (id: number) => {
    if (!confirm("هل أنت متأكد من حذف هذا التصنيف؟")) return;
    try {
      await deleteCategory(id);
      fetchCategories();
    } catch (err) {
      console.error(err);
      alert("حدث خطأ أثناء الحذف");
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">إدارة تصنيفات الأخبار</h2>

        {/* إضافة / تعديل */}
        <div className="flex gap-2 mb-6">
          <input
            placeholder="اسم التصنيف"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 rounded bg-gray-700 text-white"
          />
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
        ) : categories.length === 0 ? (
          <p className="text-gray-400">لا توجد تصنيفات حالياً</p>
        ) : (
          <table className="min-w-full bg-gray-800 text-white rounded-lg">
            <thead className="text-right">
              <tr>
                <th className="p-2">#</th>
                <th className="p-2">الاسم</th>
                <th className="p-2">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat, idx) => (
                <tr key={cat.id} className="border-t border-gray-700">
                  <td className="p-2">{idx + 1}</td>
                  <td className="p-2">{cat.name}</td>
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
