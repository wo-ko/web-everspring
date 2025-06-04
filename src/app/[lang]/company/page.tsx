"use client";
import { useThemeContext } from "@app/context/theme-context";
import { ILayoutProp } from "@app/types/context";
import { displayComponentPattern } from "@app/utils/golbal";
import SideImageLayout from "../components/side-Image-layout";

export default function CompanyPage() {
  const { themeLayout, themeContent } = useThemeContext();

  console.log("theme", themeContent);
  return (
    <div>
      {/* {themeLayout.about.map((row: ILayoutProp) => {
        return <div>{displayComponentPattern(row, themeContent.about)}</div>;
      })} */}
      <SideImageLayout
        imageSrc="https://lh3.googleusercontent.com/proxy/m-VEe3aIeFdjGFGgfviEdDNa9tLkjhRyyccb2lOjC5HDoVaQo2X09Va9xWNt-ftRpF0Kf_39vjAhm3eOpobN9Xx7nN0Vig"
        title="เนื้อหา"
        content="เนื้อหา"
        reverse={false}
        imageWidth="w-64"
        imageHeight="h-64"
      />
    </div>
  );
}
