import { redirect } from "next/navigation";
import Head from "next/head"; // ✅ เพิ่ม
import ThemeProvider from "../context/theme-context";
import Navbar from "./components/navbar";
import Title from "./components/title";
import Footer from "./components/foo-ter";
import '../styles/globas.css';

export default async function LangLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const languagesSupport = ["th", "en"];
  const lang = (await params).lang;

  if (!languagesSupport.includes(lang)) {
    redirect("/th");
  }

  const layoutAbout = await import("./../../../public/about/layout.json").then(
    (res) => res.default
  );
  const layoutContent = await import(
    `./../../../public/about/${lang}.json`
  ).then((res) => res.default);

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </Head>

      <ThemeProvider
        defaultValue={{
          lang,
          themeLayout: {
            home: [],
            about: layoutAbout,
          },
          themeContent: {
            home: {},
            about: layoutContent,
          },
        }}
      >
        <Title />
        <Navbar />
        {children}
        <Footer />
      </ThemeProvider>
    </>
  );
}
