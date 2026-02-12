"use client";

import { useState, useEffect } from "react";
import { updateNews } from "@/services/news.service";
import { getCategories } from "@/services/newsCategory.service";

interface Props {
  news: any;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function EditNewsForm({ news, onSuccess, onCancel }: Props) {
  const [title, setTitle] = useState(news.title);
  const [summary, setSummary] = useState(news.summary || "");
  const [body, setBody] = useState(news.body);
  const [type, setType] = useState(news.type);
  const [status, setStatus] = useState(news.status);
  const [categoryId, setCategoryId] = useState<number>(news.news_category_id);
  const [image, setImage] = useState<File | null>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        const data = Array.isArray(res.data) ? res.data : res.data.data;
        setCategories(data || []);
      } catch (err) {
        console.error("Fetch categories error", err);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!categoryId) return alert("اختر تصنيفًا للخبر");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("summary", summary);
      formData.append("body", body);
      formData.append("type", type);
      formData.append("status", status);
      formData.append("news_category_id", categoryId.toString());
      if (image) formData.append("image", image);

      await updateNews(news.uuid, formData);

      onSuccess();
    } catch (error: any) {
      console.error("Update news error", error.response?.data);
      alert("حدث خطأ أثناء التحديث");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900 p-6 rounded-lg shadow-lg space-y-4"
    >
      <h3 className="text-xl font-bold text-white">تعديل الخبر</h3>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-3 rounded bg-gray-800 text-white"
      />

      <textarea
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        className="w-full p-3 rounded bg-gray-800 text-white"
        rows={2}
      />

      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="w-full p-3 rounded bg-gray-800 text-white"
        rows={6}
      />

      {/* اختيار التصنيف */}
      <select
        value={categoryId || ""}
        onChange={(e) => setCategoryId(Number(e.target.value))}
        className="p-2 rounded bg-gray-800 text-white w-full"
      >
        <option value="" disabled>
          اختر تصنيف الخبر
        </option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <div className="flex gap-4">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="p-2 rounded bg-gray-800 text-white"
        >
          <option value="article">مقال</option>
          <option value="video">فيديو</option>
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="p-2 rounded bg-gray-800 text-white"
        >
          <option value="draft">مسودة</option>
          <option value="published">منشور</option>
        </select>
      </div>

      <input
        type="file"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
        className="text-white"
      />

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="bg-yellow-500 hover:bg-yellow-600 px-6 py-2 rounded text-white"
        >
          {loading ? "جارٍ التحديث..." : "تحديث"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-600 px-6 py-2 rounded text-white"
        >
          إلغاء
        </button>
      </div>
    </form>
  );
}
