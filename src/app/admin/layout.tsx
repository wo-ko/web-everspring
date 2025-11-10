import { SessionProvider } from "next-auth/react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SessionProvider
        refetchInterval={5}
      >
        {children}
      </SessionProvider>
    </>
  );
}