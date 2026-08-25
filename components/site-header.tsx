"use client";

import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { BrandLogo } from "@/components/brand-logo";

const links = [["About Us", "/about"], ["Services", "/services"], ["Study Abroad", "/study-abroad"], ["Countries", "/countries"], ["Events", "/events"], ["Contact", "/contact"]];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closing = useRef(false);
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const closeMenu = useCallback(() => {
    if (closing.current || !menuVisible) return;
    closing.current = true;
    setOpen(false);
    requestAnimationFrame(() => toggleRef.current?.focus());
  }, [menuVisible]);
  const openMenu = () => { closing.current = false; setMenuVisible(true); setOpen(true); };

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(motionQuery.matches);
    updateMotionPreference();
    let frame = 0;
    const update = () => { frame = 0; setScrolled(window.scrollY > 40); };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update(); window.addEventListener("scroll", onScroll, { passive: true });
    motionQuery.addEventListener("change", updateMotionPreference);
    return () => { window.removeEventListener("scroll", onScroll); motionQuery.removeEventListener("change", updateMotionPreference); if (frame) cancelAnimationFrame(frame); };
  }, []);

  useEffect(() => {
    if (!open) return;
    const header = headerRef.current; const nav = navRef.current;
    if (!header || !nav) return;
    const previousOverflow = document.body.style.overflow;
    const siblings = Array.from(document.body.children).filter((element) => element !== header).map((element) => ({ element, ariaHidden: element.getAttribute("aria-hidden") }));
    document.body.style.overflow = "hidden"; siblings.forEach(({ element }) => element.setAttribute("aria-hidden", "true"));
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
  }, [open, menuVisible, closeMenu]);

  useLayoutEffect(() => {
    const nav = navRef.current; if (!nav || !menuVisible) return;
    const items = nav.querySelectorAll(":scope > a");
    if (reducedMotion) { gsap.set(items, { autoAlpha: 1, y: 0 }); if (!open) setMenuVisible(false); return; }
    const context = gsap.context(() => {
      if (open) { gsap.fromTo(items, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.28, stagger: 0.04, ease: "power2.out" }); }
      else { gsap.to(items, { autoAlpha: 0, y: -4, duration: 0.2, ease: "power1.in", onComplete: () => { closing.current = false; setMenuVisible(false); } }); }
    }, nav);
    return () => context.revert();
  }, [open, menuVisible, reducedMotion]);

  return <header ref={headerRef} className={`site-header${scrolled ? " is-scrolled" : ""}${reducedMotion ? " reduced-motion" : ""}`} style={{borderBottom:"1px solid var(--line)",background:"var(--paper)",position:"sticky",top:0,zIndex:20}}><div className="header-overlay" aria-hidden="true" /><div className="shell header-inner" style={{minHeight:86,display:"flex",alignItems:"center",justifyContent:"space-between",gap:20}}><Link href="/" aria-label="Empire Consultants home"><BrandLogo priority /></Link><nav ref={navRef} id="primary-nav" aria-label="Main navigation" className={menuVisible ? "nav open" : "nav"}>{links.map(([label, href]) => <Link key={href} href={href} aria-current={isActive(href) ? "page" : undefined} className={isActive(href) ? "active" : undefined} onClick={closeMenu}>{label}</Link>)}<div className="mobile-details"><a href="tel:+254734004003"><Phone size={16} /> +254 734 004 003</a><Link className="button button-primary" href="/book-appointment" onClick={closeMenu}>Book a Consultation</Link></div></nav><div style={{display:"flex",alignItems:"center",gap:12}}><a className="phone" href="tel:+254734004003">+254 734 004 003</a><Link className="button button-primary desktop-cta" href="/book-appointment">Book a Consultation</Link><button ref={toggleRef} className="mobile-toggle" aria-label={open ? "Close navigation" : "Open navigation"} aria-controls="primary-nav" aria-expanded={open} onClick={() => open ? closeMenu() : openMenu()}>{open ? <X /> : <Menu />}</button></div></div><style jsx>{`.site-header{isolation:isolate}.header-overlay{position:absolute;inset:0;z-index:0;opacity:0;box-shadow:0 8px 24px rgba(0,5,25,.12);pointer-events:none;transition:opacity .22s ease}.header-inner{position:relative;z-index:1;transform:scale(1);transform-origin:top center;transition:transform .22s ease}.site-header.is-scrolled .header-overlay{opacity:1}.site-header.is-scrolled .header-inner{transform:scale(.985)}.site-header.reduced-motion .header-overlay,.site-header.reduced-motion .header-inner{transition:none}.nav{display:flex;gap:18px;font-size:.78rem;font-weight:600;color:var(--muted);align-items:center}.nav a:hover,.nav a.active{color:var(--gold)}.nav a.active{box-shadow:inset 0 -2px 0 var(--gold)}.mobile-details{display:none}.mobile-toggle{display:none;border:0;background:transparent;color:var(--navy)}@media(max-width:1080px){.nav{display:none}.nav.open{display:flex;position:absolute;top:86px;left:0;right:0;min-height:calc(100vh - 86px);flex-direction:column;align-items:stretch;gap:0;padding:24px;background:var(--paper);border-bottom:1px solid var(--line);font-size:1rem}.nav.open>a{padding:16px 0;border-bottom:1px solid var(--line)}.nav.open>a.active{box-shadow:inset 3px 0 0 var(--gold)}.mobile-details{display:grid;gap:18px;margin-top:auto;padding-top:32px}.mobile-details>a:first-child{display:flex;gap:8px;align-items:center;border:0;padding:0;color:var(--navy)}.mobile-toggle{display:inline-flex}.phone,.desktop-cta{display:none}}@media(max-width:520px){.button{padding:.6rem .75rem;font-size:.75rem}}`}</style></header>;
}
