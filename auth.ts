import { prisma } from "@/core/prisma/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Facebook from "next-auth/providers/facebook";
import Google from "next-auth/providers/google";

import { compare } from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
export const config = {
  debug: true,
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 giorni
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    Google,
    Facebook,
    CredentialsProvider({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (credentials == null) return null;

        // Trova l'utente nel database
        const user = await prisma.user.findFirst({
          where: { email: credentials.email as string },
        });

        // Verifica la password
        if (user && user.password) {
          const isMatch = await compare(
            credentials.password as string,
            user.password as string
          );
          if (isMatch) {
            console.log("🔐 Login riuscito per", user.email);
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            };
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token.sub) session.user.id = token.sub;
      if (typeof token.role === "string") session.user.role = token.role;
      session.user.name = token.name;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.name = user.name;
      }
      return token;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
