"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getNews } from "@/services/news.service";

export default function CategoryPage() {
  const { slug } = useParams();
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const res = await getNews();
        const newsArray = res.data?.data || res.data;

        const filtered = newsArray
          .filter((n: any) => n.category?.slug === slug)
          .sort(
            (a: any, b: any) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          );

        setNews(filtered);
      } catch (err) {
        console.error("Category fetch error", err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchNews();
  }, [slug]);

  return (
    <div className="bg-white  min-h-screen">
      <Header />

      <section className="py-12 pt-20 px-6 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-simibold mb-10">
         كل الاخبار
          </h2>

          {loading ? (
            <p className="text-gray-400 animate-pulse">
              جارٍ تحميل الأخبار...
            </p>
          ) : news.length === 0 ? (
            <p className="text-gray-400">
              لا توجد أخبار في هذا التصنيف
            </p>
          ) : (
            <div className="grid md:grid-cols-4 gap-6">
              {news.map((item) => (
                <div
                  key={item.uuid}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <img
                    src={
                      item.image_url ||
                      `https://picsum.photos/600/400?random=${item.id}`
                    }
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />

                  <div className="p-4">
                    <h5 className="font-bold text-lg mb-2">
                      {item.title}
                    </h5>

                    <p className="text-gray-600 text-sm mb-3">
                      {item.summary || "ملخص الخبر..."}
                    </p>

                    <Link
                      href={`/news/${item.uuid}`}
                      className="text-red-600 hover:underline text-sm font-semibold"
                    >
                      اقرأ المزيد ←
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
