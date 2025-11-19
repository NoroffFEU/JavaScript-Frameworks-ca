"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/auth.store";
import CartIcon from "@/components/cart/CartIcon";

export default function ClientHeader() {
  const { user, logout } = useAuth();
  const router = useRouter();
  // little helper: show name if present, else email

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-gray-900 text-amber-50 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight hover:opacity-80"
        >
          Online Shop
        </Link>

        <nav className="flex items-center gap-4">
          <Link href="/contact" className="text-sm hover:underline">
            Contact
          </Link>

          <CartIcon />

          {user ? (
            <div className="flex items-center gap-3">
              <span className="hidden text-sm text-gray-400 sm:inline">
                {user.email}
              </span>
              <button
                onClick={() => {
                  logout();
                  router.push("/");
                }}
                className="text-sm text-white-100 hover:underline"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/auth/login" className="text-sm hover:underline">
                Login
              </Link>
              <Link href="/auth/register" className="text-sm hover:underline">
                Register
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
