const ctaVariants = [
  " Get my free quote.",
  " Get my free quote now.",
  " Get my free quote today.",
];

export function fitMetaDescription(input: string): string {
  let text = input.replace(/\s+/g, " ").trim();

  if (text.length > 155) {
    let sliced = text.slice(0, 155);
    const lastSpace = sliced.lastIndexOf(" ");
    if (lastSpace > 120) sliced = sliced.slice(0, lastSpace);
    sliced = sliced.replace(/[\s,;:]+$/, "");
    if (!/[.!?]$/.test(sliced)) sliced += ".";
    text = sliced;
  }

  if (text.length < 150) {
    for (const cta of ctaVariants) {
      const candidate = (text + cta).replace(/\s+/g, " ").trim();
      if (candidate.length >= 150 && candidate.length <= 155) return candidate;
    }
    const fallback = (text + ctaVariants[0]).replace(/\s+/g, " ").trim();
    if (fallback.length > 155) return fallback.slice(0, 155).replace(/\s+$/, "");
    return fallback;
  }

  return text;
}
