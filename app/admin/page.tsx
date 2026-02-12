'use client';

import AdminLayout from '@/components/admin/AdminLayout';

export default function AdminPage() {
  return (
    <AdminLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition text-right">
          <h3 className="text-xl font-bold mb-2">المستخدمين الجدد</h3>
          <p className="text-gray-300 text-sm">عدد المستخدمين اليوم: 12</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition text-right">
          <h3 className="text-xl font-bold mb-2">المحتوى الجديد</h3>
          <p className="text-gray-300 text-sm">عدد الأفلام الجديدة: 8</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition text-right">
          <h3 className="text-xl font-bold mb-2">الإيرادات</h3>
          <p className="text-gray-300 text-sm">إجمالي الإيرادات: $1,250</p>
        </div>
      </div>
    </AdminLayout>
  );
}
