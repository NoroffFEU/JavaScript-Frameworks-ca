"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type User = { email: string };

type AuthState = {
  user: User | null;
  register: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

// Demo-only local “db”  Not secure
function saveUser(email: string, password: string) {
  localStorage.setItem(`user:${email}`, JSON.stringify({ email, password }));
}

function getUser(email: string) {
  const raw = localStorage.getItem(`user:${email}`);
  return raw ? (JSON.parse(raw) as { email: string; password: string }) : null;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,

      async register(email, password) {
        if (!email || password.length < 6) {
          throw new Error("Password must be at least 6 characters.");
        }
        if (getUser(email)) {
          throw new Error("User already exists.");
        }
        saveUser(email, password);
        set({ user: { email } });
      },

      async login(email, password) {
        const existing = getUser(email);
        if (!existing || existing.password !== password) {
          throw new Error("Incorrect email or password.");
        }
        set({ user: { email } });
      },

      logout() {
        set({ user: null });
      },
    }),
    { name: "auth" } // persists current user in localStorage
  )
);
