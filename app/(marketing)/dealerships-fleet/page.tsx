import type { Metadata } from "next";
import DealershipsFleetPage from "@/components/pages/DealershipsFleetPage";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Fleet Dent Repair — Orlando Discounts | Dent Master",
    description:
      "Dealership PDR reconditioning in Orlando. Batch repairs, 10–20% volume discount, fast recon turnaround, factory paint protected. Get my fleet quote today.",
    path: "/dealerships-fleet",
  });
}

export default function Page() {
  return <DealershipsFleetPage />;
}
