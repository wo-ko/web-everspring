// "use client";

// import { SessionProvider } from "next-auth/react";
// import Sidebar from "./(components)/Sidebar";
// import { Suspense, useState } from "react";
// import LanguageSwitcher from "./(components)/LanguageSwitcher";

// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [lang, setLang] = useState<"th" | "en">("th");

//   return (
//     <SessionProvider refetchInterval={5}>
//       <Suspense fallback={<div className="p-4">Loading...</div>}>
//         <div className="flex h-screen bg-gray-100 overflow-hidden">
//           {/* Sidebar */}
//           <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

//           {/* Overlay (mobile only) */}
//           {sidebarOpen && (
//             <div
//               className="fixed inset-0 bg-black/40 z-30 md:hidden"
//               onClick={() => setSidebarOpen(false)}
//             />
//           )}

//           {/* Main */}
//           <div className="flex-1 flex flex-col min-w-0">
//             {/* Topbar */}
//             <header className="h-14 shrink-0 bg-white border-b flex items-center px-4">
//               <button
//                 className="md:hidden mr-3 text-xl"
//                 onClick={() => setSidebarOpen(true)}
//                 aria-label="Open sidebar"
//               >
//                 ☰
//               </button>
//               <span className="font-medium text-gray-700">Admin Panel</span>
//               <LanguageSwitcher value={lang} onChange={setLang} />
//             </header>

//             {/* Content */}
//             <main className="flex-1 overflow-auto md:p-6">{children}</main>
//           </div>
//         </div>
//       </Suspense>
//     </SessionProvider>
//   );
// }

"use client";

import { SessionProvider } from "next-auth/react";
import Sidebar from "./(components)/Sidebar";
import { Suspense, useState } from "react";
import LanguageSwitcher from "./(components)/LanguageSwitcher";
import { AdminLangProvider } from "./(components)/AdminLangContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <SessionProvider refetchInterval={5}>
      <AdminLangProvider>
        <Suspense fallback={<div className="p-4">Loading...</div>}>
          <div className="flex h-screen bg-gray-100 overflow-hidden">
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            {sidebarOpen && (
              <div
                className="fixed inset-0 bg-black/40 z-30 md:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}

            <div className="flex-1 flex flex-col min-w-0">
              <header className="h-14 shrink-0 bg-white border-b flex items-center px-4">
                <button
                  className="md:hidden mr-3 text-xl"
                  onClick={() => setSidebarOpen(true)}
                >
                  ☰
                </button>

                <span className="font-medium text-gray-700">Admin Panel</span>

                {/* 👇 ใช้ context ใน LanguageSwitcher */}
                <LanguageSwitcher />
              </header>

              <main className="flex-1 overflow-auto md:p-6">{children}</main>
            </div>
          </div>
        </Suspense>
      </AdminLangProvider>
    </SessionProvider>
  );
}
