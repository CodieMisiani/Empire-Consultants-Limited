import type { Lead } from "@/lib/types";

export async function notifyLead(lead: Lead) {
  // Use a server-only email provider in production. A webhook is deliberately optional in local development.
  if (!process.env.LEAD_NOTIFICATION_EMAIL || !process.env.RESEND_API_KEY) return;
  const response = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify({ from: "Empire Website <onboarding@resend.dev>", to: [process.env.LEAD_NOTIFICATION_EMAIL], subject: `New ${lead.source.replace("_", " ")} lead`, text: `${lead.name}\n${lead.email}\n${lead.phone ?? ""}\n\n${lead.message ?? ""}` }) });
  if (!response.ok) throw new Error("Lead notification could not be sent");
}
export async function backupLead(lead: Lead) { if (!process.env.GOOGLE_SHEETS_WEBHOOK_URL) return; const response = await fetch(process.env.GOOGLE_SHEETS_WEBHOOK_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(lead) }); if (!response.ok) throw new Error("Sheet backup failed"); }
