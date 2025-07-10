
import dynamic from "next/dynamic"
import { ComponentType, use } from "react"

export default function PatternComponents(props: {pageName: string}) {
  const pageLayout = use(fetch(`http://localhost:4000/pages/page-display/${props.pageName}`).then(res => res.json()))
  const pattern = use(fetch('http://localhost:4000/pattern-layouts').then(res => res.json()))

  const Components: ComponentType<{}>[] = pattern.reduce((result: { [key: string]: ComponentType<{}>}, item: any) => {
    return {...result, [item.patternLayoutId]: dynamic(() => import('../components/layout-pattern' + item.patternLayoutPath), {  })}
  }, {})

  const getComponent = (patternLayout: any) => {
    const Component: ComponentType<any> = Components[patternLayout.patternLayoutId]
    return <Component {...patternLayout.translation.en.translationData} />
  }
  
  return (
    <>
      {
        pageLayout?.pageLayouts.map((pageLayout: any) => (
          <>
            {getComponent(pageLayout)}
          </>
        ))
          
      }
    </>
  )
}