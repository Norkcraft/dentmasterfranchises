interface SEOHeadProps {
  title: string;
  description: string;
  path: string;
  type?: string;
}

export default function SEOHead({ title, description, path, type = "website" }: SEOHeadProps) {
  void type;
  void title;
  void description;
  void path;
  return null;
}
