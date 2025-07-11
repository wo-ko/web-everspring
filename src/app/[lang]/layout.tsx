'use server';

import { redirect } from 'next/navigation';
import ThemeProvider from '../context/theme-context';
import Navbar from './components/navbar';
import Title from './components/title';
import Footer from './components/foo-ter';

export default async function LangLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const languagesSupport = ['th', 'en'];
  const lang = ((await params).lang);

  if(!languagesSupport.includes(lang)){
    redirect('/th');
  }

  const layoutAbout = await import('./../../../public/about/layout.json').then((res) => res.default);
  const layoutContent = await import(`./../../../public/about/${(await params).lang}.json`).then((res) => res.default);
  
  return (
    <ThemeProvider defaultValue={{
      lang: (await params).lang,
      themeLayout: {
        home: [],
        about: layoutAbout
      },
      themeContent: {
        home: {},
        about: layoutContent
      }
    }} >
      <Title />
      <Navbar />
      {children}
      <Footer/>
    </ThemeProvider>
  )
}