"use client";

import { signOut, useSession } from "next-auth/react";

export default function SignOutButton() {
  const { data: session, status } = useSession();

  if (status !== "authenticated") return null;

  return (
    <div className="border-t pt-4 space-y-2">
      <div className="text-sm text-gray-600 truncate">
        {session.user?.email}
      </div>

      <button
        onClick={() =>
          signOut({
            callbackUrl: "/admin",
          })
        }
        className="w-full text-left px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 font-medium"
      >
        Sign out
      </button>
    </div>
  );
}
