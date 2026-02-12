'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, password);
    } catch (err: any) {
      console.log('LOGIN ERROR:', err);
      setError(err?.response?.data?.message || 'خطأ غير معروف');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 md:px-0">
      {/* الخلفية */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=1470&q=80')",
        }}
      ></div>
      <div className="absolute inset-0 bg-black/60"></div>

      {/* النموذج */}
      <div className="relative max-w-md w-full bg-black/90 p-8 rounded-lg shadow-lg flex flex-col gap-6">
        <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
          تسجيل الدخول
        </h1>

        {error && (
          <p className="text-red-500 text-center font-medium">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
            required
          />

          <input
            type="password"
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded transition flex justify-center items-center gap-2 disabled:opacity-50"
          >
            {loading ? 'جاري الدخول...' : 'دخول'}
            {loading && (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            )}
          </button>
        </form>

        <p className="text-gray-400 text-center text-sm">
          ليس لديك حساب؟{' '}
          <a href="/register" className="text-red-600 hover:underline">
            إنشاء حساب
          </a>
        </p>
      </div>
    </div>
  );
}
