import type { Metadata } from "next";
import AboutPage from "@/components/pages/AboutPage";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Paintless Dent Repair Experts — Orlando | Dent Master",
    description:
      "Paintless dent repair experts in Orlando who fix dents without repainting. See our story, meet the team, and get a free quote from photos today in minutes.",
    path: "/about",
  });
}

export default function Page() {
  return <AboutPage />;
}
