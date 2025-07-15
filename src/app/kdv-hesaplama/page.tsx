import KdvHesaplamaClient from "./CalculatorClient";

export const metadata = {
  title: "KDV Hesaplama | sencergok.com",
  description: "Tutar ve KDV oranını girin, KDV ve toplam tutarı hemen hesaplayın. Pratik KDV hesaplama aracı.",
  keywords: "kdv hesaplama, kdv oranı, kdv tutarı, kdv dahil",
  openGraph: {
    title: "KDV Hesaplama",
    description: "Tutar ve KDV oranını girin, KDV ve toplam tutarı hemen hesaplayın."
  }
};

export default function Page() {
  return <KdvHesaplamaClient />;
} 