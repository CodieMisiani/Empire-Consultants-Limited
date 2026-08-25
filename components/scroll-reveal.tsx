"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ScrollReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const element = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (!element.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => { gsap.fromTo(element.current, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: element.current, start: "top 88%", once: true } }); }, element);
    return () => context.revert();
  }, []);
  return <div ref={element} className={className}>{children}</div>;
}
