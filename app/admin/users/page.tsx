'use client';

import AdminLayout from '@/components/admin/AdminLayout';

export default function AdminUsersPage() {
  return (
    <AdminLayout>
      <div>
        <h2 className="text-2xl font-bold mb-4 text-right">قائمة المستخدمين</h2>
        <table className="w-full text-right table-auto border-collapse">
          <thead>
            <tr className="bg-gray-800">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">الاسم</th>
              <th className="px-4 py-2">البريد</th>
              <th className="px-4 py-2">الدور</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-gray-700">
              <td className="px-4 py-2">1</td>
              <td className="px-4 py-2">Super Admin</td>
              <td className="px-4 py-2">admin@site.com</td>
              <td className="px-4 py-2">Admin</td>
            </tr>
            <tr className="bg-gray-700">
              <td className="px-4 py-2">2</td>
              <td className="px-4 py-2">John Doe</td>
              <td className="px-4 py-2">john@example.com</td>
              <td className="px-4 py-2">User</td>
            </tr>
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
