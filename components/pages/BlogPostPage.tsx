"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, User, Clock, ChevronRight } from "lucide-react";
import { getBlogPost, blogPosts } from "@/data/blog";
import { useLanguage } from "@/contexts/LanguageContext";
import QuoteForm from "@/components/QuoteForm";

export default function BlogPostPage({ slug }: { slug: string }) {
  const post = getBlogPost(slug);
  const { t } = useLanguage();

  if (!post) {
    return (
      <section className="section-padding bg-background">
        <div className="section-container max-w-3xl text-center">
          <h1 className="text-3xl font-bold font-heading">{t("Post not found", "Artículo no encontrado")}</h1>
          <div className="mt-6">
            <Link href="/blog" className="btn-primary">{t("Back to Blog", "Volver al Blog")}</Link>
          </div>
        </div>
      </section>
    );
  }

  // Get recent posts for sidebar
  const recentPosts = blogPosts.filter(p => p.slug !== post.slug).slice(0, 3);

  // Extract H2s for TOC
  const toc: { id: string; text: string }[] = [];
  let modifiedContent = post.content;
  
  // Quick and dirty way to add IDs to H2s and build TOC
  let i = 0;
  modifiedContent = modifiedContent.replace(/<h2([^>]*)>(.*?)<\/h2>/g, (fullMatch, attrs, text) => {
    const id = `toc-${i++}`;
    toc.push({ id, text: text.replace(/<[^>]+>/g, '') }); // strip inner tags for TOC
    return `<h2 id="${id}"${attrs}>${text}</h2>`;
  });

  return (
    <>
      <article className="min-h-screen bg-background pb-20">
        {/* Header */}
        <div className="bg-charcoal py-12 md:py-20">
          <div className="section-container max-w-4xl">
            <Link href="/blog" className="inline-flex items-center text-white/60 hover:text-white mb-6 text-sm transition-colors">
              <ArrowLeft className="w-4 h-4 mr-1" /> {t("Back to Blog", "Volver al Blog")}
            </Link>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 font-heading leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-sm text-white/60">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" /> {post.author}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" /> {post.date}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" /> {post.readTime}
              </div>
            </div>
          </div>
        </div>

        <div className="section-container mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            
            {/* Table of Contents */}
            {toc.length > 0 && (
              <div className="bg-muted/50 rounded-xl p-6 mb-8 border border-border">
                <h2 className="text-xl font-bold font-heading mb-4">{t("Table of Contents", "Tabla de Contenido")}</h2>
                <ul className="space-y-2">
                  {toc.map(item => (
                    <li key={item.id}>
                      <a href={`#${item.id}`} className="text-primary hover:underline flex items-center text-sm">
                        <ChevronRight className="w-4 h-4 mr-1 opacity-50" />
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div 
              className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-heading prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: modifiedContent }}
            />
            
            {/* Key Takeaways */}
            <div className="bg-primary/5 rounded-xl p-6 mt-12 border border-primary/20">
              <h3 className="text-xl font-bold text-foreground mb-4 font-heading">{t("Key Takeaways", "Puntos Clave")}</h3>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>{t("Paintless Dent Repair (PDR) is the most cost-effective way to fix minor dents and hail damage.", "La reparación sin pintura (PDR) es la forma más rentable de arreglar abolladuras menores y daños por granizo.")}</li>
                <li>{t("PDR preserves your vehicle's factory paint and structural integrity.", "PDR preserva la pintura de fábrica y la integridad estructural de su vehículo.")}</li>
                <li>{t("Mobile PDR services offer convenience without sacrificing quality.", "Los servicios PDR móviles ofrecen comodidad sin sacrificar la calidad.")}</li>
              </ul>
            </div>

            {/* Author Bio */}
            <div className="flex items-center gap-6 mt-12 pt-8 border-t border-border" itemScope itemType="https://schema.org/Person">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-heading mb-1" itemProp="name">{post.author}</h3>
                <p className="text-sm text-muted-foreground" itemProp="description">
                  {t("Expert PDR Technician with over 15 years of experience in Central Florida. Specializing in hail damage, complex creases, and luxury vehicles.", "Técnico experto en PDR con más de 15 años de experiencia en Florida Central. Especializado en daños por granizo, pliegues complejos y vehículos de lujo.")}
                </p>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="text-xl font-bold text-foreground mb-4 font-heading">{t("Share this article", "Compartir este artículo")}</h3>
              {/* Simple share buttons could go here */}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            <div className="bg-card rounded-xl p-6 border border-border shadow-sm sticky top-24">
              <h3 className="text-lg font-bold text-foreground mb-2 font-heading">
                {t("Get a Free Estimate", "Obtenga un Presupuesto Gratis")}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t("See how much you can save with PDR.", "Vea cuánto puede ahorrar con PDR.")}
              </p>
              <QuoteForm compact />
            </div>

            {recentPosts.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-foreground mb-4 font-heading">{t("Related Posts", "Artículos Relacionados")}</h3>
                <div className="space-y-4">
                  {recentPosts.map(p => (
                    <Link key={p.slug} href={`/blog/${p.slug}`} className="block group bg-muted/30 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                        {p.title}
                      </h4>
                      <span className="text-xs text-muted-foreground font-medium">{p.date}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </article>
    </>
  );
}
