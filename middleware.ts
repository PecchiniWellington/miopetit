import { auth } from "@/auth";
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const locales = ["en", "it", "de", "es"];
const intlMiddleware = createMiddleware(routing);

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // 🔹 1. Controlla se l'URL ha già una lingua
  const hasLocale = locales.some((locale) => pathname.startsWith(`/${locale}`));

  if (!hasLocale) {
    // ✅ Controlla se esiste un cookie con la lingua salvata dall'utente
    const userLocale = req.cookies.get("NEXT_LOCALE")?.value;

    // ✅ Se c'è un cookie, usalo, altrimenti prendi la lingua dal browser
    const browserLocale = req.headers
      .get("accept-language")
      ?.split(",")[0]
      .split("-")[0];

    const locale = locales.includes(userLocale || "")
      ? userLocale
      : locales.includes(browserLocale || "")
        ? browserLocale
        : "en";

    // 🔄 Reindirizza alla lingua giusta
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, req.url));
  }

  // 🔹 2. Controlla l'autenticazione
  const session = await auth();
  const isAuthenticated = !!session?.user;
  const protectedRoutes = ["/dashboard", "/account", "/profile"];
  const isProtectedRoute = protectedRoutes.some((path) =>
    pathname.startsWith(path)
  );

  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: [
    "/((?!_next|_static|favicon.ico|public|api/auth).*)",
    "/(de|en|it|es)/:path*",
  ],
};
