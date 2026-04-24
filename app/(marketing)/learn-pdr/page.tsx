import type { Metadata } from "next";
import LearnPDRPage from "@/components/pages/LearnPDRPage";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Paintless Dent Repair Training — Orlando | Dent Master",
    description:
      "Hands-on PDR training in Orlando. Daily ($400), weekly ($1,800), and monthly ($6,800) courses for beginners and working techs. Build skills fast and start earning sooner.",
    path: "/learn-pdr",
  });
}

export default function Page() {
  return <LearnPDRPage />;
}
