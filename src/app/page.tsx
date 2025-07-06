import { Suspense } from 'react'
import { Metadata } from 'next'

// Components
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ProjectsSectionContentful from '@/components/sections/ProjectsSectionContentful'
import ContactSection from '@/components/sections/ContactSection'

// Services
import { getFeaturedProjects } from '@/services/projects'

// Types (sadece ihtiyaç duyulanlar için)

// Loading Components
function ProjectsLoading() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="w-24 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mx-auto mb-4"></div>
          <div className="w-96 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mx-auto mb-6"></div>
          <div className="w-full max-w-3xl h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
              <div className="p-6 space-y-4">
                <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="w-3/4 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="w-1/2 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Projects Section with Error Boundary
async function ProjectsSection() {
  try {
    const projects = await getFeaturedProjects()
    
    return (
      <ProjectsSectionContentful 
        projects={projects}
        title="Hayallerimi Kodladığım Uygulamalar"
        description="Kahve molalarında düşündüğüm fikirleri gerçeğe dönüştürdüm! App Store'da uygulamamla binlerce kişinin günlük hayatını kolaylaştırıyorum."
        showAllProjectsLink={true}
      />
    )
  } catch (error) {
    console.error('Error loading projects:', error)
    
    // Fallback component
    return (
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Projelerim Yükleniyor...
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Contentful&apos;dan veriler çekilirken bir sorun oluştu. Lütfen daha sonra tekrar deneyin.
          </p>
          <div className="bg-white dark:bg-gray-900 rounded-lg p-8 max-w-md mx-auto shadow-lg">
            <div className="text-6xl mb-4">🚧</div>
            <p className="text-gray-500 dark:text-gray-400">
              Şu anda sistemde bakım yapılıyor olabilir.
            </p>
          </div>
        </div>
      </section>
    )
  }
}

// Metadata for SEO
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
    "ui/ux developer",
    "javascript developer",
    "web tasarım",
    "frontend teknolojileri",
    "mobil app developer",
    "ankara frontend developer",
    "ankara mobil yazılım",
    "türkiye frontend developer",
    "türkiye mobil yazılım",
    "ios app developer turkey",
    "react native turkey",
    "frontend developer ankara",
    "mobil yazılım ankara"
  ],
  authors: [
    { name: "Sencer Gök", url: "https://sencergok.com" },
    { name: "Sencer", url: "https://sencergok.com" }
  ],
  creator: "Sencer Gök",
  publisher: "Sencer Gök",
  applicationName: "Sencer Gök Portfolio",
  category: "Technology",
  classification: "Business",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://sencergok.com",
    title: "Sencer Gök - Frontend Developer & Mobil Yazılım Geliştirici",
    description: "Sencer Gök - Frontend ve mobil yazılım uzmanı. React, React Native, Swift ile App Store'da 7+ uygulama, 10K+ kullanıcı. Modern web arayüzleri ve mobil çözümler geliştiren deneyimli developer.",
    siteName: "Sencer Gök Portfolio",
    images: [
      {
        url: "/og-sencer-gok.jpg",
        width: 1200,
        height: 630,
        alt: "Sencer Gök - Frontend Developer & Mobil Yazılım Geliştirici"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Sencer Gök - Frontend Developer & Mobil Yazılım Geliştirici",
    description: "Frontend ve mobil yazılım uzmanı Sencer Gök. React, React Native, Swift ile App Store'da 7+ uygulama geliştirdi, 10K+ kullanıcıya ulaştı.",
    images: ["/og-sencer-gok.jpg"],
    creator: "@sencerdev",
    site: "@sencerdev"
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Google Search Console
    yandex: "your-yandex-verification-code", // Yandex Webmaster
  },
  other: {
    "name": "Sencer Gök",
    "profession": "Frontend Developer & Mobil Yazılım Geliştirici",
    "location": "Ankara, Türkiye",
    "skills": "Frontend Development, Mobil Yazılım, React, React Native, Swift, Next.js, TypeScript, iOS Development",
    "experience": "3+ yıl frontend ve mobil yazılım geliştirme deneyimi",
    "projects": "7+ App Store uygulaması, 10K+ kullanıcı, Modern web arayüzleri",
    "specialties": "Frontend teknolojileri, Mobil uygulama geliştirme, UI/UX tasarım"
  },
  alternates: {
    canonical: "https://sencergok.com",
    languages: {
      'tr-TR': 'https://sencergok.com',
      'en-US': 'https://sencergok.com/en'
    }
  }
}

// Main Page Component
export default function HomePage() {
  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <AboutSection />

      {/* Projects Section with Suspense */}
      <Suspense fallback={<ProjectsLoading />}>
        <ProjectsSection />
      </Suspense>

      {/* Contact Section */}
      <ContactSection />
    </main>
  )
}

// ISR Configuration (Next.js 15)
export const revalidate = 30 // Revalidate every hour
export const dynamic = 'force-static' // Enable static generation
export const fetchCache = 'force-cache' // Cache all fetch requests
