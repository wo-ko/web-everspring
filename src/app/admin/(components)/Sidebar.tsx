"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import SignOutButton from "./SignOutButton";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r p-4 flex flex-col">
      <h2 className="text-lg font-bold mb-6">Admin</h2>

      {/* ===== Content Section ===== */}
      <div className="mb-6">
        <div className="text-xs font-semibold text-gray-400 uppercase mb-2">
          Content
        </div>

        <nav className="space-y-1">
          <Nav href="/admin/home" pathname={pathname}>
            หน้าหลัก
          </Nav>
          <Nav href="/admin/about" pathname={pathname}>
            เกี่ยวกับเรา
          </Nav>
          <Nav href="/admin/company" pathname={pathname}>
            บริษัทในเครือ
          </Nav>
          <Nav href="/admin/product" pathname={pathname}>
            ผลิตภัณฑ์ทั้งหมด
          </Nav>
          <Nav href="/admin/news" pathname={pathname}>
            ข่าว/กิจกรรม
          </Nav>
          <Nav href="/admin/contact" pathname={pathname}>
            ติดต่อเรา
          </Nav>
        </nav>
      </div>

      {/* ===== Media Section ===== */}
      <div className="mb-6">
        <div className="text-xs font-semibold text-gray-400 uppercase mb-2">
          Media
        </div>

        <nav className="space-y-1">
          <Nav href="/admin/media" pathname={pathname}>
            จัดการรูปภาพ
          </Nav>
        </nav>
      </div>

      <div className="flex-1" />

      <SignOutButton />
    </aside>
  );
}

function Nav({
  href,
  pathname,
  children,
}: {
  href: string;
  pathname: string | null;
  children: React.ReactNode;
}) {
  const isActive = pathname === href || pathname?.startsWith(href + "/");

  return (
    <Link
      href={href}
      className={clsx(
        "block px-3 py-2 rounded-lg font-medium transition text-sm",
        isActive ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-100"
      )}
    >
      {children}
    </Link>
  );
}
