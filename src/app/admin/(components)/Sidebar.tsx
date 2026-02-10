"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import clsx from "clsx";
import SignOutButton from "./SignOutButton";

export default function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  return (
    <aside
      className={clsx(
        "fixed inset-y-0 left-0 z-40 w-64 bg-white border-r p-4 flex flex-col transition-transform",
        "md:static md:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <div className="flex items-center justify-between mb-6 md:hidden">
        <h2 className="text-lg font-bold">Admin</h2>
        <button onClick={onClose} className="text-xl">
          ✕
        </button>
      </div>

      <h2 className="text-lg font-bold mb-6 hidden md:block">Admin</h2>

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

          <div className="mt-2 space-y-1">
            <div className="px-3 text-[11px] font-semibold text-gray-400 uppercase">
              News & Career
            </div>

            <SubNav
              href="/admin/news?type=press"
              active={pathname === "/admin/news" && type === "press"}
            >
              ข่าวสาร
            </SubNav>

            <SubNav
              href="/admin/news?type=events"
              active={pathname === "/admin/news" && type === "events"}
            >
              กิจกรรม
            </SubNav>

            <SubNav
              href="/admin/news?type=career"
              active={pathname === "/admin/news" && type === "career"}
            >
              ตำแหน่งงาน
            </SubNav>
          </div>
          <Nav href="/admin/contact" pathname={pathname}>
            ติดต่อเรา
          </Nav>
        </nav>
      </div>

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
        isActive ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-100",
      )}
    >
      {children}
    </Link>
  );
}

function SubNav({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={clsx(
        "block px-6 py-2 rounded-md text-sm transition",
        active ? "bg-gray-800 text-white" : "text-gray-600 hover:bg-gray-100",
      )}
    >
      {children}
    </Link>
  );
}
