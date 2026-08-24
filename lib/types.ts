export type PublishStatus = "draft" | "published";
export type LeadStatus = "new" | "contacted" | "closed";
export type LeadSource = "inquiry" | "appointment" | "event_registration" | "contact";

export type Service = { id: string; title: string; description: string; image_url: string | null; display_order: number; status: PublishStatus; updated_at: string };
export type Event = { id: string; slug: string; title: string; event_date: string; event_time: string | null; location: string; description: string; image_url: string | null; featured: boolean; status: PublishStatus; updated_at: string };
export type Lead = { id: string; name: string; email: string; phone: string | null; message: string | null; source: LeadSource; event_id: string | null; status: LeadStatus; submitted_at: string; events?: { title: string } | null };
