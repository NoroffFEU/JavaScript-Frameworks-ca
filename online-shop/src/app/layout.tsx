import "./globals.css";
import type { ReactNode } from "react";
import ClientHeader from "@/components/layout/ClientHeader";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Online Shop",
  description: "A simple Next.js shop",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:rounded focus:bg-black focus:px-3 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>

        <ClientHeader />

        <main id="main" className="mx-auto max-w-6xl px-4 py-8">
          {children}
        </main>

        <footer className="mt-16 border-t border-gray-400">
          <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-amber-900 text-center">
            <p>
              © {new Date().getFullYear()} Online Shop. All rights reserved.
            </p>
          </div>
        </footer>

        <Toaster position="top-right" />
      </body>
    </html>
  );
}
