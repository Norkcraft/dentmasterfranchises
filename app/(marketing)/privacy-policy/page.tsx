import type { Metadata } from "next";
import PrivacyPolicyPage from "@/components/pages/PrivacyPolicyPage";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Dent Master Franchise Privacy Policy — Data | Dent Master",
    description:
      "Dent Master Franchise privacy policy explains how we collect, use, and protect your data. Review cookies, forms, and contact options. Read it in minutes.",
    path: "/privacy-policy",
  });
}

export default function Page() {
  return <PrivacyPolicyPage />;
}
