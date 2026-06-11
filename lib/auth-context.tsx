"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Role, User } from "@/lib/types";
import { findUserByCredentials, users } from "@/lib/mock/users";

const STORAGE_KEY = "daneshyar:user";

interface AuthState {
  user: User | null;
  ready: boolean; // becomes true after we read localStorage on the client
  login: (email: string, password: string) => { ok: boolean; error?: string; user?: User };
  registerMock: (name: string, email: string, role: Role) => User;
  logout: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw) as User);
    } catch {
      /* ignore corrupt storage */
    }
    setReady(true);
  }, []);

  function persist(next: User | null) {
    setUser(next);
    try {
      if (next) localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* storage may be unavailable */
    }
  }

  function login(email: string, password: string) {
    const found = findUserByCredentials(email, password);
    if (!found) return { ok: false, error: "ایمیل یا رمز عبور نادرست است." };
    persist(found);
    return { ok: true, user: found };
  }

  // Mock registration: creates an in-memory user (not persisted to the mock DB array
  // beyond this session) and logs them in immediately.
  function registerMock(name: string, email: string, role: Role) {
    const newUser: User = {
      id: `new-${Date.now()}`,
      name,
      email,
      password: "",
      role,
      avatarColor: role === "instructor" ? "#4c37c7" : "#5a45e2",
      title: role === "instructor" ? "مدرس" : "دانشجو",
    };
    users.push(newUser);
    persist(newUser);
    return newUser;
  }

  function logout() {
    persist(null);
  }

  return (
    <AuthContext.Provider value={{ user, ready, login, registerMock, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
