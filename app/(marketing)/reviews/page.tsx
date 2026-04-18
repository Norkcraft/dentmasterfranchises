import type { Metadata } from "next";
import ReviewsPage from "@/components/pages/ReviewsPage";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Paintless Dent Repair Reviews — Orlando | Dent Master",
    description:
      "Paintless dent repair reviews in Orlando from real drivers and dealerships. See why customers trust our no-paint repairs. Get my free quote right now.",
    path: "/reviews",
  });
}

export default function Page() {
  return <ReviewsPage />;
}
