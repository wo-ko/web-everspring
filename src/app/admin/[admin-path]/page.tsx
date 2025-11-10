"use client";
import { signOut, useSession } from "next-auth/react";

export default function LoginPage() {
  const { data: session, status } = useSession()

  if (status === 'loading') return;

  return (
    <>
      <button onClick={() => signOut({
        redirectTo: "/admin/"
      })}>Sign out</button>
    </>
  )
}