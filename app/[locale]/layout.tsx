import { routing } from "@/i18n/routing";
import { APP_DESCRIPTION, APP_NAME, BASE_URL } from "@/lib/constants";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import "./globals.css";

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: `%s | ${APP_NAME}`,
    default: APP_NAME,
  },
  description: APP_DESCRIPTION,
  metadataBase: new URL(BASE_URL),
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "en" | "it" | "es")) {
    notFound();
  }

  const messages = await getMessages();
  return (
    <html lang={locale} suppressHydrationWarning className="mx-auto">
      <body className={`${inter.className}  antialiased`}>
        <SessionProvider>
          <NextIntlClientProvider messages={messages || {}}>
            <div className="relative z-50 w-full  bg-red-500  text-center font-extrabold text-white">
              {process.env.NODE_ENV === "development" && <p>SEI IN DEV</p>}
              {process.env.NEXT_PUBLIC_VERCEL_ENV === "preview" && (
                <p>SEI IN PREVIEW</p>
              )}
            </div>

            {children}
          </NextIntlClientProvider>
        </SessionProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
