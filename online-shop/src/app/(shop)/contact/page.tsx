"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const router = useRouter();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    toast.success("We have received your message and will reply shortly.");
  }

  return (
    <main className="mx-auto max-w-lg px-4 py-8">
      <button
        onClick={() => router.back()}
        className="mb-4 text-sm text-amber-900 hover:underline"
        aria-label="Go back"
      >
        ← Back
      </button>

      <h1 className="mb-4 text-2xl font-semibold">Contact</h1>

      {sent ? (
        <div className="rounded-lg border bg-gray-700 p-4 text-sm">
          We’ve received your text and will get back to you shortly.
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-3">
          <input
            className="w-full rounded border px-3 py-2"
            placeholder="Full name"
          />
          <input
            className="w-full rounded border px-3 py-2"
            placeholder="Email"
            type="email"
          />
          <input
            className="w-full rounded border px-3 py-2"
            placeholder="Subject"
          />
          <textarea
            className="w-full rounded border px-3 py-2"
            placeholder="Message"
            rows={5}
          />
          <button className="rounded bg-amber-600 px-4 py-2 text-white">
            Send
          </button>
        </form>
      )}
    </main>
  );
}
