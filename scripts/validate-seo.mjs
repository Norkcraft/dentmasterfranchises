import http from "node:http";
import https from "node:https";

const baseUrl = process.env.BASE_URL ?? "http://localhost:3000";

const pages = [
  "/",
  "/services",
  "/services/paintless-dent-repair",
  "/service-areas/paintless-dent-repair-orlando-fl",
  "/about",
  "/learn-pdr",
  "/blog/paintless-dent-repair-cost-orlando-2025",
];

function fetchText(path) {
  const url = new URL(`${baseUrl}${path}`);
  const client = url.protocol === "https:" ? https : http;

  return new Promise((resolve, reject) => {
    const req = client.request(
      {
        method: "GET",
        hostname: url.hostname,
        port: url.port,
        path: `${url.pathname}${url.search}`,
        headers: { "User-Agent": "seo-validator" },
      },
      (res) => {
        let body = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => {
          body += chunk;
        });
        res.on("end", () => {
          resolve({ status: res.statusCode ?? 0, text: body });
        });
      }
    );

    req.on("error", reject);
    req.end();
  });
}

function extractJsonLd(html) {
  const re = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/g;
  return [...html.matchAll(re)].map((m) => m[1].trim()).filter(Boolean);
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function validateJsonLdObject(obj) {
  assert(obj && typeof obj === "object", "JSON-LD is not an object");
  assert(typeof obj["@context"] === "string", "Missing @context");

  if (Array.isArray(obj["@graph"])) {
    assert(obj["@graph"].length > 0, "@graph is empty");
    for (const node of obj["@graph"]) {
      assert(node && typeof node === "object", "@graph node is not an object");
      assert(typeof node["@type"] === "string" && node["@type"].trim().length > 0, "@graph node missing @type");
    }
    return;
  }

  assert(typeof obj["@type"] === "string", "Missing @type");

  if (obj["@type"] === "FAQPage") {
    assert(Array.isArray(obj.mainEntity), "FAQPage missing mainEntity[]");
    assert(obj.mainEntity.length > 0, "FAQPage mainEntity[] is empty");
    for (const q of obj.mainEntity) {
      assert(q?.["@type"] === "Question", "FAQPage mainEntity item is not Question");
      assert(typeof q.name === "string" && q.name.trim().length > 0, "Question missing name");
      assert(q.acceptedAnswer?.["@type"] === "Answer", "Question missing acceptedAnswer Answer");
      assert(typeof q.acceptedAnswer.text === "string" && q.acceptedAnswer.text.trim().length > 0, "Answer missing text");
    }
  }
}

function validateSitemapXml(xml) {
  assert(xml.includes("<urlset"), "Sitemap missing <urlset>");
  const urlBlocks = xml.split("<url>").slice(1).map((p) => p.split("</url>")[0]);
  assert(urlBlocks.length > 0, "Sitemap has no <url> entries");
  const bad = urlBlocks.filter((b) => !b.includes("<loc>"));
  assert(bad.length === 0, `Sitemap has ${bad.length} <url> entries missing <loc>`);
}

function validateRobotsTxt(txt) {
  assert(/User-Agent:\s*\*/i.test(txt), "robots.txt missing User-Agent: *");
  assert(/Sitemap:\s*https?:\/\//i.test(txt), "robots.txt missing Sitemap: URL");
}

async function main() {
  const robots = await fetchText("/robots.txt");
  assert(robots.status === 200, `robots.txt HTTP ${robots.status}`);
  validateRobotsTxt(robots.text);

  const sitemap = await fetchText("/sitemap.xml");
  assert(sitemap.status === 200, `sitemap.xml HTTP ${sitemap.status}`);
  validateSitemapXml(sitemap.text);

  let totalObjects = 0;
  for (const path of pages) {
    const { status, text } = await fetchText(path);
    assert(status === 200, `${path} HTTP ${status}`);
    const jsonScripts = extractJsonLd(text);
    assert(jsonScripts.length > 0, `${path} has no JSON-LD scripts`);
    for (let i = 0; i < jsonScripts.length; i++) {
      const script = jsonScripts[i];
      try {
        const obj = JSON.parse(script);
        validateJsonLdObject(obj);
        totalObjects++;
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        const preview = script.slice(0, 240).replace(/\s+/g, " ");
        throw new Error(`${path} JSON-LD[${i}] invalid: ${msg}. Snippet: ${preview}`);
      }
    }
  }

  console.log(`OK: robots.txt + sitemap.xml + JSON-LD validated. Parsed objects: ${totalObjects}`);
}

main().catch((err) => {
  console.error(`FAILED: ${err.message}`);
  process.exit(1);
});

