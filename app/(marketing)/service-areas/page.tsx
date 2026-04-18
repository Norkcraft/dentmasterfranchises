import type { Metadata } from "next";
import ServiceAreasPage from "@/components/pages/ServiceAreasPage";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Paintless Dent Repair Areas — Central FL | Dent Master",
    description:
      "Paintless dent repair service areas across Central Florida, including Orlando, Winter Park, and Kissimmee. Find your city, then get my free quote today.",
    path: "/service-areas",
  });
}

export default function Page() {
  return <ServiceAreasPage />;
}
