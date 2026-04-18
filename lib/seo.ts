export const siteConfig = {
  name: 'Dent Master Franchise',
  brand: 'Dent Master',
  url: 'https://www.dentmasterfranchise.com',
  description:
    'Paintless dent repair in Orlando, FL for hail damage, door dings, and dents. We keep factory paint, move fast, and make quotes simple.',
  ogImage: '/og/default.jpg',
  twitterHandle: '',
  address: {
    street: '1616 Golden Poppy Ct',
    city: 'Orlando',
    region: 'FL',
    country: 'United States',
    postalCode: '32824',
  },
  phone: '+1 (407) 793-3446',
  email: 'Support@dentmasterfranchise.com',
  geo: {
    latitude: 28.3883,
    longitude: -81.3467,
  },
  sameAs: [
    'https://www.instagram.com/dentmasterfranchise/',
    'https://www.tiktok.com/@dentmasterfranchise',
    'https://www.facebook.com/dentmasterfranchise',
  ],
  priceRange: '$$',
};

export function buildCanonical(path: string): string {
  return `${siteConfig.url}${path}`;
}
