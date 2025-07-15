import KalanGunHesaplamaClient from "./CalculatorClient";

export const metadata = {
  title: "Kalan Gün Hesaplama | sencergok.com",
  description: "Belirli bir tarihe kaç gün kaldığını kolayca hesaplayın. Ücretsiz kalan gün hesaplama aracı.",
  keywords: "kalan gün, gün hesaplama, tarih hesaplama, kalan süre",
  openGraph: {
    title: "Kalan Gün Hesaplama",
    description: "Belirli bir tarihe kaç gün kaldığını kolayca hesaplayın."
  }
};

export default function Page() {
  return <KalanGunHesaplamaClient />;
} 