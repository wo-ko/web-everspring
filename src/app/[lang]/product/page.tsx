"use client";
import { ThemeContext, useThemeContext } from "@app/context/theme-context";
import { useContext } from "react";
import Footer from "../components/foo-ter";
import ContactCompany from "../components/contact-company";
import AllProduct from "./all/page";

export default function Product() {
  const { lang } = useContext(ThemeContext);
  const { themeColor1 } = useThemeContext();

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* รายการสินค้า */}
      <AllProduct />
    </section>
  );
}
