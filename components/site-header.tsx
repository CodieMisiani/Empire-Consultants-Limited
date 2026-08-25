"use client";

import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BrandLogo } from "@/components/brand-logo";

const links = [["Home", "/"], ["About Us", "/about"], ["Services", "/services"], ["Study Abroad", "/study-abroad"], ["Countries", "/countries"], ["Events", "/events"], ["Testimonials", "/testimonials"], ["Contact", "/contact"]];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeMenu = () => { setOpen(false); requestAnimationFrame(() => toggleRef.current?.focus()); };

  useEffect(() => {
    if (!open) return;
    const header = headerRef.current;
    const nav = navRef.current;
    if (!header || !nav) return;
    const previousOverflow = document.body.style.overflow;
    const siblings = Array.from(document.body.children).filter((element) => element !== header).map((element) => ({ element, ariaHidden: element.getAttribute("aria-hidden") }));
    document.body.style.overflow = "hidden";
    siblings.forEach(({ element }) => element.setAttribute("aria-hidden", "true"));
    const focusables = () => [toggleRef.current, ...Array.from(nav.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'))].filter((element): element is HTMLElement => Boolean(element));
    requestAnimationFrame(() => nav.querySelector<HTMLElement>('a[href]')?.focus());
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); closeMenu(); return; }
      if (event.key !== "Tab") return;
      const items = focusables(); if (!items.length) return;
      const currentIndex = items.indexOf(document.activeElement as HTMLElement);
      const nextIndex = event.shiftKey ? (currentIndex <= 0 ? items.length - 1 : currentIndex - 1) : (currentIndex === -1 || currentIndex === items.length - 1 ? 0 : currentIndex + 1);
      event.preventDefault(); items[nextIndex]?.focus();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => { document.body.style.overflow = previousOverflow; siblings.forEach(({ element, ariaHidden }) => { if (ariaHidden === null) element.removeAttribute("aria-hidden"); else element.setAttribute("aria-hidden", ariaHidden); }); document.removeEventListener("keydown", handleKeyDown); };
  }, [open]);

  return <header ref={headerRef} style={{borderBottom:"1px solid var(--line)",background:"var(--paper)",position:"sticky",top:0,zIndex:20}}><div className="shell" style={{minHeight:86,display:"flex",alignItems:"center",justifyContent:"space-between",gap:20}}><Link href="/" aria-label="Empire Consultants home"><BrandLogo priority /></Link><nav ref={navRef} id="primary-nav" aria-label="Main navigation" className={open?"nav open":"nav"}>{links.map(([label,href])=><Link key={href} href={href} onClick={closeMenu}>{label}</Link>)}<div className="mobile-details"><a href="tel:+254734004003"><Phone size={16}/> +254 734 004 003</a><Link className="button button-primary" href="/book-appointment" onClick={closeMenu}>Book a Consultation</Link></div></nav><div style={{display:"flex",alignItems:"center",gap:12}}><a className="phone" href="tel:+254734004003">+254 734 004 003</a><Link className="button button-primary desktop-cta" href="/book-appointment">Book a Consultation</Link><button ref={toggleRef} className="mobile-toggle" aria-label={open ? "Close navigation" : "Open navigation"} aria-controls="primary-nav" aria-expanded={open} onClick={()=>open ? closeMenu() : setOpen(true)}>{open?<X/>:<Menu/>}</button></div></div><style jsx>{`.nav{display:flex;gap:18px;font-size:.78rem;font-weight:600;color:var(--muted);align-items:center}.nav a:hover{color:var(--gold)}.mobile-details{display:none}.mobile-toggle{display:none;border:0;background:transparent;color:var(--navy)}@media(max-width:1080px){.nav{display:none}.nav.open{display:flex;position:absolute;top:86px;left:0;right:0;min-height:calc(100vh - 86px);flex-direction:column;align-items:stretch;gap:0;padding:24px;background:var(--paper);border-bottom:1px solid var(--line);font-size:1rem}.nav.open>a{padding:16px 0;border-bottom:1px solid var(--line)}.mobile-details{display:grid;gap:18px;margin-top:auto;padding-top:32px}.mobile-details>a:first-child{display:flex;gap:8px;align-items:center;border:0;padding:0;color:var(--navy)}.mobile-toggle{display:inline-flex}.phone,.desktop-cta{display:none}}@media(max-width:520px){.button{padding:.6rem .75rem;font-size:.75rem}}`}</style></header>;
}
