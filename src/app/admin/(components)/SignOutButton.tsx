'use client';

import { useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';

export default function SignOutButton() {
  const { data: session, status } = useSession();

  // ถ้า session หมดอายุเอง ให้ลบ localStorage อัตโนมัติ
  useEffect(() => {
    if (status === 'unauthenticated') {
      localStorage.removeItem('user');
    }
  }, [status]);

  if (status !== 'authenticated') return null;

  // กด Logout แล้วลบทันที
  const handleLogout = async () => {
    localStorage.removeItem('user');

    await signOut({
      callbackUrl: '/admin',
    });
  };

  return (
    <div className='border-t pt-4 space-y-2'>
      <div className='text-sm text-gray-600 truncate'>
        {session.user?.email}
      </div>

      <button
        onClick={handleLogout}
        className='w-full text-left px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 font-medium'
      >
        Sign out
      </button>
    </div>
  );
}
