const hits = new Map<string, { count: number; reset: number }>();
export function limited(key: string, max = 8, windowMs = 60_000) { const now = Date.now(); const item = hits.get(key); if (!item || item.reset < now) { hits.set(key, { count: 1, reset: now + windowMs }); return false; } item.count++; return item.count > max; }
