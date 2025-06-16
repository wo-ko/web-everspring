'use client';
import { ThemeContext, useThemeContext } from '@app/context/theme-context';
import { useContext } from "react";
import ProductList from '@app/[lang]/components/product-list';

const DataPlant = [
    "ethephon 52% SL",
    "gibberellic acid 4% W/V EC",
    "paclobutrazol 10% WP",
    "paclobutrazol 15% WP",
    "paclobutrazol 25% W/V SC",
];
export default function Plant() {
  const { lang } = useContext(ThemeContext);
  const { themeColor1 } = useThemeContext();

  return (
    <>
     <ProductList titles={'Plant Growth Regulators (ควบคุมการออกดอก)'} activities={DataPlant}/>
    </>
  );
}
