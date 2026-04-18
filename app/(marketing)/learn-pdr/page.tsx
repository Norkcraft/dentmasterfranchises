import type { Metadata } from "next";
import LearnPDRPage from "@/components/pages/LearnPDRPage";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Paintless Dent Repair Training — Orlando | Dent Master",
    description:
      "Paintless dent repair training in Orlando with hands-on coaching and real repairs. Build skills fast and start earning sooner. Get my training info today.",
    path: "/learn-pdr",
  });
}

export default function Page() {
  return <LearnPDRPage />;
}
