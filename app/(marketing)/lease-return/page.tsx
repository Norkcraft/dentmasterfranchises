import type { Metadata } from "next";
import LeaseReturnPage from "@/components/pages/LeaseReturnPage";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Lease Return Dent Repair Orlando — Avoid Dealer Fees | Dent Master",
    description:
      "Fix dents before your lease return in Orlando and avoid dealer excess wear fees. PDR costs far less than body shop rates and leaves factory paint intact.",
    path: "/lease-return",
  });
}

export default function Page() {
  return <LeaseReturnPage />;
}
