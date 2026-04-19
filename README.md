# Dent Master Franchise — Website

Business website for Dent Master Franchise, a paintless dent repair (PDR) company based in Orlando, FL serving 25+ cities across Central Florida.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **Animations**: GSAP + ScrollTrigger
- **Deployment**: Vercel
- **Forms**: Google Apps Script (Google Sheets backend)

## Features

- Bilingual support (English / Spanish)
- 25 city-specific service area pages
- 5 service pages with full content and FAQ schema
- Blog with SEO-optimized articles
- Quote request form with photo upload
- PDR training inquiry form
- Schema.org structured data (LocalBusiness, AggregateRating, FAQ, Article, Breadcrumb)
- Auto-generated sitemap and robots.txt

## Getting Started

```sh
# Install dependencies
npm install

# Run development server (port 8080)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
app/                  # Next.js App Router pages
components/           # React components
  layout/             # Header, Footer
  pages/              # Page-level components
  seo/                # Schema.org / JSON-LD components
  ui/                 # shadcn/ui base components
data/                 # Static data (cities, services, blog, reviews)
lib/                  # Utilities (SEO, metadata, form submission)
contexts/             # React context (language)
hooks/                # Custom hooks
public/               # Static assets
assets/               # Images (before/after, logo, hero)
```

## Deployment

Deployed on Vercel. Push to `main` triggers automatic deployment.

```sh
git push origin main
```
