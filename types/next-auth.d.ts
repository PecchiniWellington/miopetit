import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    role?: string;
  }

  interface Session {
    user: User & DefaultSession["user"];
  }

  interface JWT {
    id: string;
    role?: string;
    name?: string;
  }
}
