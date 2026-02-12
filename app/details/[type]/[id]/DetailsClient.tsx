"use client";

import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import Link from "next/link";
import { useState } from "react";
import { Content } from "../../../../types/content";

interface DetailsClientProps {
  show: Content;
  type: string;
  similarWorks?: Content[];
  cast?: any[]; // حالياً فارغ
  producer?: {
    name: string;
    logo: string;
    website?: string;
  };
}

export default function DetailsClient({
  show,
  type,
  similarWorks = [],
  cast = [],
  producer,
}: DetailsClientProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState<"details" | "crew" | "similar">(
    "details"
  );

  const genre =
    show.categories?.map((cat) => cat.name).join(", ") ?? show.type ?? "";

  // دالة لإرجاع رابط الصورة مع المسار الثابت
  const backendUrl = "http://localhost:8000";
  // حساب عدد الحلقات لجميع المواسم
  const totalEpisodes =
    show.seasons?.reduce(
      (total: number, season: any) => total + (season.episodes?.length || 0),
      0
    ) ||
    show.episodes?.length ||
    0;

  return (
    <div className="bg-[#0b0b0b] text-white">
      <Header />

      {/* القسم العلوي */}
      <div
        className="flex flex-col md:flex-row p-4 md:p-8 gap-6 w-full h-auto md:h-screen bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: `url(${backendUrl}${show.poster_image})` }}
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/40 to-transparent"></div>

        <div className="relative h-full flex flex-col md:flex-row items-start md:items-center px-4 md:px-8 lg:px-16 gap-6 md:gap-12">
          <div className="w-full md:w-1/4">
            <img
              src={`${backendUrl}${show.card_image}`}
              alt={show.title}
              className="rounded-lg w-full"
            />
          </div>

          <div className="flex-1 flex flex-col justify-between w-full md:w-auto">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl font-bold">{show.title}</h1>
              <div className="flex gap-2 mt-2 text-sm text-gray-400">
                <span>{show.year}</span>
                <span>|</span>
                <span>{genre}</span>
              </div>
              <p className="mt-4 text-gray-300">{show.description}</p>
            </div>

            <div className="flex gap-3 mt-4 md:mt-6">
              <Link
                href={`/watch/${type}/${show.uuid}`}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded flex items-center gap-2"
              >
                <i className="ri-play-fill text-xl"></i> مشاهدة الآن
              </Link>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded flex items-center gap-2"
              >
                <i
                  className={
                    isFavorite ? "ri-heart-fill text-red-500" : "ri-heart-line"
                  }
                ></i>
                {isFavorite ? "إزالة من المفضلة" : "إضافة للمفضلة"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* التبويبات */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 md:p-8">
        <div className="bg-gray-900 p-4 rounded-lg">
          <div className="flex gap-8 mb-4 border-b border-gray-700">
            <button
              className={`pb-2 ${
                activeTab === "details"
                  ? "border-b-2 border-red-500 text-red-500"
                  : "text-gray-400"
              }`}
              onClick={() => setActiveTab("details")}
            >
              تفاصيل
            </button>
            <button
              className={`pb-2 ${
                activeTab === "crew"
                  ? "border-b-2 border-red-500 text-red-500"
                  : "text-gray-400"
              }`}
              onClick={() => setActiveTab("crew")}
            >
              طاقم العمل
            </button>
            <button
              className={`pb-2 ${
                activeTab === "similar"
                  ? "border-b-2 border-red-500 text-red-500"
                  : "text-gray-400"
              }`}
              onClick={() => setActiveTab("similar")}
            >
              أعمال مشابهة
            </button>
          </div>

          {activeTab === "details" && (
            <div>
              <p className="mb-2">
                <strong>نبذة :</strong> {show.description}
              </p>
              <p className="mb-2">
                <strong>النوع :</strong> {genre}
              </p>
              <p className="mb-2">
                <strong>السنة :</strong> {show.year}
              </p>
              <p className="mb-2">
                <strong>التقييم :</strong> {show.rating ?? "-"} /10
              </p>
              <p className="mb-2">
                <strong>عدد الحلقات :</strong> {totalEpisodes}
              </p>
            </div>
          )}

          {activeTab === "crew" && (
            <div className="space-y-4">
              {producer && (
                <div className="flex items-center gap-4 mt-6">
                  <img
                    src={`${backendUrl}${producer.logo}`}
                    alt={producer.name}
                    className="w-16 h-16 object-contain rounded"
                  />
                  <div>
                    <h3 className="text-lg font-bold">
                      {producer.name} (المنتج)
                    </h3>
                    {producer.website && (
                      <a
                        href={producer.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-500 hover:underline"
                      >
                        زيارة الموقع
                      </a>
                    )}
                  </div>
                </div>
              )}

              {cast.length === 0 && <p>لا يوجد ممثلين لعرضهم حالياً.</p>}
            </div>
          )}

          {activeTab === "similar" && (
            <div>
              {similarWorks.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {similarWorks.map((item) => (
                    <Link
                      key={item.uuid}
                      href={`/details/${type}/${item.uuid}`}
                      className="bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transform transition"
                    >
                      <img
                        src={`${backendUrl}${item.card_image}`}
                        alt={item.title}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-2 text-center text-sm">
                        {item.title}
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p>لا توجد أعمال مشابهة.</p>
              )}
            </div>
          )}
        </div>

        {/* الإحصائيات */}
        <div className="bg-gray-900 p-4 rounded-lg h-32">
          <h2 className="text-lg font-bold mb-2">إحصائيات</h2>
          <p className="text-yellow-400 text-xl">{show.rating ?? "-"} /10</p>
          <div className="bg-gray-700 h-2 rounded mt-2">
            <div
              className="bg-yellow-400 h-2 rounded"
              style={{ width: `${((show.rating ?? 0) / 10) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
