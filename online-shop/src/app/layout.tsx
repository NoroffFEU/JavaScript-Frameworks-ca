import "./globals.css";
import type { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import Link from "next/link";
import CartIcon from "@/components/CartIcon";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <Link href="/" className="font-semibold">
              Online Shop
            </Link>
            <nav className="flex items-center gap-4">
              <Link href="/contact" className="text-sm hover:underline">
                Contact
              </Link>
              <CartIcon />
            </nav>
          </div>
        </header>

        <main>{children}</main>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
