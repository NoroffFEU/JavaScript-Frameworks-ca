export function getErrorMessage(
  err: unknown,
  fallback = "Something went wrong"
) {
  if (err instanceof Error && err.message) return err.message;
  if (typeof err === "string" && err.trim()) return err;
  try {
    // handle common API error shapes
    const parsed =
      typeof err === "object" && err ? JSON.parse(String(err)) : null;
    if (parsed?.message) return parsed.message;
  } catch {}
  return fallback;
}
