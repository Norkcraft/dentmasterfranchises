const base = process.env.BASE_URL ?? "https://www.dentmasterfranchise.com";

async function head(path) {
  const res = await fetch(`${base}${path}`, { redirect: "follow" });
  return {
    status: res.status,
    contentType: res.headers.get("content-type") ?? "",
  };
}

async function getText(path) {
  const res = await fetch(`${base}${path}`, { redirect: "follow" });
  return {
    status: res.status,
    contentType: res.headers.get("content-type") ?? "",
    text: await res.text(),
  };
}

function firstMatch(re, text) {
  const m = text.match(re);
  return m?.[1] ?? null;
}

async function main() {
  const checks = ["/logo.png", "/favicon.png", "/site.webmanifest", "/og/default.jpg"];
  for (const p of checks) {
    const r = await head(p);
    console.log(`${p} -> ${r.status} ${r.contentType}`);
  }

  const home = await getText("/");
  console.log(`/ -> ${home.status} ${home.contentType}`);
  if (home.status !== 200) process.exit(1);

  const logoImgTag = firstMatch(/(<img[^>]*alt=["']Dent Master Franchise logo["'][^>]*>)/i, home.text);
  console.log(`logo <img> present: ${Boolean(logoImgTag)}`);
  if (logoImgTag) {
    const src = firstMatch(/src=["']([^"']+)["']/, logoImgTag);
    console.log(`logo img src: ${src ?? "(none)"}`);
    if (src) {
      const resolved = src.startsWith("http") ? src : `${base}${src}`;
      const r = await fetch(resolved, { redirect: "follow" });
      console.log(`logo img request -> ${r.status} ${(r.headers.get("content-type") ?? "")}`);
    }
  }

  const iconHref = firstMatch(/<link[^>]*rel=["']icon["'][^>]*href=["']([^"']+)["']/i, home.text);
  console.log(`head icon href: ${iconHref ?? "(none)"}`);
  if (iconHref) {
    const resolved = iconHref.startsWith("http") ? iconHref : `${base}${iconHref}`;
    const r = await fetch(resolved, { redirect: "follow" });
    console.log(`icon request -> ${r.status} ${(r.headers.get("content-type") ?? "")}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

