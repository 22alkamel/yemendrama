"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { getNews } from "@/services/news.service";

export default function BreakingNews() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const res = await getNews();
        const newsArray = res.data?.data || res.data;

        // ترتيب الأخبار حسب الأحدث أولاً
        const sortedNews = [...newsArray].sort(
          (a: any, b: any) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );

        setNews(sortedNews);
      } catch (err) {
        console.error("Fetch news error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // اختيار الخبر العاجل + آخر 4 أخبار أخرى
  const breakingNews = useMemo(() => {
    if (!news || news.length === 0) return [];

    const urgent = news.find((n) => n.is_breaking);
    const rest = news.filter((n) => n !== urgent).slice(0, 4);

    return urgent ? [urgent, ...rest] : news.slice(0, 5);
  }, [news]);

  if (loading) return null; // أو Skeleton Loading

  if (breakingNews.length === 0) return null;

  const mainNews = breakingNews[0];
  const secondaryNews = breakingNews.slice(1);

  return (
    <section className="bg-black py-10 px-4 md:px-16">
      <h3 className="text-2xl font-bold mb-6 text-white">آخـر الأخبـــار</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* بطاقة الخبر الرئيسي */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg group">
          <Image
            src={mainNews.image_url || `/images/main-news.jpg`}
            alt={mainNews.title}
            width={800}
            height={500}
            className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          <div className="absolute bottom-4 right-4 text-white">
            {mainNews.is_breaking && (
              <span className="bg-red-600 text-sm px-3 py-1 rounded-full">
                عاجل
              </span>
            )}
            <h2 className="text-2xl md:text-3xl font-bold mt-2">
              <Link
                href={`/news/${mainNews.uuid}`}
                className="hover:text-red-400"
              >
                {mainNews.title}
              </Link>
            </h2>
            <p className="text-gray-300 text-sm mt-2 line-clamp-3">
              {mainNews.summary || "ملخص الخبر..."}
            </p>
          </div>
        </div>

        {/* الأخبار المميزة */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {secondaryNews.map((newsItem) => (
            <div
              key={newsItem.uuid}
              className="relative rounded-xl overflow-hidden shadow group"
            >
              <Image
                src={newsItem.image_url || `/images/news${newsItem.id}.jpg`}
                alt={newsItem.title}
                width={400}
                height={250}
                className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              <div className="absolute bottom-2 right-2 text-white">
                <h3 className="text-base font-semibold leading-snug line-clamp-2">
                  <Link
                    href={`/news/${newsItem.uuid}`}
                    className="hover:text-red-400"
                  >
                    {newsItem.title}
                  </Link>
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
