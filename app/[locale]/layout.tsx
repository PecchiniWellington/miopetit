import { Toaster } from "@/components/ui/toaster";
import { routing } from "@/i18n/routing";
import { APP_DESCRIPTION, APP_NAME, BASE_URL } from "@/lib/constants";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import "./globals.css";

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: `%s | ${APP_NAME}`,
    default: APP_NAME,
  },
  description: APP_DESCRIPTION,
  metadataBase: new URL(BASE_URL),
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  return (
    <html lang="en" suppressHydrationWarning className="mx-auto">
      <body className={`${inter.className}  antialiased`}>
        {/* <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        > */}
        <NextIntlClientProvider messages={messages}>
          <SessionProvider>{children}</SessionProvider>
        </NextIntlClientProvider>
        <Toaster />

        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
