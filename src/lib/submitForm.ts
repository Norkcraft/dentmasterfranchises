const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwgfVqQBAHI_HRwKjd6ZZfGzUA6ghHBB6fIX0N9MfRz4rAdL4XckBQ16u0CcPLIhckUNw/exec";
const TOKEN = "36176298Dd@";

export async function submitForm(data: Record<string, unknown>): Promise<{ ok: boolean; error?: string }> {
  const payload = { ...data, token: TOKEN };

  try {
    await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
      keepalive: true,
    });

    // no-cors returns opaque response (status 0), but request was sent.
    return { ok: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Network error";
    return { ok: false, error: message };
  }
}

type Base64File = {
  filename: string;
  mimeType: string;
  dataBase64: string;
};

async function compressImage(
  file: File,
  maxWidth = 1200,
  quality = 0.7,
): Promise<{ blob: Blob; converted: boolean }> {
  return new Promise((resolve) => {
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();

    const cleanup = () => URL.revokeObjectURL(objectUrl);

    img.onload = () => {
      const scale = Math.min(1, maxWidth / img.width);
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(img.width * scale));
      canvas.height = Math.max(1, Math.round(img.height * scale));
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        cleanup();
        resolve({ blob: file, converted: false });
        return;
      }

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(
        (blob) => {
          cleanup();
          if (blob) {
            resolve({ blob, converted: true });
            return;
          }
          resolve({ blob: file, converted: false });
        },
        "image/jpeg",
        quality,
      );
    };

    img.onerror = () => {
      cleanup();
      resolve({ blob: file, converted: false });
    };

    img.src = objectUrl;
  });
}

async function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(blob);
  });
}

export async function fileToBase64Object(file: File): Promise<Base64File> {
  const isCompressibleImage = file.type.startsWith("image/") && file.size > 200 * 1024;
  const { blob, converted } = isCompressibleImage
    ? await compressImage(file)
    : { blob: file as Blob, converted: false };

  const dataUrl = await blobToDataUrl(blob);

  return {
    filename: converted ? file.name.replace(/\.\w+$/, ".jpg") : file.name,
    mimeType: converted ? "image/jpeg" : file.type || "application/octet-stream",
    dataBase64: dataUrl.replace(/^data:.*;base64,/, ""),
  };
}
