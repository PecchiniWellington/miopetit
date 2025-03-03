import { auth } from "@/auth"; // Importa il gestore di autenticazione
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default async function middleware(req: NextRequest) {
  // ✅ 1. Controlla l'autenticazione con NextAuth.js
  const session = await auth();
  const isAuthenticated = !!session?.user;

  // ✅ 2. Proteggi le pagine che richiedono autenticazione
  const protectedRoutes = ["/dashboard", "/account", "/profile"]; // Aggiungi le tue pagine protette
  const isProtectedRoute = protectedRoutes.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  // ✅ 3. Passa la richiesta al middleware di `next-intl`
  return intlMiddleware(req);
}

// ✅ 4. Configura il middleware per gestire autenticazione + lingue
export const config = {
  matcher: [
    "/((?!_next|_static|favicon.ico|public|api/auth).*)", // Ignora file statici
    "/(de|en|it)/:path*", // Aggiungi tutte le lingue supportate
  ],
};
