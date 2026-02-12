"use client";

import { useState, useEffect } from "react";
import { createNews } from "@/services/news.service";
import { getCategories } from "@/services/newsCategory.service";

interface Props {
  onSuccess: () => void;
}

export default function CreateNewsForm({ onSuccess }: Props) {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [body, setBody] = useState("");
  const [type, setType] = useState("article");
  const [status, setStatus] = useState("draft");
  const [isBreaking, setIsBreaking] = useState(false);
  const [categoryId, setCategoryId] = useState<number | null>(null);
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
      formData.append("is_breaking", isBreaking ? "1" : "0");
      formData.append("news_category_id", categoryId.toString());

      if (image) formData.append("image", image);

      await createNews(formData);

      setTitle("");
      setSummary("");
      setBody("");
      setType("article");
      setStatus("draft");
      setIsBreaking(false);
      setCategoryId(null);
      setImage(null);

      onSuccess();
    } catch (error: any) {
      console.error(error.response?.data);
      alert("حدث خطأ، حاول مرة أخرى");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900 p-6 rounded-lg shadow-lg space-y-4"
    >
      <h3 className="text-xl font-bold text-white">إضافة خبر جديد</h3>

      <input
        type="text"
        placeholder="عنوان الخبر"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-3 rounded bg-gray-800 text-white"
        required
      />

      <textarea
        placeholder="ملخص"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        className="w-full p-3 rounded bg-gray-800 text-white"
        rows={2}
      />

      <textarea
        placeholder="محتوى الخبر"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="w-full p-3 rounded bg-gray-800 text-white"
        rows={6}
        required
      />

      {/* اختيار التصنيف */}
      <select
        value={categoryId || ""}
        onChange={(e) => setCategoryId(Number(e.target.value))}
        className="p-2 rounded bg-gray-800 text-white w-full"
        required
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

      <label className="flex items-center gap-2 text-white">
        <input
          type="checkbox"
          checked={isBreaking}
          onChange={(e) => setIsBreaking(e.target.checked)}
        />
        خبر عاجل
      </label>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
        className="text-white"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded text-white"
      >
        {loading ? "جارٍ الحفظ..." : "حفظ"}
      </button>
    </form>
  );
}
