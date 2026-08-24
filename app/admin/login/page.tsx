"use client";
import { Eye, EyeOff } from "lucide-react";
import { FormEvent, useState } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { createClient } from "@/lib/supabase/client";

export default function Login() {
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setMessage("Signing in…"); const form = new FormData(event.currentTarget); const { error } = await createClient().auth.signInWithPassword({ email: String(form.get("email")), password: String(form.get("password")) }); if (error) { setMessage(error.message); return; } location.assign("/admin"); }
  async function reset() { const email = document.querySelector<HTMLInputElement>("#email")?.value; if (!email) { setMessage("Enter your email address first."); return; } const { error } = await createClient().auth.resetPasswordForEmail(email, { redirectTo: `${location.origin}/admin/login` }); setMessage(error ? error.message : "Password reset link sent if that account exists."); }
  return <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 16, background: "var(--soft)" }}><form className="card" style={{ padding: 32, width: "min(100%,440px)", textAlign: "center" }} onSubmit={submit}><BrandLogo size="auth" priority /><p className="eyebrow">Empire consultants</p><h1 className="heading" style={{ fontSize: "2rem", margin: "8px 0 24px" }}>Admin sign in</h1><div className="grid" style={{ gap: 16, textAlign: "left" }}><label className="field">Email<input id="email" name="email" type="email" required /></label><label className="field">Password<span style={{ position: "relative", display: "block" }}><input name="password" type={showPassword ? "text" : "password"} required style={{ paddingRight: 48 }} /><button type="button" aria-label={showPassword ? "Hide password" : "Show password"} aria-pressed={showPassword} onClick={() => setShowPassword((visible) => !visible)} style={{ position: "absolute", right: 1, top: 1, bottom: 1, width: 44, display: "grid", placeItems: "center", border: 0, borderRadius: "0 4px 4px 0", background: "transparent", color: "var(--navy)" }}>{showPassword ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}</button></span></label><button className="button button-primary">Sign in</button><button className="button button-outline" type="button" onClick={reset}>Forgot password?</button>{message && <p role="status">{message}</p>}</div></form></main>;
}
