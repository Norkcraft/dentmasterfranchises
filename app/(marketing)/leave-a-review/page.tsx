import type { Metadata } from "next";
import Link from "next/link";
import { Star, ExternalLink } from "lucide-react";
import { BUSINESS } from "@/data/constants";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Leave a Review | Dent Master",
  description: "Share your experience with Dent Master Franchise in Orlando.",
  alternates: { canonical: `${siteConfig.url}/leave-a-review` },
  robots: { index: false, follow: false },
};

const platforms = [
  {
    name: "Google",
    href: BUSINESS.googleReview,
    description: "Most helpful for local search",
    primary: true,
    color: "bg-[#4285F4] hover:bg-[#3367D6] text-white",
    logo: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M12 11h8.533c.044.385.067.78.067 1.184 0 2.734-.98 5.036-2.678 6.6C16.255 20.28 14.28 21 12 21c-4.971 0-9-4.029-9-9s4.029-9 9-9c2.43 0 4.617.966 6.228 2.537L16.01 7.755C14.862 6.668 13.503 6 12 6 8.686 6 6 8.686 6 12s2.686 6 6 6c3.105 0 5.393-1.955 5.89-4.594H12v-2.406z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: `${BUSINESS.facebook}/reviews`,
    description: "Share with your network",
    primary: false,
    color: "bg-[#1877F2] hover:bg-[#166FE5] text-white",
    logo: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "Yelp",
    href: BUSINESS.yelp,
    description: "Great for local reputation",
    primary: false,
    color: "bg-[#D32323] hover:bg-[#B91C1C] text-white",
    logo: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M20.16 12.596l-4.538 1.548c-.774.26-1.5-.487-1.17-1.245L16.5 8.5c.36-.81 1.43-.81 1.74.03l2.25 2.758c.348.427.108 1.048-.33 1.308zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
      </svg>
    ),
  },
];

export default function LeaveAReviewPage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md text-center">
        {/* Stars */}
        <div className="flex justify-center gap-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-8 h-8 fill-yellow-400 text-yellow-400" />
          ))}
        </div>

        <h1 className="text-3xl font-bold text-foreground mb-3 font-heading">
          How was your experience?
        </h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Your review helps other Orlando drivers find trustworthy dent repair — and it means a lot to our team. It takes less than a minute.
        </p>

        {/* Platform buttons */}
        <div className="space-y-3 mb-10">
          {platforms.map((p) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-between w-full px-5 py-4 rounded-xl font-semibold transition-colors ${p.color} ${p.primary ? "text-base shadow-lg" : "text-sm"}`}
            >
              <span className="flex items-center gap-3">
                {p.logo}
                Leave a {p.name} Review
              </span>
              <span className="flex items-center gap-2 text-xs opacity-80">
                {p.description}
                <ExternalLink className="w-3 h-3" />
              </span>
            </a>
          ))}
        </div>

        {/* Spanish version */}
        <p className="text-xs text-muted-foreground mb-1">¿Prefiere escribir en español?</p>
        <a
          href={BUSINESS.googleReview}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-primary hover:underline"
        >
          Deje su reseña en Google →
        </a>

        <div className="mt-10 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground mb-2">Had an issue? We want to make it right.</p>
          <a href={`mailto:${BUSINESS.email}`} className="text-sm text-primary hover:underline">
            Contact us directly →
          </a>
        </div>

        <Link href="/" className="block mt-6 text-xs text-muted-foreground hover:text-foreground">
          ← Back to Dent Master Franchise
        </Link>
      </div>
    </main>
  );
}
