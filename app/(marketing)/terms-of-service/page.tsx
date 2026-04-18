import type { Metadata } from "next";
import TermsOfServicePage from "@/components/pages/TermsOfServicePage";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Dent Master Franchise Terms — Policies | Dent Master",
    description:
      "Dent Master Franchise terms of service cover quotes, scheduling, warranties, and site use. Review key policies before you book. Read it fast in minutes.",
    path: "/terms-of-service",
  });
}

export default function Page() {
  return <TermsOfServicePage />;
}
