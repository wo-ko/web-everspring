'use client';
import { ThemeContext } from '@app/context/theme-context';
import Link from "next/link";
import { useContext } from 'react';

export default function Navbar() {
  const { lang } = useContext(ThemeContext);
  return (
    <div className='flex justify-between px-16 bg-blue-500'>
      <Link href={`/${lang}`}>หน้าหลัก</Link>
      <Link href={`/${lang}/about`}>เกี่ยวกับเอเวอร์</Link>
      <Link href={`${lang}/`}>บริษัทในเครือ</Link>
    </div>
  )
}