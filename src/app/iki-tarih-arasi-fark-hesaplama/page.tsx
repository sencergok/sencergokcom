import IkiTarihArasiFarkHesaplamaClient from "./CalculatorClient";

export const metadata = {
  title: "İki Tarih Arası Fark Hesaplama | sencergok.com",
  description: "İki tarih arasındaki gün, ay ve yıl farkını kolayca hesaplayın. Ücretsiz ve hızlı tarih hesaplama aracı.",
  keywords: "tarih farkı, gün hesaplama, iki tarih arası, tarih hesaplama aracı",
  openGraph: {
    title: "İki Tarih Arası Fark Hesaplama",
    description: "İki tarih arasındaki gün, ay ve yıl farkını kolayca hesaplayın."
  }
};

export default function Page() {
  return <IkiTarihArasiFarkHesaplamaClient />;
} 