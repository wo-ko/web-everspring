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
import SignOutButton from './SignOutButton';

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
  return (
    <>
      {/* Mobile Overlay */}
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
        {/* Header - ลดความสูงลงเล็กน้อย */}
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

        {/* Navigation Content - ปรับ Spacing ให้กระชับขึ้น */}
        <div className='flex-1 overflow-y-auto py-4 px-3 space-y-5 custom-scrollbar'>
          {/* Main Content Group */}
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
              />
              <NavItem
                href='/admin/about'
                icon={<Info size={17} />}
                label='เกี่ยวกับเรา'
                active={pathname === '/admin/about'}
              />
              <NavItem
                href='/admin/company'
                icon={<Building2 size={17} />}
                label='บริษัทในเครือ'
                active={pathname === '/admin/company'}
              />
              <NavItem
                href='/admin/product'
                icon={<Package size={17} />}
                label='ผลิตภัณฑ์'
                active={pathname === '/admin/product'}
              />

              {/* News Section Grouped */}
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
                  />
                  <SubNavItem
                    href='/admin/news?type=events'
                    label='กิจกรรม'
                    active={pathname === '/admin/news' && type === 'events'}
                  />
                  <SubNavItem
                    href='/admin/news?type=career'
                    label='ตำแหน่งงาน'
                    active={pathname === '/admin/news' && type === 'career'}
                  />
                </div>
              </div>

              <NavItem
                href='/admin/contact'
                icon={<MessageSquare size={17} />}
                label='ติดต่อเรา'
                active={pathname === '/admin/contact'}
              />
            </nav>
          </div>

          {/* Assets Group */}
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
              />
            </nav>
          </div>
          <div>
            <h3 className='px-3 text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em] mb-2 mt-2'>
              Account & Security
            </h3>
            <nav className='space-y-0.5'>
              <NavItem
                href='/admin/users'
                icon={<Users size={17} />}
                label='จัดการผู้ใช้งาน'
                active={pathname.includes('/admin/users')}
              />
              <NavItem
                href='/admin/change-password'
                icon={<KeyRound size={17} />}
                label='เปลี่ยนรหัสผ่าน'
                active={pathname === '/admin/change-password'}
              />
            </nav>
          </div>
        </div>

        {/* Footer - Sign Out */}
        <div className='p-3 border-t border-slate-50 bg-slate-50/30'>
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
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
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
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
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
