'use client';

import { createEpisode, deleteEpisode } from "@/services/episode.service";
import { useState } from "react";

export default function EpisodesManager({ content }: { content: any }) {
  const [seasonId, setSeasonId] = useState("");
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [duration, setDuration] = useState("");

  // state للرسالة
  const [successMessage, setSuccessMessage] = useState("");

  const handleCreate = async () => {
    if (!content?.uuid) {
      setSuccessMessage("يرجى اختيار المحتوى أولاً");
      return;
    }

    try {
      await createEpisode({
        content_id: content.uuid, // ✅ UUID
        season_id: seasonId ? Number(seasonId) : null,
        title,
        video_url: videoUrl,
        thumbnail: thumbnail || null,
        duration: duration || null,
      });

      // عرض رسالة النجاح
      setSuccessMessage("تم إضافة الحلقة بنجاح");

      // مسح الرسالة بعد ثانيتين
      setTimeout(() => setSuccessMessage(""), 2000);

      // إعادة ضبط الحقول
      setTitle("");
      setVideoUrl("");
      setThumbnail("");
      setDuration("");
      setSeasonId("");
    } catch (error: any) {
      console.error("ERROR:", error.response?.data || error.message);
      setSuccessMessage("حدث خطأ أثناء إضافة الحلقة");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">
        الحلقات (
        {content.seasons?.reduce(
          (total: number, season: any) =>
            total + (season.episodes?.length || 0),
          0
        )}
        )
      </h3>

      {/* رسالة النجاح */}
      {successMessage && (
        <p className="bg-green-600 text-white p-2 rounded text-center">
          {successMessage}
        </p>
      )}

      {/* إضافة حلقة */}
      <div className="grid md:grid-cols-3 gap-3 bg-gray-800 p-4 rounded-xl">
        <select
          value={seasonId}
          onChange={(e) => setSeasonId(e.target.value)}
          className="p-2 bg-gray-700 rounded"
        >
          <option value="">بدون موسم (فيلم)</option>
          {content.seasons?.map((s: any) => (
            <option key={s.id} value={s.id}>
              الموسم {s.season_number}
            </option>
          ))}
        </select>

        <input
          placeholder="عنوان الحلقة"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 bg-gray-700 rounded"
        />

        <input
          placeholder="رابط الفيديو"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="p-2 bg-gray-700 rounded"
        />

        <input
          placeholder="رابط الصورة المصغرة (اختياري)"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
          className="p-2 bg-gray-700 rounded"
        />

        <input
          placeholder="المدة (مثال: 45:00)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="p-2 bg-gray-700 rounded"
        />

        <button
          onClick={handleCreate}
          className="bg-green-600 hover:bg-green-700 transition rounded p-2"
        >
          إضافة الحلقة
        </button>
      </div>

      {/* عرض الحلقات */}
      <div className="space-y-3">
        {content.seasons?.map((season: any) =>
          season.episodes?.map((ep: any) => (
            <div
              key={ep.id}
              className="bg-gray-800 p-3 rounded-xl flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">
                  الموسم {season.season_number} - {ep.title}
                </p>
                <p className="text-sm text-gray-400">
                  {ep.duration} | {ep.video_url}
                </p>
              </div>

              <button
                onClick={() => deleteEpisode(ep.id)}
                className="bg-red-600 px-3 py-1 rounded"
              >
                حذف
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
