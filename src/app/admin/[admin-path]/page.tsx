'use client';

import { useParams, notFound } from 'next/navigation';
import ImageManager from './(components)/ImageManager';
import AdminPatternRenderer from './(components)/AdminPatternRenderer';
import MasterImageManager from './(components)/MasterImageManager';

const ALLOWED_PAGES = [
  'home',
  'about',
  'company',
  'product',
  'news',
  'contact',
  'media',
] as const;

type AdminPageKey = (typeof ALLOWED_PAGES)[number];

export default function AdminDynamicPage() {
  const params = useParams();
  const pageKey = params['admin-path'] as string;

  // กัน path แปลก
  if (!ALLOWED_PAGES.includes(pageKey as AdminPageKey)) {
    notFound();
  }

  return (
    <div className='space-y-6'>
      <header>
        <h1 className='text-2xl font-bold capitalize'>จัดการหน้า: {pageKey}</h1>
        <p className='text-sm text-gray-500'>URL: /admin/{pageKey}</p>
      </header>

      <section className='space-y-8'>
        <PageContent pageKey={pageKey as AdminPageKey} />
      </section>
    </div>
  );
}

function PageContent({ pageKey }: { pageKey: AdminPageKey }) {
  switch (pageKey) {
    case 'home':
    case 'about':
    case 'company':
    case 'product':
    case 'contact':
    case 'news':
      return (
        <div className='bg-white rounded-xl border p-6 space-y-4'>
          <h2 className='text-lg font-semibold'>Preview หน้าเว็บ</h2>
          <AdminPatternRenderer pageName={pageKey} />
        </div>
      );
    case 'media':
      return (
        <div>
          <div className='bg-white rounded-xl border p-6 space-y-4'>
            <MasterImageManager />
          </div>
        </div>
      );
    default:
      return null;
  }
}
