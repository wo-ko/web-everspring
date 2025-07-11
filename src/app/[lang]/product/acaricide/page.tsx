'use client';
import { ThemeContext, useThemeContext } from '@app/context/theme-context';
import { useContext } from "react";
import ProductList from '@app/[lang]/components/product-list';

 const DataAcaricide = [
    "amitraz 20% W/V EC",
    "fenpyroximate 5% W/V SC",
    "fenpyroximate 5% W/V SC",
    "hexythiazox 1.8% W/V EC",
    "pyridaben 13.5% W/V EC",
    "pyridaben 20% WP",
    "spirodiclofen 24% W/V SC"
  ];

export default function Acaricide() {
  const { lang } = useContext(ThemeContext);
  const { themeColor1 } = useThemeContext();
 
  return (
    <>
     <ProductList titles={'Acaricide (ไร)'} activities={DataAcaricide}/>
    </>
  );
}
