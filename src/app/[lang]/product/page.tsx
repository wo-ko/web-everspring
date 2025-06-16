'use client';
import { ThemeContext, useThemeContext } from '@app/context/theme-context';
import { useContext } from "react";
import Footer from '../components/foo-ter';
import ContactCompany from '../components/contact-company';
import AllProduct from './all/page';

export default function Product() {
  const { lang } = useContext(ThemeContext);
  const { themeColor1 } = useThemeContext();

  return (
    <>
    <AllProduct/>
    </>
  );
}
