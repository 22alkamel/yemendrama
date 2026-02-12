'use client';

import { useAuth } from '@/context/AuthContext';

export default function ProfilePage() {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-gray-400">
        جاري التحميل...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-gray-400">
        يرجى تسجيل الدخول
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0f0f0f] to-black text-white px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* عنوان */}
        <h1 className="text-3xl md:text-4xl font-bold mb-10">
          الملف الشخصي
        </h1>

        {/* بطاقة البروفايل */}
        <div className="bg-[#141414] rounded-xl shadow-lg p-6 md:p-10 flex flex-col md:flex-row gap-8 items-center">
          
          {/* الصورة */}
          <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-red-600 to-red-900 flex items-center justify-center text-4xl font-bold">
            {user.name.charAt(0)}
          </div>

          {/* البيانات */}
          <div className="flex-1 w-full">
            <p className="text-gray-400 text-sm mb-1">الاسم</p>
            <p className="text-xl font-semibold mb-4">{user.name}</p>

            <p className="text-gray-400 text-sm mb-1">البريد الإلكتروني</p>
            <p className="text-lg mb-4">{user.email}</p>

           
          </div>
        </div>

        {/* أزرار */}
        <div className="mt-10 flex flex-wrap gap-4">
          <button
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition"
          >
            تعديل الملف
          </button>

          <button
            onClick={logout}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition"
          >
            تسجيل الخروج
          </button>
        </div>
      </div>
    </div>
  );
}
