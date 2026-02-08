import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQSectionProps {
  faqs: { q: string; a: string }[];
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className="border border-border rounded-lg overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between px-5 py-4 text-left bg-surface hover:bg-muted/50 transition-colors"
          >
            <span className="text-sm font-semibold text-foreground pr-4">{faq.q}</span>
            <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${openIndex === i ? "rotate-180" : ""}`} />
          </button>
          {openIndex === i && (
            <div className="px-5 py-4 text-sm text-muted-foreground leading-relaxed border-t border-border bg-muted/30">
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
