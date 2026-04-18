import { Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ReviewCardProps {
  name: string;
  source: string;
  text: string;
  textEs?: string;
}

export default function ReviewCard({ name, source, text, textEs }: ReviewCardProps) {
  const { lang } = useLanguage();
  const displayText = lang === "es" && textEs ? textEs : text;

  return (
    <div className="card-elevated flex flex-col h-full">
      <div className="flex gap-0.5 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-primary text-primary" />
        ))}
      </div>
      <p className="text-foreground text-sm leading-relaxed flex-1 mb-4">&ldquo;{displayText}&rdquo;</p>
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">{name}</span>
        <span className="text-xs text-muted-foreground">{source}</span>
      </div>
    </div>
  );
}
