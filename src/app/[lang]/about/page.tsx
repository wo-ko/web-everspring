"use client";
import { useThemeContext } from "@app/context/theme-context";
import { ILayoutProp } from "@app/types/context";
import { displayComponentPattern } from "@app/utils/golbal";

export default function AboutPage() {
  const { themeLayout, themeContent } = useThemeContext();

  return (
    <div>
      {themeLayout.about.map((row: ILayoutProp) => {
        return <div>{displayComponentPattern(row, themeContent.about)}</div>;
      })}
    </div>
  );
}
