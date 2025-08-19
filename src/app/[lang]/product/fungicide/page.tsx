'use client';
import { ThemeContext, useThemeContext } from "@app/context/theme-context";
import { useContext } from "react";
import ProductList from "@app/[lang]/components/product-list";

export const diseaseControlProducts = [
  "azoxystrobin 25% W/V SC",
  "azoxystrobin 50% WG",
  "benomyl 50% WP",
  "carbendazim 50% SC",
  "chlorothalonil 50% SC",
  "chlorothalonil 75% WP",
  "difenoconazole+azoxystrobin 12.5%+20% SC",
  "difenoconazole+propiconazole 15%+15% EC",
  "dimethomorp+mancozeb 9%+60% WP",
  "dimethomorp+pyraclostrobin 12%+6.7% WG",
  "dimethomorph 50% WG",
  "epoxiconazole 12.5% W/V SC",
  "fluazinam 50% W/V SC",
  "fosetyl-aluminium 80% WG",
  "hexaconazole 5% W/V SC",
  "iprodione 50% WP",
  "kasugamycin 2% SL",
  "mancozeb 80% WP",
  "metalaxyl 35% DS",
  "myclobutanil 24% EC",
  "procloraz 45% W/V EW",
  "propamocarb hydrochloride + metalaxyl 10% + 15% WP",
  "propamocarb hydrochloride 72.2% SL",
  "propineb 70% WP",
  "pyraclostrobin + epoxiconazole 13.3% + 5% W/V SE",
  "pyraclostrobin 25% W/V EC",
  "tebuconazole 43% W/V SC",
  "tetraconazole 4% W/V EW",
  "thiophanate-methyl 70% WP",
  "tricyclazole 75% WP",
  "tricyclazole+propiconazole 40%+12.5% W/V SE",
  "trifloxystrobin+tebuconazole 25%+50% WG",
];

interface Props {
  sortOrder: 'asc' | 'desc';
}

export default function Fungicide({ sortOrder }: Props) {
  const { lang } = useContext(ThemeContext);
  const { themeColor1 } = useThemeContext();

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <ProductList
        titles={"Fungicide (โรคพืช)"}
        activities={diseaseControlProducts}
        sortOrder={sortOrder} // ให้ ProductList ทำการ sort
      />
    </section>
  );
}
