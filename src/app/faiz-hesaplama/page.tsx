import FaizHesaplamaClient from "./CalculatorClient";

export const metadata = {
  title: "Faiz Hesaplama | sencergok.com",
  description: "Anapara, faiz oranı, vade, vergi oranı ve vade tipi girin, toplam faiz ve geri ödeme tutarını hemen hesaplayın. Pratik faiz hesaplama aracı.",
  keywords: "faiz hesaplama, kredi faizi, faiz oranı, faiz tutarı, vergi, vade, gün, ay",
  openGraph: {
    title: "Faiz Hesaplama",
    description: "Anapara, faiz oranı, vade, vergi oranı ve vade tipi girin, toplam faiz ve geri ödeme tutarını hemen hesaplayın."
  }
};

export default function Page() {
  return <FaizHesaplamaClient />;
} 