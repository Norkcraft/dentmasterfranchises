import type { Metadata } from "next";
import BeforeAfterPage from "@/components/pages/BeforeAfterPage";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Paintless Dent Repair Results — Orlando | Dent Master",
    description:
      "Paintless dent repair before and after photos from Orlando repairs. See hail dents and door ding results with no repainting. Get my free quote today!",
    path: "/before-after",
  });
}

export default function Page() {
  return <BeforeAfterPage />;
}
