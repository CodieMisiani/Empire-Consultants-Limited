import { DepartureEdit } from "@/components/departure-edit";
import { PageHero } from "@/components/page-hero";

export default function Countries() {
  return <>
    <PageHero eyebrow="Global destinations" title="Find a country that feels like home.">Explore leading study destinations with opportunities that match your academic and career aspirations.</PageHero>
    <DepartureEdit />
  </>;
}
