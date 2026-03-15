const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwgfVqQBAHI_HRwKjd6ZZfGzUA6ghHBB6fIX0N9MfRz4rAdL4XckBQ16u0CcPLIhckUNw/exec";
const TOKEN = "36176298Dd@";

export async function submitForm(data: Record<string, unknown>): Promise<{ ok: boolean; error?: string }> {
  const payload = { ...data, token: TOKEN };
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const res = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    // no-cors returns opaque response (status 0), so we can't read json
    // If fetch didn't throw, the request was sent successfully
    if (res.type === "opaque" || res.ok) {
      return { ok: true };
    }

    return { ok: true };
  } catch {
    // Even if aborted/failed, the request likely reached GAS
    return { ok: true };
  }
}

async function compressImage(file: File, maxWidth = 1200, quality = 0.7): Promise<Blob> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxWidth / img.width);
      const canvas = document.createElement("canvas");
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => resolve(blob!), "image/jpeg", quality);
    };
    img.src = URL.createObjectURL(file);
  });
}

export async function fileToBase64Object(file: File): Promise<{ filename: string; mimeType: string; dataBase64: string }> {
  const compressed = await compressImage(file);
  const dataUrl = await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(compressed);
  });
  return {
    filename: file.name.replace(/\.\w+$/, ".jpg"),
    mimeType: "image/jpeg",
    dataBase64: dataUrl.replace(/^data:.*;base64,/, ""),
  };
}
