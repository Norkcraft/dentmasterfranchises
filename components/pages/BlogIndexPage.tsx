"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, User, Clock, Tag } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { useLanguage } from "@/contexts/LanguageContext";

export default function BlogIndexPage() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)));
  const categories = ["All", ...allTags];

  const filteredPosts = activeCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.tags.includes(activeCategory));

  return (
    <>
      <section className="bg-charcoal py-16 md:py-24">
        <div className="section-container text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 font-heading">
            {t("Paintless Dent Repair Blog — Guides, Tips & Expert Insights", "Blog de Reparación de Abolladuras — Guías, Consejos y Opiniones")}
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            {t(
              "Expert advice to help you save money and keep your vehicle looking new.",
              "Consejos de expertos para ayudarle a ahorrar dinero y mantener su vehículo como nuevo."
            )}
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="section-container max-w-5xl">
          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            <span className="text-sm font-semibold text-muted-foreground mr-2 flex items-center">
              <Tag className="w-4 h-4 mr-1" /> Filter:
            </span>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredPosts.map((post) => (
              <article key={post.slug} className="card-elevated flex flex-col group hover:border-primary/30 transition-all duration-300">
                <div className="mb-4 flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-3 font-heading group-hover:text-primary transition-colors">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>
                <p className="text-muted-foreground mb-6 flex-grow">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center text-xs text-muted-foreground mb-6 space-x-4">
                  <div className="flex items-center">
                    <User className="w-3 h-3 mr-1" /> {post.author}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" /> {post.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" /> {post.readTime}
                  </div>
                </div>

                <Link 
                  href={`/blog/${post.slug}`} 
                  className="inline-flex items-center text-sm font-bold text-primary hover:gap-2 transition-all mt-auto"
                >
                  {t("Read Article", "Leer Artículo")} <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
