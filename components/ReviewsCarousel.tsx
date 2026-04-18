import { useState, useEffect, useRef, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { reviews } from "@/data/reviews";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ReviewsCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval>>();
  const touchStartRef = useRef(0);
  const total = reviews.length;
  const { lang } = useLanguage();

  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(next, 5000);
    return () => clearInterval(timerRef.current);
  }, [paused, next]);

  const handleTouchStart = (e: React.TouchEvent) => {
    const first = e.touches.item(0);
    if (!first) return;
    touchStartRef.current = first.clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const first = e.changedTouches.item(0);
    if (!first) return;
    const diff = touchStartRef.current - first.clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        next();
      } else {
        prev();
      }
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {reviews.map((r) => (
            <div key={r.name} className="w-full shrink-0 px-2 md:w-1/2 lg:w-1/3">
              <div className="card-elevated flex flex-col h-full min-h-[200px]">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" aria-hidden="true" />
                  ))}
                </div>
                <p className="text-foreground text-sm leading-relaxed flex-1 mb-4">
                  &ldquo;{lang === "es" ? r.textEs : r.text}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-foreground">{r.name}</span>
                  <span className="text-xs text-muted-foreground">{r.source}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-10 h-10 rounded-full bg-card border border-border shadow-lg flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors z-10"
        aria-label="Previous review"
      >
        <ChevronLeft className="w-5 h-5" aria-hidden="true" />
      </button>
      <button
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-10 h-10 rounded-full bg-card border border-border shadow-lg flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors z-10"
        aria-label="Next review"
      >
        <ChevronRight className="w-5 h-5" aria-hidden="true" />
      </button>

      <div className="flex justify-center gap-2 mt-6">
        {reviews.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${i === current ? "bg-primary" : "bg-border hover:bg-muted-foreground"}`}
            aria-label={`Go to review ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
