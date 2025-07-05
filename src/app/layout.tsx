import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sencer Gök - Frontend & Mobil Developer",
  description: "Frontend ve mobil uygulama geliştirme konusunda uzman Sencer Gök'ün kişisel web sitesi. React, Next.js, React Native ve Swift ile modern uygulamalar geliştiriyorum.",
  keywords: ["frontend developer", "mobil uygulama", "react", "react native", "swift", "ios developer", "app store", "sencer gök"],
  authors: [{ name: "Sencer Gök" }],
  creator: "Sencer Gök",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://sencergok.com",
    title: "Sencer Gök - Frontend & Mobil Developer",
    description: "Frontend ve mobil uygulama geliştirme konusunda uzman. App Store'da 7+ başarılı uygulamam var.",
    siteName: "Sencer Gök",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sencer Gök - Frontend & Mobil Developer",
    description: "Frontend ve mobil uygulama geliştirme konusunda uzman. App Store'da 7+ başarılı uygulamam var.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
