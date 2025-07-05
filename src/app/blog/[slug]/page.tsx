import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getBlogPostBySlug, getBlogPosts } from '@/services/blog'
import BlogPost from '@/components/sections/BlogPost'
import { generateExcerpt } from '@/lib/excerpt'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  
  if (!post) {
    return {
      title: 'Blog Yazısı Bulunamadı - Sencer Gök',
      description: 'Aradığınız blog yazısı bulunamadı. Sencer Gök\'ün frontend ve mobil yazılım geliştirme üzerine diğer yazılarına göz atabilirsiniz.',
      robots: { index: false, follow: true }
    }
  }

  const { title, content, seoTitle, seoDescription, featuredImage, tags, author } = post.fields
  const publishedDate = post.sys.createdAt
  const excerpt = content ? generateExcerpt(content, 160) : 'İçerik mevcut değil'
  const finalTitle = seoTitle || `${title} - Sencer Gök Blog`
  const finalDescription = seoDescription || `${excerpt} | Sencer Gök tarafından yazılan bu yazıda ${tags?.slice(0, 3).join(', ')} konularında detaylı bilgiler bulabilirsiniz. Frontend ve mobil yazılım geliştirme deneyimleri.`

  return {
    title: finalTitle,
    description: finalDescription,
    keywords: [
      `Sencer Gök ${title.toLowerCase()}`,
      `sencer gök blog`,
      `frontend ${title.toLowerCase()}`,
      `mobil yazılım ${title.toLowerCase()}`,
      ...(tags || []).map(tag => `${tag} blog türkçe`),
      ...(tags || []).map(tag => `sencer gök ${tag.toLowerCase()}`),
      ...(tags || []).map(tag => `frontend ${tag.toLowerCase()}`),
      ...(tags || []).map(tag => `mobil yazılım ${tag.toLowerCase()}`),
      "yazılım geliştirme blog",
      "frontend blog",
      "mobil yazılım blog",
      "react blog",
      "ios geliştirme",
      "frontend developer blog",
      "mobil yazılım geliştirici blog"
    ],
    authors: [
      { name: author || "Sencer Gök", url: "https://sencergok.com" },
      { name: "Sencer", url: "https://sencergok.com/blog" }
    ],
    creator: author || "Sencer Gök",
    publisher: "Sencer Gök",
    category: "Technology Article",
    openGraph: {
      type: "article",
      locale: "tr_TR",
      url: `https://sencergok.com/blog/${slug}`,
      title: finalTitle,
      description: finalDescription,
      publishedTime: publishedDate,
      modifiedTime: post.sys.updatedAt,
      authors: [author || "Sencer Gök"],
      section: "Technology",
      tags: tags || [],
      images: featuredImage && featuredImage.fields.file ? [
        {
          url: `https:${featuredImage.fields.file.url}`,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          width: (featuredImage.fields.file.details as any)?.image?.width,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          height: (featuredImage.fields.file.details as any)?.image?.height,
          alt: String(featuredImage.fields.title) || `${title} - Sencer Gök`
        }
      ] : [
        {
          url: "/og-sencer-gok-blog.jpg",
          width: 1200,
          height: 630,
          alt: `${title} - Sencer Gök Blog`
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description: finalDescription,
      images: featuredImage && featuredImage.fields.file ? [`https:${featuredImage.fields.file.url}`] : ["/og-sencer-gok-blog.jpg"],
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
      "article:author": author || "Sencer Gök",
      "article:published_time": publishedDate,
      "article:modified_time": post.sys.updatedAt,
      "article:section": "Technology",
      "article:tag": tags?.join(', ') || '',
      "blog-author": "Sencer Gök",
      "content-language": "tr-TR",
      "article-topics": "Frontend Development, Mobil Yazılım, React, iOS Development",
      "author-expertise": "Frontend Developer & Mobil Yazılım Geliştirici"
    },
    alternates: {
      canonical: `https://sencergok.com/blog/${slug}`
    }
  }
}

// Generate static params for build time
export async function generateStaticParams() {
  try {
    const posts = await getBlogPosts()
    return posts.map((post) => ({
      slug: post.fields.slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

// Main Blog Post Page Component
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  // Tüm blog yazılarını al (son yazılar için)
  const allPosts = await getBlogPosts()

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <BlogPost post={post} allPosts={allPosts} />
    </main>
  )
}

// ISR Configuration
export const revalidate = 3600 // Revalidate every hour
export const dynamic = 'force-static' 