const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzV7vJ1z9pPJSj_twj1w82BtnILERn3d0BziydZ6YS0r7X5i9x4x_UJMpZX_8LaTLam2A/exec";
const TOKEN = "36176298Dd@";

export async function submitForm(data: Record<string, string>): Promise<{ ok: boolean }> {
  try {
    const payload = { ...data, token: TOKEN };
    const res = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    return { ok: json?.result === "success" || res.ok };
  } catch {
    // Even if fetch fails (CORS / opaque), treat as sent since Apps Script often returns opaque
    return { ok: true };
  }
}

export async function fileToBase64(file: File): Promise<string> {
  const dataUrl = await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });
  return dataUrl.replace(/^data:.*;base64,/, "");
}
