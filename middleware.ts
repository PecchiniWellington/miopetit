import { auth } from "@/auth";
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const locales = ["en", "it", "de", "es"];
const intlMiddleware = createMiddleware(routing);

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  console.log("✅ Middleware attivo su:", pathname);

  // 🔹 1. Escludi API di NextAuth per evitare problemi
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // 🔹 2. Controlla se l'URL ha già una lingua
  const hasLocale = locales.some((locale) => pathname.startsWith(`/${locale}`));

  if (!hasLocale) {
    const userLocale = req.cookies.get("NEXT_LOCALE")?.value;
    const browserLocale = req.headers
      .get("accept-language")
      ?.split(",")[0]
      .split("-")[0];

    const locale = locales.includes(userLocale || "")
      ? userLocale
      : locales.includes(browserLocale || "")
        ? browserLocale
        : "en";

    return NextResponse.redirect(new URL(`/${locale}${pathname}`, req.url));
  }

  // 🔹 3. Controlla l'autenticazione usando `auth()`
  const session = await auth();
  const isAuthenticated = !!session?.user;

  const protectedRoutes = [
    "/dashboard",
    "/account",
    "/profile",
    "/shipping-address",
    "/payment-method",
    "/place-order",
    "/favorites",
    "/profile",
    "/user",
    "/order",
    "/admin",
  ];

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute && !isAuthenticated) {
    console.log("🚫 Utente non autenticato, reindirizzamento a /sign-in");
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // 🔹 4. Controlla se `sessionCartId` è presente nei cookie
  let sessionCartId = req.cookies.get("sessionCartId")?.value;
  if (!sessionCartId) {
    sessionCartId = crypto.randomUUID(); // Genera un UUID casuale

    // Clona gli header della richiesta
    const newRequestHeaders = new Headers(req.headers);

    // Crea una nuova risposta
    const response = NextResponse.next({
      request: {
        headers: newRequestHeaders,
      },
    });

    // Imposta il nuovo sessionCartId nei cookie
    response.cookies.set("sessionCartId", sessionCartId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return response;
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: [
    "/((?!_next|_static|favicon.ico|public|api/auth).*)",
    "/(de|en|it|es)/:path*",
    "/shipping-address",
    "/payment-method",
    "/place-order",
    "/favorites",
    "/profile",
    "/user/:path*",
    "/order/:path*",
    "/admin/:path*",
  ],
};
