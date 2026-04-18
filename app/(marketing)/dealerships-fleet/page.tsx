import type { Metadata } from "next";
import DealershipsFleetPage from "@/components/pages/DealershipsFleetPage";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Fleet Dent Repair — Orlando Discounts | Dent Master",
    description:
      "Fleet dent repair in Orlando that keeps inventory retail-ready. We fix dings in batches, cut recon time, and protect factory paint. Get my fleet quote.",
    path: "/dealerships-fleet",
  });
}

export default function Page() {
  return <DealershipsFleetPage />;
}
