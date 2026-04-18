
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_ROOT = path.resolve(__dirname, '..');
const CITIES_FILE = path.join(PROJECT_ROOT, 'src', 'data', 'cities.ts');
const SERVICES_FILE = path.join(PROJECT_ROOT, 'src', 'data', 'services.ts');
const BLOG_FILE = path.join(PROJECT_ROOT, 'src', 'data', 'blog.ts');
const SITEMAP_FILE = path.join(PROJECT_ROOT, 'public', 'sitemap.xml');
const BASE_URL = 'https://www.dentmasterfranchise.com';

function extractSlugs(filePath, pattern) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const matches = [];
    let match;
    while ((match = pattern.exec(content)) !== null) {
      matches.push(match[1]);
    }
    return matches;
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return [];
  }
}

function generateSitemap() {
  console.log('Generating sitemap...');

  // 1. Static Routes
  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/reviews',
    '/before-after',
    '/services',
    '/dealerships-fleet',
    '/learn-pdr',
    '/service-areas',
    '/blog',
    '/privacy-policy',
    '/terms-of-service',
  ];

  // 2. Extract Service Slugs
  // Matches: slug: "some-slug",
  const servicePattern = /slug:\s*"([^"]+)"/g;
  const serviceSlugs = extractSlugs(SERVICES_FILE, servicePattern);
  console.log(`Found ${serviceSlugs.length} services.`);

  // 3. Extract City Slugs
  // Matches: cityBase("City Name", "some-slug")
  // We need the second group (the slug)
  const cityPattern = /cityBase\("[^"]+",\s*"([^"]+)"\)/g;
  const citySlugs = extractSlugs(CITIES_FILE, cityPattern);
  console.log(`Found ${citySlugs.length} cities.`);

  const blogPattern = /slug:\s*"([^"]+)"/g;
  const blogSlugs = extractSlugs(BLOG_FILE, blogPattern);
  console.log(`Found ${blogSlugs.length} blog posts.`);

  // 4. Build XML
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Add Static Pages
  staticRoutes.forEach(route => {
    xml += `  <url><loc>${BASE_URL}${route}</loc></url>\n`;
  });

  // Add Service Pages
  serviceSlugs.forEach(slug => {
    xml += `  <url><loc>${BASE_URL}/services/${slug}</loc></url>\n`;
  });

  // Add City Pages
  citySlugs.forEach(slug => {
    xml += `  <url><loc>${BASE_URL}/service-areas/${slug}</loc></url>\n`;
  });

  // Add Blog Pages
  blogSlugs.forEach(slug => {
    xml += `  <url><loc>${BASE_URL}/blog/${slug}</loc></url>\n`;
  });

  xml += '</urlset>';

  // 5. Write to file
  fs.writeFileSync(SITEMAP_FILE, xml);
  console.log(`Sitemap written to ${SITEMAP_FILE}`);
}

generateSitemap();
