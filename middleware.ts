import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const username = process.env.ADMIN_USERNAME;
const password = process.env.ADMIN_PASSWORD;

const locales = ["en", "it", "de", "es"];
const intlMiddleware = createMiddleware(routing);
const BASIC_AUTH =
  "Basic " +
  Buffer.from(`${username ?? "admin"}:${password ?? "admin"}`).toString(
    "base64"
  );

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  console.log("✅ Middleware attivo su:", pathname);
  console.log(process.env.ADMIN_USERNAME);

  // 🔐 PROTEZIONE BASE (solo in produzione)
  /* if (process.env.NODE_ENV === "production") {
    const authHeader = req.headers.get("authorization");
    if (authHeader !== BASIC_AUTH) {
      return new NextResponse("🔒 Auth Required", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="MioPetit"',
        },
      });
    }
    console.log("Atteso BASIC_AUTH:", BASIC_AUTH);
    console.log("Ricevuto authHeader:", authHeader);
  } */

  // 🔹 1. Escludi API di NextAuth per evitare problemi
  if (
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/api/auth-check")
  ) {
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

    // 🚨 Evita loop infinito: non reindirizzare se è già nella forma corretta
    const newPathname = `/${locale}${pathname}`;
    if (pathname !== newPathname) {
      console.log(`🔄 Redirect: ${pathname} → ${newPathname}`);
      return NextResponse.redirect(new URL(newPathname, req.url));
    }
  }

  // 🔹 3. Controlla l'autenticazione usando l'API endpoint
  const sessionToken = req.cookies.get("next-auth.session-token")?.value;

  const isAuthenticated = false;

  if (sessionToken) {
    // Chiama l'API endpoint per verificare l'autenticazione
    try {
      /*   const authCheckUrl = new URL("/api/auth-check", req.url);
      authCheckUrl.searchParams.set("sessionToken", sessionToken);

      const authResponse = await fetch(authCheckUrl);
      if (authResponse.ok) {
        const authData = await authResponse.json();
        isAuthenticated = authData.isAuthenticated;
      } */
    } catch (error) {
      console.error("Errore durante la verifica dell'autenticazione:", error);
    }
  }

  const protectedRoutes = [
    "/dashboard",
    "/account",
    "/profile",
    "/shipping-address",
    "/payment-method",
    "/place-order",
    "/favorites",
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
    "/((?!_next|_static|favicon.ico|public|api/auth|images).*)",
    "/(de|en|it|es)/:path*",
    "/shipping-address",
    "/payment-method",
    "/place-order",
    "/favorites",
    "/profile",
    "/user/:path*",
    "/order/:path*",
    "/admin/:path*",
    "/dashboard",
  ],
};
