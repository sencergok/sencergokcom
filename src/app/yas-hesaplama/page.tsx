import YasHesaplamaClient from "./CalculatorClient";

export const metadata = {
  title: "Yaş Hesaplama Aracı | sencergok.com",
  description: "Doğum tarihinizi girin, yaşınızı hemen öğrenin. Pratik yaş hesaplama aracı.",
  keywords: "yaş hesaplama, doğum tarihi, yaş bulma, yaş hesaplama aracı",
  openGraph: {
    title: "Yaş Hesaplama Aracı",
    description: "Doğum tarihinizi girin, yaşınızı hemen öğrenin."
  }
};

export default function Page() {
  return <YasHesaplamaClient />;
} 