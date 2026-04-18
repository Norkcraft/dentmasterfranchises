import type { Metadata } from "next";
import ContactPage from "@/components/pages/ContactPage";
import { buildMetadata } from "@/lib/metadata";
import { buildLocalBusinessSchema } from "@/lib/localBusiness";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Paintless Dent Repair Quote — Orlando | Dent Master",
    description:
      "Paintless dent repair quote in Orlando with fast replies and clear pricing. Send photos, choose mobile or in-shop service, and get a free estimate today.",
    path: "/contact",
  });
}

export default function Page() {
  const localBusinessSchema = buildLocalBusinessSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <ContactPage />
    </>
  );
}
