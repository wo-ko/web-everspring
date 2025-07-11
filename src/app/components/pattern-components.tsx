"use client";
import { useThemeContext } from "@app/context/theme-context";
import dynamic from "next/dynamic"
import {
  ComponentType,
  Fragment,
  useCallback,
  useEffect,
  useState
} from "react"

export default function PatternComponents(props: { pageName: string }) {
  const { lang } = useThemeContext();
  const [pageLayout, setPageLayout] = useState<any>({});
  const [pattern, setPattern] = useState([]);
  const [Components, setComponents] = useState<ComponentType<any>[]>();
  useEffect(() => {
    const fetchData = async () => {
      const _pageLayout = await fetch(`http://localhost:4000/pages/page-display/${pageName}`).then(res => res.json())
      const _pattern = await fetch('http://localhost:4000/pattern-layouts').then(res => res.json())

      setPageLayout(_pageLayout);
      setPattern(_pattern);

      setComponents(_pattern.reduce((result: { [key: string]: ComponentType<{}> }, item: any) => {
        return { ...result, [item.patternLayoutId]: dynamic(() => import('../components/layout-pattern' + item.patternLayoutPath), {}) }
      }, {}))
    }
    fetchData();
  }, [])

  const { pageName } = props;
  const getComponent = useCallback((patternLayout: any) => {
    if (!Components) return null;

    const Component: ComponentType<any> = Components[patternLayout.patternLayoutId]
    return <Component {...patternLayout.translation[lang]} />
  }, [pageLayout, pattern, Components])



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
  )
}