import { useCountUp } from "@/hooks/useScrollReveal";

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

export default function AnimatedCounter({ end, suffix = "", prefix = "", label }: AnimatedCounterProps) {
  const ref = useCountUp(end);

  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-primary font-heading">
        {prefix}<span ref={ref}>0</span>{suffix}
      </div>
      <p className="text-sm text-muted-foreground mt-2">{label}</p>
    </div>
  );
}
