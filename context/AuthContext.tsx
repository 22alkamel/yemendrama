"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  loginRequest,
  getMe,
  logoutRequest,
  registerRequest,
} from "@/services/auth.service";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: any;
  loading: boolean;

  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    password_confirmation: string
  ) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 🔹 تحميل المستخدم عند الريفرش
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    getMe()
      .then((res) => {
        setUser(res.user);
      })
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  // 🔹 تسجيل الدخول
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await loginRequest(email, password);

      localStorage.setItem("token", res.token);
      setUser(res.user);

      const roles = res.roles || [];
      if (roles.includes("admin")) router.push("/admin");
      else router.push("/profile");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 إنشاء حساب
  const register = async (
    name: string,
    email: string,
    password: string,
    password_confirmation: string
  ) => {
    setLoading(true);
    try {
      const res = await registerRequest(
        name,
        email,
        password,
        password_confirmation
      );

      localStorage.setItem("token", res.token);
      setUser(res.user);

      router.push("/profile");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 تسجيل الخروج
  const logout = async () => {
    try {
      await logoutRequest();
    } catch {}
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 🔹 Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
