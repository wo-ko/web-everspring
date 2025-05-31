'use client';
import { ThemeContext } from '@app/context/theme-context';
import { useContext } from "react";

export default function LangPage() {
  const { lang } = useContext(ThemeContext);
  return (
    <>
      test
      {lang}
    </>
  )
}