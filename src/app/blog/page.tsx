import { Suspense } from 'react'
import { Metadata } from 'next'
import { getBlogPosts } from '@/services/blog'
import BlogList from '@/components/sections/BlogList'

// Loading Component
function BlogLoading() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
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

// Blog Content Component
async function BlogContent() {
  try {
    const posts = await getBlogPosts()
    
    return <BlogList posts={posts} />
  } catch (error) {
    console.error('Error loading blog content:', error)
    
    return (
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Blog Yazıları Yükleniyor...
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Contentful&apos;dan veriler çekilirken bir sorun oluştu. Lütfen daha sonra tekrar deneyin.
          </p>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md mx-auto shadow-lg">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-gray-500 dark:text-gray-400">
              Blog yazıları yakında gelecek!
            </p>
          </div>
        </div>
      </section>
    )
  }
}

// Metadata for SEO
export const metadata: Metadata = {
  title: "Blog - Sencer Gök | Frontend ve Mobil Yazılım Geliştirme, React, iOS Teknoloji Yazıları",
  description: "Sencer Gök'ün frontend ve mobil yazılım geliştirme blog'u. React, React Native, Swift, iOS, Next.js ve modern web teknolojileri hakkında deneyimler, ipuçları ve öğreticiler. Frontend ve mobil uygulama geliştirme rehberleri.",
  keywords: [
    "Sencer Gök blog",
    "sencer gök yazıları", 
    "Sencer blog",
    "frontend blog türkçe",
    "mobil yazılım blog",
    "frontend geliştirme blog",
    "react blog türkçe",
    "ios geliştirme blog",
    "react native blog",
    "swift blog türkçe",
    "frontend developer blog",
    "mobil yazılım geliştirici blog",
    "next.js blog",
    "typescript blog",
    "mobil uygulama blog",
    "app store geliştirme",
    "yazılım geliştirme blog",
    "teknoloji blog türkçe",
    "web geliştirme blog",
    "frontend teknolojileri blog",
    "sencer gök teknoloji",
    "sencer gök frontend",
    "sencer gök mobil yazılım",
    "turkey developer blog",
    "ankara developer blog",
    "frontend blog ankara",
    "mobil yazılım blog türkçe"
  ],
  authors: [
    { name: "Sencer Gök", url: "https://sencergok.com" },
    { name: "Sencer", url: "https://sencergok.com/blog" }
  ],
  creator: "Sencer Gök",
  publisher: "Sencer Gök",
  category: "Technology Blog",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://sencergok.com/blog",
    title: "Blog - Sencer Gök | Frontend ve Mobil Yazılım Teknoloji Yazıları",
    description: "Sencer Gök'ün frontend ve mobil yazılım geliştirme, React, iOS ve teknoloji hakkında paylaştığı deneyimler ve öğreticiler. Modern web ve mobil uygulama geliştirme konularında uzman görüşler.",
    siteName: "Sencer Gök Blog",
    images: [
      {
        url: "/og-sencer-gok-blog.jpg",
        width: 1200,
        height: 630,
        alt: "Sencer Gök Blog - Frontend ve Mobil Yazılım Teknoloji Yazıları"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - Sencer Gök | Frontend ve Mobil Yazılım Teknoloji Yazıları", 
    description: "Sencer Gök'ün React, iOS, frontend ve mobil yazılım geliştirme deneyimlerini paylaştığı blog.",
    images: ["/og-sencer-gok-blog.jpg"],
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
  other: {
    "blog-author": "Sencer Gök",
    "blog-topics": "Frontend Development, Mobil Yazılım, React, React Native, Swift, iOS Development, Next.js, TypeScript",
    "blog-language": "Turkish",
    "blog-location": "Turkey, Ankara",
    "content-type": "Technology Blog",
    "blog-focus": "Frontend ve Mobil Yazılım Geliştirme"
  },
  alternates: {
    canonical: "https://sencergok.com/blog",
    types: {
      'application/rss+xml': [
        { url: 'https://sencergok.com/blog/rss.xml', title: 'Sencer Gök Blog RSS' }
      ]
    }
  }
}

// Main Blog Page Component
export default function BlogPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Blog Hero Section */}
      {/* Blog Posts Section with Suspense */}
      <Suspense fallback={<BlogLoading />}>
        <BlogContent/>
      </Suspense>
    </main>
  )
}

// ISR Configuration
export const revalidate = 30 // Revalidate every 5 minutes
export const dynamic = 'force-static' 