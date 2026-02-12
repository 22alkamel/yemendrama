import DetailsClient from "./DetailsClient";
import { Content } from "../../../../types/content";
import { Actor } from "../../../../models/actortype";

interface DetailsPageProps {
  params: { type: string; id: string } | Promise<{ type: string; id: string }>;
}

export default async function DetailsPage(props: DetailsPageProps) {
  const { params } = props;
  const { type, id } = "then" in params ? await params : params; // يدعم Promise أو كائن عادي

  try {
    const res = await fetch(`http://localhost:8000/api/v1/contents`, {
      cache: "no-store",
      // إذا احتجت توكن:
      // headers: {
      //   Authorization: `Bearer ${process.env.API_TOKEN}`,
      // },
    });

    console.log("Response status:", res.status);

    if (!res.ok) {
      console.error("API returned error:", res.statusText);
      return (
        <p className="text-white text-center mt-20">المحتوى غير موجود</p>
      );
    }

    const data: { data: Content[] } = await res.json();
    console.log("API response:", data);

    // البحث عن العنصر المناسب حسب UUID
    const show = data.data.find((item) => item.uuid === id);

    if (!show) {
      console.error("Content not found");
      return (
        <p className="text-white text-center mt-20">المحتوى غير موجود</p>
      );
    }

    // الأعمال المشابهة (مؤقت، لو تريد جلبها من API حسب النوع أو التصنيف)
    const similarWorks: Content[] = data.data.filter(
      (item) => item.uuid !== show.uuid && item.type === show.type
    );

    const cast: Actor[] = []; // فارغ حاليا

    return (
      <DetailsClient
        show={show}
        type={type}
        similarWorks={similarWorks}
        cast={cast}
        // producer={show.producer}
      />
    );
  } catch (err) {
    console.error("Fetch error:", err);
    return (
      <p className="text-white text-center mt-20">
        حدث خطأ أثناء جلب المحتوى
      </p>
    );
  }
}
