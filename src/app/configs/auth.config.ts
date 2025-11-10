import type { NextAuthConfig, User } from "next-auth";
import Credentials from "next-auth/providers/credentials"
import { NextResponse } from "next/server";

export default {
  providers: [
    Credentials({
      credentials: {
        username: {
          type: "text",
          label: "Username",
        },
        password: {
          type: "password",
          label: "Password",
        },
      },
      authorize: async (credentials) => {
        const res = await fetch(`${process.env.API_URL}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials)
        })

        const data = await res.json();

        if (res.status !== 200) {
          return null;
        }

        const user: User = { ...data }
        return user;
      },
    })
  ],
  session: { strategy: 'jwt', maxAge: 60 },
  callbacks: {
    jwt({ token }) {
      return token;
    },
    async session({ session }) {
      return session;
    }
  },
  pages: {
    signIn: '/admin',
    signOut: '/admin',
  }
} satisfies NextAuthConfig;
