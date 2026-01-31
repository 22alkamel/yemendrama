"use client";

import Link from "next/link";
import Marquee from "react-fast-marquee";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import BreakingNews from "../../components/newssection/BreakingNews";

export default function NewsHome() {
  return (
    <div className="bg-white">
      <Header />

     

      {/* قسم الهيرو */}
      <section
        className="relative bg-cover bg-center text-white"
        style={{
          backgroundImage: "/كرتاخضر.jpg",
        }}
      >
        <div className="bg-black/70 px-8 py-24 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            كـل اخبــار <span className="text-red-500">الدرامـــا</span>
          </h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto">
            موقع يمن ميديا - مصدركم الموثوق لآخر الأخبار والتقارير الحصرية عن
            الدراما اليمنية و الممثلين
          </p>
          <div className="mt-6 flex justify-center space-x-4 space-x-reverse">
            <button className="bg-red-600 px-6 py-2 rounded-md font-semibold hover:bg-red-700 transition">
              تابع أخبار الدراما و نجوم الشاشة اليمنيه
            </button>
            {/* <button className="border border-white px-6 py-2 rounded-md font-semibold hover:bg-white hover:text-black transition">
              اشترك في النشرة
            </button> */}
          </div>
        </div>
      </section>

      {/* شريط الأخبار العاجلة */}
      <div className="bg-red-600 text-white py-2 text-sm">
        <div className="container mx-auto flex items-center gap-2">
          <Marquee pauseOnHover gradient={false} speed={50}>
            <span className="mx-4">
              الحكومة اليمنية تدعو إلى مبادرة جديدة للسلام
            </span>
            <span className="mx-4">مجلس الأمن يناقش الوضع في اليمن</span>
            <span className="mx-4">
              وصول مساعدات إنسانية إلى المحافظات المتضررة
            </span>
          </Marquee>
        </div>
      </div>

      <BreakingNews />
      {/* قسم آخر الأخبار */}
      <section className="py-10 px-6 bg-black  ">
        <h3 className="text-2xl font-bold mb-6 text-white"> الأخبار</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white rounded-lg shadow-md overflow-hidden border"
            >
              <img
                src={`https://picsum.photos/600/400?random=${item}`}
                alt="خبر"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="font-bold text-lg mb-2">عنوان الخبر {item}</h4>
                <p className="text-gray-600 text-sm mb-3">
                  هذا النص هو مثال على ملخص قصير للخبر المعروض في هذه البطاقة.
                </p>
                <Link
                  href="/news/1"
                  className="text-red-600 hover:underline text-sm font-semibold"
                >
                  اقرأ المزيد ←
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-right">
          <Link href="/news" className="text-red-600 font-semibold">
            ← جميع الأخبار
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
