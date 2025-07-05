import { Suspense } from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

// Components
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ProjectsSectionContentful from '@/components/sections/ProjectsSectionContentful'
import ContactSection from '@/components/sections/ContactSection'

// Services
import { getFeaturedProjects } from '@/services/projects'

// Types
import { ProjectEntry } from '@/types/contentful'

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
  title: "Sencer Gök - Frontend & Mobil Developer | Modern App Development",
  description: "Kahve eşliğinde kod yazan, kullanıcı deneyimini önceleyerek modern uygulamalar geliştiren bir developer. App Store'da 7+ başarılı uygulama.",
  keywords: [
    "frontend developer",
    "mobil uygulama",
    "react",
    "react native", 
    "swift",
    "ios developer",
    "app store",
    "sencer gök",
    "next.js",
    "typescript",
    "ui/ux design"
  ],
  authors: [{ name: "Sencer Gök", url: "https://sencergok.com" }],
  creator: "Sencer Gök",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://sencergok.com",
    title: "Sencer Gök - Frontend & Mobil Developer",
    description: "Kahve eşliğinde kod yazan, App Store'da 7+ başarılı uygulamam var. Modern teknolojilerle harika deneyimler yaratıyorum.",
    siteName: "Sencer Gök",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sencer Gök - Frontend & Mobil Developer"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Sencer Gök - Frontend & Mobil Developer",
    description: "Kahve eşliğinde kod yazan, App Store'da 7+ başarılı uygulamam var.",
    images: ["/og-image.jpg"]
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
  alternates: {
    canonical: "https://sencergok.com"
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
export const revalidate = 3600 // Revalidate every hour
export const dynamic = 'force-static' // Enable static generation
export const fetchCache = 'force-cache' // Cache all fetch requests
