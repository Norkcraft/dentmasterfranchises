import type { Metadata } from "next";
import HomePage from "@/components/pages/HomePage";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Paintless Dent Repair Orlando — Fast Photo Quotes | Dent Master",
    description:
      "Paintless dent repair Orlando removes hail dents and door dings without repainting. Mobile service when conditions allow, with fast photo quotes. Get my free quote.",
    path: "/",
  });
}

export default function Page() {
  return <HomePage />;
}
