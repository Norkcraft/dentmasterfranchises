import type { Metadata } from "next";
import ServicesPage from "@/components/pages/ServicesPage";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Paintless Dent Repair Services — Orlando | Dent Master",
    description:
      "Paintless dent repair services in Orlando for hail damage, door dings, and minor collision dents. Compare options fast and get a free quote online today.",
    path: "/services",
  });
}

export default function Page() {
  return <ServicesPage />;
}
