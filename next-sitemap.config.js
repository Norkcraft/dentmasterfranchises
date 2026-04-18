/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.dentmasterfranchise.com",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  sitemapSize: 7000,
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
  },
};

