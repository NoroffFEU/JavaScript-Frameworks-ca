"use client";

import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

type FormValues = {
  fullName: string;
  email: string;
  subject: string;
  message: string;
};

type FormErrors = Partial<FormValues>;

const initialValues: FormValues = {
  fullName: "",
  email: "",
  subject: "",
  message: "",
};

export default function ContactPage() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [sent, setSent] = useState(false);
  const router = useRouter();

  function validate(values: FormValues): FormErrors {
    const newErrors: FormErrors = {};

    if (!values.fullName.trim() || values.fullName.trim().length < 3) {
      newErrors.fullName = "Full name must be at least 3 characters.";
    }

    if (!values.subject.trim() || values.subject.trim().length < 3) {
      newErrors.subject = "Subject must be at least 3 characters.";
    }

    if (!values.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!values.message.trim() || values.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }

    return newErrors;
  }

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear error as user types
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const validationErrors = validate(values);
    const hasErrors = Object.keys(validationErrors).length > 0;

    if (hasErrors) {
      setErrors(validationErrors);
      toast.error("Please fix the errors in the form.");
      return;
    }

    setSent(true);
    toast.success("We have received your message and will reply shortly.");
    setValues(initialValues);
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

      {sent && (
        <div className="mb-4 rounded-lg border border-amber-100 bg-amber-50 p-4 text-sm text-amber-900">
          We’ve received your message and will get back to you shortly.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Full Name */}
        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="fullName">
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            className="w-full rounded border px-3 py-2"
            placeholder="Your full name"
            value={values.fullName}
            onChange={handleChange}
            aria-invalid={Boolean(errors.fullName) || undefined}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
          />
          {errors.fullName && (
            <p id="fullName-error" className="mt-1 text-xs text-red-600">
              {errors.fullName}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="w-full rounded border px-3 py-2"
            placeholder="you@example.com"
            value={values.email}
            onChange={handleChange}
            aria-invalid={Boolean(errors.email) || undefined}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-xs text-red-600">
              {errors.email}
            </p>
          )}
        </div>

        {/* Subject */}
        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="subject">
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            className="w-full rounded border px-3 py-2"
            placeholder="What is this about?"
            value={values.subject}
            onChange={handleChange}
            aria-invalid={Boolean(errors.subject) || undefined}
            aria-describedby={errors.subject ? "subject-error" : undefined}
          />
          {errors.subject && (
            <p id="subject-error" className="mt-1 text-xs text-red-600">
              {errors.subject}
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            className="w-full rounded border px-3 py-2"
            placeholder="Write your message..."
            rows={5}
            value={values.message}
            onChange={handleChange}
            aria-invalid={Boolean(errors.message) || undefined}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          {errors.message && (
            <p id="message-error" className="mt-1 text-xs text-red-600">
              {errors.message}
            </p>
          )}
        </div>

        <button className="rounded bg-amber-600 px-4 py-2 text-white hover:bg-amber-700">
          Send
        </button>
      </form>
    </main>
  );
}
