'use client';
import ProductList from '@app/[lang]/components/product-list';
import { ThemeContext, useThemeContext } from '@app/context/theme-context';
import { useContext } from "react";

const DataMollus = [
    "metaldehyde 5% GB",
];
export default function Mollus() {
  const { lang } = useContext(ThemeContext);
  const { themeColor1 } = useThemeContext();

  return (
       <>
      <ProductList titles={'Molluscicide (หอย)'} activities={DataMollus}/>
    </>
  );
}
