import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const adminLoginPath = "/admin/login";

function loginRedirect(request: NextRequest, reason: "configuration" | "session" = "session") {
  const url = request.nextUrl.clone();
  url.pathname = adminLoginPath;
  url.searchParams.set("error", reason);
  return NextResponse.redirect(url);
}

export async function middleware(request: NextRequest) {
  const isLoginRoute = request.nextUrl.pathname === adminLoginPath;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // An incomplete Vercel configuration must fail closed, never crash Edge middleware.
  if (!supabaseUrl || !supabaseAnonKey) {
    return isLoginRoute ? NextResponse.next() : loginRedirect(request, "configuration");
  }

  let response = NextResponse.next({ request });
  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(cookies: { name: string; value: string; options: CookieOptions }[]) {
        cookies.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookies.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  if (isLoginRoute) return response;

  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) return loginRedirect(request);
  } catch {
    return loginRedirect(request);
  }

  return response;
}

export const config = { matcher: ["/admin/:path*"] };
