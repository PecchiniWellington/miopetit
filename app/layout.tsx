import { Toaster } from "@/components/ui/toaster";
import { APP_DESCRIPTION, APP_NAME, BASE_URL } from "@/lib/constants";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: `%s | ${APP_NAME}`,
    default: APP_NAME,
  },
  description: APP_DESCRIPTION,
  metadataBase: new URL(BASE_URL),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="mx-auto">
      <body className={`${inter.className}  antialiased`}>
        {/* <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        > */}
        <SessionProvider>
          {children}
          <Toaster />
        </SessionProvider>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
