import { Star } from "lucide-react";

interface ReviewCardProps {
  name: string;
  source: string;
  text: string;
}

export default function ReviewCard({ name, source, text }: ReviewCardProps) {
  return (
    <div className="card-elevated flex flex-col h-full">
      <div className="flex gap-0.5 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-primary text-primary" />
        ))}
      </div>
      <p className="text-foreground text-sm leading-relaxed flex-1 mb-4">"{text}"</p>
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">{name}</span>
        <span className="text-xs text-muted-foreground">{source}</span>
      </div>
    </div>
  );
}
