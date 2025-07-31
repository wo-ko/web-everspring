'use client';
import { ThemeContext, useThemeContext } from '@app/context/theme-context';
import { useContext } from "react";
// import Footer from '../components/foo-ter';
import ContactCompany from '../components/contact-company';
import PatternComponents from '@app/components/pattern-components';

export default function LangPage() {
  const { lang } = useContext(ThemeContext);
  const { themeColor1 } = useThemeContext();

  return (
    <>
    <PatternComponents pageName="contact"/>
    {/* <ContactCompany/> */}
    </>
  );
}
