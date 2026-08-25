import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { requireAdmin } from "@/lib/auth";

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();

  async function logout() {
    "use server";
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    await supabase.auth.signOut();
  }

  return <div style={{ minHeight: "100vh", background: "var(--soft)" }}><header style={{ background: "var(--navy)", color: "white" }}><div className="shell" style={{ minHeight: 70, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}><Link href="/admin" aria-label="Empire Consultants CMS"><BrandLogo size="admin" onDark /></Link><nav style={{ display: "flex", gap: 18, fontSize: ".85rem" }}><Link href="/admin/services">Services</Link><Link href="/admin/events">Events</Link><Link href="/admin/leads">Leads</Link></nav><form action={logout}><button style={{ color: "white", background: "transparent", border: "1px solid #7185bd", padding: "8px 12px", borderRadius: 4 }}>Log out</button></form></div></header>{children}</div>;
}
