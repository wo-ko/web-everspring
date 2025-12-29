// import { SessionProvider } from "next-auth/react";

// export default function AdminLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <>
//       <SessionProvider
//         refetchInterval={5}
//       >
//         {children}
//       </SessionProvider>
//     </>
//   );
// }

// src/app/admin/layout.tsx

"use client";

import { SessionProvider } from "next-auth/react";
import Sidebar from "./(components)/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider refetchInterval={5}>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </SessionProvider>
  );
}
