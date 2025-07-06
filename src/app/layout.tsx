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
  title: "Sencer Gök - Frontend Developer & Mobil Yazılım Geliştirici | React Native & Swift Uzmanı",
  description: "Sencer Gök - Frontend ve mobil yazılım geliştirme uzmanı. React, React Native, Swift ile 7+ mobil uygulama. Modern web arayüzleri ve mobil çözümler. App Store'da 10K+ kullanıcıya ulaşan projeler.",
  keywords: [
    "Sencer Gök",
    "sencer gök", 
    "Sencer",
    "sencer",
    "frontend developer",
    "mobil yazılım geliştirici",
    "mobil yazılım",
    "frontend geliştirici",
    "web frontend developer",
    "ios developer", 
    "react developer",
    "react native developer",
    "swift developer",
    "mobil uygulama geliştirici",
    "app store developer",
    "next.js developer",
    "typescript developer",
    "web tasarım",
    "frontend teknolojileri",
    "mobil app developer",
    "ankara frontend developer",
    "ankara mobil yazılım",
    "türkiye frontend developer",
    "türkiye mobil yazılım"
  ],
  authors: [
    { name: "Sencer Gök", url: "https://sencergok.com" },
    { name: "Sencer", url: "https://sencergok.com" }
  ],
  creator: "Sencer Gök",
  publisher: "Sencer Gök",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://sencergok.com",
    title: "Sencer Gök - Frontend Developer & Mobil Yazılım Geliştirici",
    description: "Sencer Gök - Frontend ve mobil yazılım uzmanı. React, React Native, Swift ile App Store'da 7+ uygulama, 10K+ kullanıcı. Modern web arayüzleri ve mobil çözümler geliştiren deneyimli developer.",
    siteName: "Sencer Gök Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sencer Gök - Frontend Developer & Mobil Yazılım Geliştirici",
    description: "Frontend ve mobil yazılım uzmanı Sencer Gök. React, React Native, Swift ile App Store'da 7+ uygulama geliştirdi, 10K+ kullanıcıya ulaştı.",
    creator: "@sencerdev"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/apple-touch-icon-precomposed.png',
    },
  },
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://sencergok.com/#person",
      "name": "Sencer Gök",
      "alternateName": ["Sencer", "sencer gök"],
      "url": "https://sencergok.com",
      "image": "https://sencergok.com/sencer-gok-photo.jpg",
      "sameAs": [
        "https://github.com/sencergok",
        "https://www.linkedin.com/in/sencergok",
        "https://x.com/sencerdev",
        "https://apps.apple.com/us/developer/sencer-gok/id1777568061"
      ],
      "jobTitle": "Frontend Developer & Mobil Yazılım Geliştirici",
      "worksFor": {
        "@type": "Organization",
        "name": "Freelance"
      },
      "alumniOf": {
        "@type": "Organization",
        "name": "Gazi Üniversitesi"
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Ankara",
        "addressCountry": "Turkey"
      },
      "knowsAbout": [
        "Frontend Development",
        "Mobil Yazılım Geliştirme",
        "React",
        "React Native", 
        "Swift",
        "iOS Development",
        "Next.js",
        "TypeScript",
        "Web Development",
        "Mobile App Development",
        "UI/UX Design",
        "Frontend Technologies"
      ],
      "hasOccupation": {
        "@type": "Occupation",
        "name": "Software Developer",
        "skills": "Frontend Development, Mobil Yazılım, React, React Native, Swift, iOS Development, Next.js, TypeScript",
        "occupationLocation": {
          "@type": "City",
          "name": "Ankara, Turkey"
        }
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://sencergok.com/#website",
      "url": "https://sencergok.com",
      "name": "Sencer Gök - Frontend Developer & Mobil Yazılım Geliştirici",
      "alternateName": "Sencer Gök Portfolio",
      "description": "Sencer Gök - Frontend Developer & Mobil Yazılım Geliştirici. React, React Native, Swift uzmanı. App Store'da 7+ uygulama.",
      "publisher": {
        "@id": "https://sencergok.com/#person"
      },
      "inLanguage": "tr-TR",
      "copyrightHolder": {
        "@id": "https://sencergok.com/#person"
      },
      "about": [
        "Frontend Development",
        "Mobil Yazılım",
        "Web Development",
        "Mobile App Development"
      ],
      "potentialAction": [
        {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://sencergok.com/blog?search={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      ]
    },
    {
      "@type": "Blog",
      "@id": "https://sencergok.com/blog/#blog",
      "url": "https://sencergok.com/blog",
      "name": "Sencer Gök Blog",
      "description": "Frontend ve mobil yazılım geliştirme, React, iOS ve teknoloji hakkında yazılar",
      "publisher": {
        "@id": "https://sencergok.com/#person"
      },
      "author": {
        "@id": "https://sencergok.com/#person"
      },
      "inLanguage": "tr-TR",
      "about": [
        "Frontend Development",
        "Mobil Yazılım",
        "Software Development",
        "React",
        "iOS Development",
        "Technology"
      ]
    }
  ]
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-grow">
          {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
