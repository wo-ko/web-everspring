// "use client";

// import { SessionProvider } from "next-auth/react";
// import Sidebar from "./(components)/Sidebar";
// import { Suspense } from "react";

// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <SessionProvider refetchInterval={5}>
//       <Suspense fallback={<div>Loading...</div>}>
//         <div className="flex h-screen bg-gray-100">
//           <Sidebar />
//           <main className="flex-1 overflow-auto p-6">{children}</main>
//         </div>
//       </Suspense>
//     </SessionProvider>
//   );
// }
"use client";

import { SessionProvider } from "next-auth/react";
import Sidebar from "./(components)/Sidebar";
import { Suspense, useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <SessionProvider refetchInterval={5}>
      <Suspense fallback={<div className="p-4">Loading...</div>}>
        <div className="flex h-screen bg-gray-100 overflow-hidden">
          {/* Sidebar */}
          <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

          {/* Overlay (mobile only) */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/40 z-30 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Main */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Topbar */}
            <header className="h-14 shrink-0 bg-white border-b flex items-center px-4">
              <button
                className="md:hidden mr-3 text-xl"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open sidebar"
              >
                ☰
              </button>
              <span className="font-medium text-gray-700">Admin Panel</span>
            </header>

            {/* Content */}
            <main className="flex-1 overflow-auto md:p-6">{children}</main>
          </div>
        </div>
      </Suspense>
    </SessionProvider>
  );
}
