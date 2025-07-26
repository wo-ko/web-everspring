"use client";
import { useThemeContext } from "@app/context/theme-context";
import dynamic from "next/dynamic";
import {
  ComponentType,
  Fragment,
  useCallback,
  useEffect,
  useState,
} from "react";

export default function PatternComponents(props: { pageName: string }) {
  const { lang } = useThemeContext();
  const [pageLayout, setPageLayout] = useState<any>({});
  const [pattern, setPattern] = useState([]);
  const [Components, setComponents] = useState<ComponentType<any>[]>();
  const [productCategories, setProductCategories] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const _pageLayout = await fetch(`http://localhost:4000/pages/page-display/${pageName}`).then(res => res.json())
  //     const _pattern = await fetch('http://localhost:4000/pattern-layouts').then(res => res.json())

  //     setPageLayout(_pageLayout);
  //     setPattern(_pattern);

  //     setComponents(_pattern.reduce((result: { [key: string]: ComponentType<{}> }, item: any) => {
  //       return { ...result, [item.patternLayoutId]: dynamic(() => import('../components/layout-pattern' + item.patternLayoutPath), {}) }
  //     }, {}))
  //   }
  //   fetchData();
  // }, [])

  useEffect(() => {
    const fetchData = async () => {
      const _pageLayout = await fetch(`http://localhost:4000/pages/page-display/${pageName}`).then(res => res.json())
      const _pattern = await fetch('http://localhost:4000/pattern-layouts').then(res => res.json())
      const _productCategories = await fetch('http://localhost:4000/product-category').then(res => res.json()) 
      setPageLayout(_pageLayout);
      setPattern(_pattern);
      setProductCategories(_productCategories); 
      setComponents(_pattern.reduce((result: { [key: string]: ComponentType<{}> }, item: any) => {
        // ทำความสะอาด path ก่อน (ตัด / นำหน้าออกถ้ามี)
        const cleanPath = item.patternLayoutPath.startsWith('/')
          ? item.patternLayoutPath.slice(1)
          : item.patternLayoutPath
        // รวม path แบบถูกต้องโดยใช้ template literal และเติม / คั่น
        return {
          ...result,
          [item.patternLayoutId]: dynamic(() => import(`../components/layout-pattern/${cleanPath}`), {})
        }
      }, {}))
    }
    fetchData();
  }, []);

  const { pageName } = props;
  // const getComponent = useCallback((patternLayout: any) => {
  //   if (!Components) return null;

  //   const Component: ComponentType<any> = Components[patternLayout.patternLayoutId]
  //   return <Component {...patternLayout.translation[lang]} />
  // }, [pageLayout, pattern,productCategories, Components])
    const getComponent = useCallback((pageLayout: any) => {
    if (!Components || !pageLayout.patternLayoutId) return null;

    const Component = Components[pageLayout.patternLayoutId];
    if (!Component) return null;

    return <Component {...pageLayout.translation[lang]} categories={productCategories} />;
  }, [Components, lang,pageLayout, productCategories]);

  return (
    <>
      {
        pageLayout?.pageLayouts?.map((pageLayout: any, index: number) => (
          <Fragment key={`components-${pageName}-${index}`}>
            {getComponent(pageLayout)}
          </Fragment>
        ))
      }
    </>
  );
}
