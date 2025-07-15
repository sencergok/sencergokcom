import VucutKitleIndeksiHesaplamaClient from "./CalculatorClient";

export const metadata = {
  title: "Vücut Kitle İndeksi Hesaplama | sencergok.com",
  description: "Boy ve kilonuzu girin, vücut kitle indeksinizi (BMI) hemen öğrenin. Sağlıklı yaşam için pratik BMI hesaplama aracı.",
  keywords: "bmi, vücut kitle indeksi, kilo hesaplama, boy kilo endeksi",
  openGraph: {
    title: "Vücut Kitle İndeksi Hesaplama",
    description: "Boy ve kilonuzu girin, vücut kitle indeksinizi (BMI) hemen öğrenin."
  }
};

export default function Page() {
  return <VucutKitleIndeksiHesaplamaClient />;
} 