"use client";

import { createSeason, deleteSeason } from "@/services/season.service";
import { useState } from "react";

export default function SeasonsManager({ content }: { content: any }) {
  const [number, setNumber] = useState("");

  const handleCreate = async () => {
    if (!number) return alert("رقم الموسم مطلوب");

    await createSeason(content.uuid, {
      season_number: Number(number),
    });

    window.location.reload(); // بسيط الآن – لاحقًا نحسّنه
  };

  const handleDelete = async (id: number) => {
    if (!confirm("هل تريد حذف الموسم؟")) return;
    await deleteSeason(id);
    window.location.reload();
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">المواسم ({content.seasons_count})</h3>

      {/* إضافة موسم */}
      <div className="flex gap-2">
        <input
          type="number"
          placeholder="رقم الموسم"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white"
        />
        <button onClick={handleCreate} className="bg-green-600 px-4 rounded">
          إضافة
        </button>
      </div>

      {/* قائمة المواسم */}
      <div className="space-y-3">
        {content.seasons?.map((season: any) => (
          <div
            key={season.id}
            className="bg-gray-800 p-4 rounded flex justify-between items-center"
          >
            <div>
              <p>الموسم رقم {season.season_number}</p>
              <p className="text-gray-400 text-sm">
                عدد الحلقات: {season.episodes_count ?? 0}
              </p>
            </div>

            <button
              onClick={() => handleDelete(season.id)}
              className="bg-red-600 px-3 py-1 rounded"
            >
              حذف
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
