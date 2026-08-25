import Link from "next/link";
import { ArrowRight } from "lucide-react";

type EditorialCtaProps = {
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
  href?: string;
  label?: string;
};

export function EditorialCta({ eyebrow = "Your next chapter", title, children, href = "/contact", label = "Get in touch" }: EditorialCtaProps) {
  return <section className="editorial-cta">
    <div className="shell editorial-cta__inner">
      <div>
        <p className="eyebrow editorial-cta__eyebrow">{eyebrow}</p>
        <h2 className="heading editorial-cta__title">{title}</h2>
      </div>
      <div className="editorial-cta__action">
        <p>{children}</p>
        <Link className="button button-primary" href={href}>{label} <ArrowRight size={17} aria-hidden="true" /></Link>
      </div>
    </div>
  </section>;
}
