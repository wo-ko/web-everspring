import { useThemeContext } from "@app/context/theme-context";

export default function TextTitle(props: { text?: string }) {
  // const { themeColor1 } = useThemeContext();
  // console.log("TextTitle props:", themeColor1);
  return (
    <h2 className={`font-black pt-3 text-green-600`}>
         {props?.text}
    </h2>
  )
}