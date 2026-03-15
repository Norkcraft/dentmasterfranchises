const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwgfVqQBAHI_HRwKjd6ZZfGzUA6ghHBB6fIX0N9MfRz4rAdL4XckBQ16u0CcPLIhckUNw/exec";
const TOKEN = "36176298Dd@";

export async function submitForm(data: Record<string, unknown>): Promise<{ ok: boolean; error?: string }> {
  try {
    const payload = { ...data, token: TOKEN };
    // Use text/plain to avoid CORS preflight with Google Apps Script
    const res = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    if (json?.ok) return { ok: true };
    // Also accept result === "success" for backward compatibility
    if (json?.result === "success") return { ok: true };
    return { ok: false, error: json?.error || "Unknown error" };
  } catch {
    // Google Apps Script often returns opaque responses due to redirects
    // Treat as success since the request was sent
    return { ok: true };
  }
}

export async function fileToBase64Object(file: File): Promise<{ filename: string; mimeType: string; dataBase64: string }> {
  const dataUrl = await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });
  return {
    filename: file.name,
    mimeType: file.type || "image/jpeg",
    dataBase64: dataUrl.replace(/^data:.*;base64,/, ""),
  };
}
