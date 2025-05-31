'use server';

import ThemeProvider from '../context/theme-context';
import Navbar from './components/navbar';
import Title from './components/title';

export default async function LangLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {

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
    </ThemeProvider>
  )
}