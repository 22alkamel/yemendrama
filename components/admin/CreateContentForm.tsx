"use client";

import { useState, useEffect } from "react";
import { createContent } from "@/services/content.service";
import { getCategories } from "@/services/category.service";

interface FormData {
  type:
    | "movie"
    | "series"
    | "program"
    | "play"
    | "kids"
    | "podcast"
    | "competition";
  title: string;
  description: string;
  year?: number;
  rating?: number;
  is_premium: boolean;
  category_ids: number[];
  poster_image?: File | null;
  card_image?: File | null;
}

interface Category {
  id: number;
  name: string;
  type: string;
}

export default function CreateContentForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const [form, setForm] = useState<FormData>({
    type: "movie",
    title: "",
    description: "",
    year: undefined,
    rating: undefined,
    is_premium: false,
    category_ids: [],
    poster_image: null,
    card_image: null,
  });

  const [posterPreview, setPosterPreview] = useState<string | null>(null);
  const [cardPreview, setCardPreview] = useState<string | null>(null);
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);

  // جلب التصنيفات
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        console.log("categories API response:", res.data);

        // إذا كان res.data.data موجود فهو المصفوفة
        const categories = Array.isArray(res.data.data) ? res.data.data : [];
        setCategoriesList(categories);
      } catch (err) {
        console.error("Fetch categories error:", err);
        setCategoriesList([]);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e: any) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file" && files) {
      const file = files[0];
      setForm({ ...form, [name]: file });

      const reader = new FileReader();
      reader.onload = () => {
        if (name === "poster_image") setPosterPreview(reader.result as string);
        if (name === "card_image") setCardPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      return;
    }

    let val: any = value;
    if (name === "year" || name === "rating")
      val = value ? Number(value) : undefined;
    if (type === "checkbox") val = checked;

    setForm({ ...form, [name]: val });
  };

  const handleCategoryChange = (id: number, checked: boolean) => {
    if (checked) setForm({ ...form, category_ids: [...form.category_ids, id] });
    else
      setForm({
        ...form,
        category_ids: form.category_ids.filter((c) => c !== id),
      });
  };

  const submit = async (e: any) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("type", form.type);
      formData.append("title", form.title);
      formData.append("description", form.description);
      if (form.year !== undefined) formData.append("year", String(form.year));
      if (form.rating !== undefined)
        formData.append("rating", String(form.rating));
      formData.append("is_premium", form.is_premium ? "1" : "0");
      form.category_ids.forEach((id) =>
        formData.append("category_ids[]", String(id))
      );
      if (form.poster_image) formData.append("poster_image", form.poster_image);
      if (form.card_image) formData.append("card_image", form.card_image);

      await createContent(formData);
      onSuccess();

      // إعادة تعيين النموذج
      setForm({
        type: "movie",
        title: "",
        description: "",
        year: undefined,
        rating: undefined,
        is_premium: false,
        category_ids: [],
        poster_image: null,
        card_image: null,
      });
      setPosterPreview(null);
      setCardPreview(null);
    } catch (err: any) {
      console.error("Error adding content:", err);
      alert(err.response?.data?.message || "حدث خطأ أثناء حفظ المحتوى.");
    }
  };

  return (
    <form
      onSubmit={submit}
      className="bg-gray-900 p-6 rounded-lg mb-6 shadow-lg text-right"
    >
      <h3 className="text-xl font-bold mb-4 text-red-600">
        ➕ إضافة محتوى جديد
      </h3>

      {/* النوع */}
      <select
        name="type"
        value={form.type}
        onChange={handleChange}
        className="w-full mb-3 p-2 bg-gray-800 rounded text-white"
      >
        <option value="movie">فيلم</option>
        <option value="series">مسلسل</option>
        <option value="program">برنامج</option>
        <option value="play">مسرحية</option>
        <option value="kids">أطفال</option>
        <option value="podcast">بودكاست</option>
        <option value="competition">مسابقة</option>
      </select>

      {/* العنوان */}
      <input
        name="title"
        placeholder="العنوان"
        value={form.title}
        onChange={handleChange}
        className="w-full mb-3 p-2 bg-gray-800 rounded text-white"
        required
      />

      {/* الوصف */}
      <textarea
        name="description"
        placeholder="الوصف"
        value={form.description}
        onChange={handleChange}
        className="w-full mb-3 p-2 bg-gray-800 rounded text-white"
      />

      {/* السنة والتقييم */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <input
          type="number"
          name="year"
          placeholder="السنة"
          value={form.year ?? ""}
          onChange={handleChange}
          className="p-2 bg-gray-800 rounded text-white"
        />
        <input
          type="number"
          step="0.1"
          name="rating"
          placeholder="التقييم"
          value={form.rating ?? ""}
          onChange={handleChange}
          className="p-2 bg-gray-800 rounded text-white"
        />
      </div>

      {/* محتوى مدفوع */}
      <label className="flex items-center gap-2 mb-3">
        <input
          type="checkbox"
          name="is_premium"
          checked={form.is_premium}
          onChange={handleChange}
        />
        محتوى مدفوع
      </label>

      {/* اختيار التصنيفات */}
      <div className="mb-3">
        <label className="block mb-1 font-medium text-gray-200">
          اختر التصنيفات:
        </label>
        <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
          {categoriesList.map((cat) => (
            <label
              key={cat.id}
              className="flex items-center gap-2 bg-gray-700 px-3 py-1 rounded text-white cursor-pointer"
            >
              <input
                type="checkbox"
                value={cat.id}
                checked={form.category_ids.includes(cat.id)}
                onChange={(e) => handleCategoryChange(cat.id, e.target.checked)}
              />
              {cat.name} ({cat.type})
            </label>
          ))}
        </div>
      </div>

      {/* صور البوستر والكارد */}
      <div className="grid grid-cols-2 gap-4 mb-3">
        <div>
          <label className="block mb-1">صورة البوستر</label>
          <input
            type="file"
            name="poster_image"
            accept="image/*"
            onChange={handleChange}
          />
          {posterPreview && (
            <img
              src={posterPreview}
              alt="Poster Preview"
              className="mt-2 w-32 h-20 object-cover rounded"
            />
          )}
        </div>

        <div>
          <label className="block mb-1">صورة الكارد</label>
          <input
            type="file"
            name="card_image"
            accept="image/*"
            onChange={handleChange}
          />
          {cardPreview && (
            <img
              src={cardPreview}
              alt="Card Preview"
              className="mt-2 w-32 h-20 object-cover rounded"
            />
          )}
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 w-full bg-red-600 py-2 rounded hover:bg-red-700 transition"
      >
        حفظ المحتوى
      </button>
    </form>
  );
}
