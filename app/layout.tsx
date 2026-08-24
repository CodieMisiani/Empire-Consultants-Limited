import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppButton } from "@/components/whatsapp-button";

export const metadata: Metadata = { title: { default: "Empire Consultants | Global Education", template: "%s | Empire Consultants" }, description: "Expert international education and visa guidance for East Africa.", metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000") };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><a className="skip" href="#content">Skip to content</a><SiteHeader /><main id="content">{children}</main><SiteFooter /><WhatsAppButton /></body></html>; }
