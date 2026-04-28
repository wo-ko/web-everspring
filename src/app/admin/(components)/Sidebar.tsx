'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import clsx from 'clsx';
import {
  Home,
  Info,
  Building2,
  Package,
  Newspaper,
  Image as ImageIcon,
  MessageSquare,
  X,
  ChevronRight,
  LayoutDashboard,
  Users,
  KeyRound,
} from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';
import SignOutButton from './SignOutButton';
import DisabledNavItem from './DisabledNavItem';

export default function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const type = searchParams.get('type');

  const [roleId, setRoleId] = useState<number | null>(null);
  const [username, setUsername] = useState('');
  const [mounted, setMounted] = useState(false);

  // ใช้ useCallback เพื่อให้ฟังก์ชันไม่ถูกสร้างใหม่บ่อยเกินไป
  const syncRole = useCallback(() => {
    if (typeof window === 'undefined') return;

    const savedUser = localStorage.getItem('user');
    if (!savedUser) {
      setRoleId(null);
      setUsername('');
      return;
    }

    try {
      const parsed = JSON.parse(savedUser);
      setRoleId(Number(parsed.roleId));
      setUsername(parsed.username || '');
    } catch {
      localStorage.removeItem('user');
      setRoleId(null);
      setUsername('');
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    syncRole();

    // ฟัง Event เมื่อมีการเปลี่ยนแปลงข้อมูล
    window.addEventListener('storage', syncRole);
    window.addEventListener('user-role-updated', syncRole);

    return () => {
      window.removeEventListener('storage', syncRole);
      window.removeEventListener('user-role-updated', syncRole);
    };
  }, [syncRole, pathname]); // ใส่ pathname เพื่อให้เช็คใหม่ทุกครั้งที่เปลี่ยนหน้า

  const canManageUsers =
    mounted && (Number(roleId) === 1 || Number(roleId) === 99);

  return (
    <>
      {open && (
        <div
          className='fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm md:hidden transition-opacity'
          onClick={onClose}
        />
      )}

      <aside
        className={clsx(
          'fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-100 flex flex-col transition-transform duration-300 ease-in-out h-screen',
          'md:static md:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className='h-14 flex items-center justify-between px-5 border-b border-slate-50'>
          <div className='flex items-center gap-2.5'>
            <div className='w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center shadow-sm shadow-indigo-200'>
              <LayoutDashboard size={16} className='text-white' />
            </div>
            <span className='text-lg font-bold tracking-tight text-slate-800'>
              AdminPanel
            </span>
          </div>

          <button
            onClick={onClose}
            className='md:hidden p-1.5 hover:bg-slate-50 rounded-lg transition-colors text-slate-400'
          >
            <X size={18} />
          </button>
        </div>

        <div className='flex-1 overflow-y-auto px-3 py-2 space-y-3'>
          <div>
            <h3 className='px-3 text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em] mb-2'>
              Main Menu
            </h3>

            <nav className='space-y-0.5'>
              <NavItem
                href='/admin/home'
                icon={<Home size={17} />}
                label='หน้าหลัก'
                active={pathname === '/admin/home'}
                onClick={onClose}
              />

              <NavItem
                href='/admin/about'
                icon={<Info size={17} />}
                label='เกี่ยวกับเรา'
                active={pathname === '/admin/about'}
                onClick={onClose}
              />

              <NavItem
                href='/admin/company'
                icon={<Building2 size={17} />}
                label='บริษัทในเครือ'
                active={pathname === '/admin/company'}
                onClick={onClose}
              />

              <NavItem
                href='/admin/product'
                icon={<Package size={17} />}
                label='ผลิตภัณฑ์'
                active={pathname === '/admin/product'}
                onClick={onClose}
              />

              <div className='mt-2'>
                <div className='flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider'>
                  <Newspaper size={14} />
                  <span>News & Career</span>
                </div>

                <div className='ml-3 pl-2 border-l border-slate-100 space-y-0.5 mt-1'>
                  <SubNavItem
                    href='/admin/news?type=press'
                    label='ข่าวสาร'
                    active={pathname === '/admin/news' && type === 'press'}
                    onClick={onClose}
                  />

                  <SubNavItem
                    href='/admin/news?type=events'
                    label='กิจกรรม'
                    active={pathname === '/admin/news' && type === 'events'}
                    onClick={onClose}
                  />

                  <SubNavItem
                    href='/admin/news?type=career'
                    label='ตำแหน่งงาน'
                    active={pathname === '/admin/news' && type === 'career'}
                    onClick={onClose}
                  />
                </div>
              </div>

              <NavItem
                href='/admin/contact'
                icon={<MessageSquare size={17} />}
                label='ติดต่อเรา'
                active={pathname === '/admin/contact'}
                onClick={onClose}
              />
            </nav>
          </div>

          <div>
            <h3 className='px-3 text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em] mb-2'>
              System Assets
            </h3>

            <nav>
              <NavItem
                href='/admin/media'
                icon={<ImageIcon size={17} />}
                label='จัดการรูปภาพ'
                active={pathname === '/admin/media'}
                onClick={onClose}
              />
            </nav>
          </div>

          <div>
            <h3 className='px-3 text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em] mb-2 mt-2'>
              Account & Security
            </h3>

            <nav className='space-y-0.5'>
              {canManageUsers ? (
                <NavItem
                  href='/admin/users'
                  icon={<Users size={17} />}
                  label='จัดการผู้ใช้งาน'
                  active={pathname.includes('/admin/users')}
                  onClick={onClose}
                />
              ) : (
                <DisabledNavItem
                  icon={<Users size={17} />}
                  label='จัดการผู้ใช้งาน'
                />
              )}

              <NavItem
                href='/admin/change-password'
                icon={<KeyRound size={17} />}
                label='เปลี่ยนรหัสผ่าน'
                active={pathname === '/admin/change-password'}
                onClick={onClose}
              />
            </nav>
          </div>
        </div>

        <div className='p-2 border-t border-slate-100 bg-slate-50/40 space-y-1.5'>
          <div className='flex items-center gap-2 px-1'>
            <div className='w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-[11px] font-bold shrink-0'>
              {username ? username.charAt(0).toUpperCase() : 'U'}
            </div>

            <div className='min-w-0 leading-none'>
              <p className='text-[9px] text-slate-400'>Signed in as</p>
              <p className='text-[11px] font-semibold text-slate-800 truncate mt-0.5'>
                {username || 'Not Logged In'}
              </p>
            </div>
          </div>

          <SignOutButton />
        </div>
      </aside>
    </>
  );
}

function NavItem({
  href,
  icon,
  label,
  active,
  onClick,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={clsx(
        'flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] font-semibold transition-all duration-200',
        active
          ? 'bg-indigo-50 text-indigo-700 shadow-sm shadow-indigo-100/50'
          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
      )}
    >
      <span className={clsx(active ? 'text-indigo-600' : 'text-slate-400')}>
        {icon}
      </span>

      {label}

      {active && (
        <div className='ml-auto w-1 h-3 rounded-full bg-indigo-600 animate-in fade-in slide-in-from-right-1' />
      )}
    </Link>
  );
}

function SubNavItem({
  href,
  label,
  active,
  onClick,
}: {
  href: string;
  label: string;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={clsx(
        'flex items-center gap-2 px-3 py-1.5 rounded-lg text-[12px] transition-all duration-200',
        active
          ? 'text-indigo-600 font-bold bg-indigo-50/30'
          : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50',
      )}
    >
      <ChevronRight
        size={12}
        className={clsx(
          'transition-transform',
          active ? 'rotate-90 text-indigo-500' : 'text-slate-300',
        )}
      />

      {label}
    </Link>
  );
}
