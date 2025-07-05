'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ReactNode } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types'
import { Calendar, Clock, ArrowLeft, Share2, User } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { BlogPostEntry } from '@/types/contentful'
import { generateExcerpt } from '@/lib/excerpt'

interface BlogPostProps {
  post: BlogPostEntry
  allPosts?: BlogPostEntry[]
}

export default function BlogPost({ post, allPosts = [] }: BlogPostProps) {
  // Güvenli field extraction
  const {
    title = 'Başlık Yok',
    content,
    featuredImage,
    tags = [],
    readingTime,
    author = 'Sencer Gök'
  } = post?.fields || {}
  
  // Generate excerpt from content
  const excerpt = content ? generateExcerpt(content, 160) : 'İçerik mevcut değil'
  
  const publishedDate = post?.sys?.createdAt || new Date().toISOString()

  // Debug log
  console.log('BlogPost Debug:', {
    postExists: !!post,
    fieldsExists: !!post?.fields,
    contentExists: !!content,
    contentType: typeof content,
    contentStructure: content,
    contentKeys: content ? Object.keys(content) : null,
    contentNodeType: content?.nodeType,
    contentContent: content?.content,
    title,
    hasContent: !!content?.content
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

    // Medium-style typography for reading
  const richTextOptions = {
    renderMark: {
      [MARKS.BOLD]: (text: ReactNode) => (
        <strong className="font-semibold">{text}</strong>
      ),
      [MARKS.ITALIC]: (text: ReactNode) => (
        <em className="italic">{text}</em>
      ),
      [MARKS.CODE]: (text: ReactNode) => (
        <code className="bg-gray-100 dark:bg-gray-800 text-sm px-1.5 py-0.5 rounded font-mono">
          {text}
        </code>
      ),
      [MARKS.UNDERLINE]: (text: ReactNode) => (
        <u className="underline">{text}</u>
      ),
      [MARKS.SUBSCRIPT]: (text: ReactNode) => (
        <sub className="text-xs">{text}</sub>
      ),
      [MARKS.SUPERSCRIPT]: (text: ReactNode) => (
        <sup className="text-xs">{text}</sup>
      ),
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: unknown, children: ReactNode) => (
        <p className="mb-4 text-gray-900 dark:text-gray-100 leading-7">
          {children}
        </p>
      ),
      [BLOCKS.HEADING_1]: (node: unknown, children: ReactNode) => (
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-8">
          {children}
        </h1>
      ),
      [BLOCKS.HEADING_2]: (node: unknown, children: ReactNode) => (
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-7">
          {children}
        </h2>
      ),
      [BLOCKS.HEADING_3]: (node: unknown, children: ReactNode) => (
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">
          {children}
        </h3>
      ),
      [BLOCKS.HEADING_4]: (node: unknown, children: ReactNode) => (
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 mt-5">
          {children}
        </h4>
      ),
      [BLOCKS.HEADING_5]: (node: unknown, children: ReactNode) => (
        <h5 className="text-base font-semibold text-gray-900 dark:text-white mb-2 mt-4">
          {children}
        </h5>
      ),
      [BLOCKS.HEADING_6]: (node: unknown, children: ReactNode) => (
        <h6 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 mt-4">
          {children}
        </h6>
      ),
      [BLOCKS.UL_LIST]: (node: unknown, children: ReactNode) => (
        <ul className="list-disc ml-6 mb-4 space-y-2 text-gray-900 dark:text-gray-100">
          {children}
        </ul>
      ),
      [BLOCKS.OL_LIST]: (node: unknown, children: ReactNode) => (
        <ol className="list-decimal ml-6 mb-4 space-y-2 text-gray-900 dark:text-gray-100">
          {children}
        </ol>
      ),
      [BLOCKS.LIST_ITEM]: (node: unknown, children: ReactNode) => (
        <li className="mb-2 leading-7 pl-2">{children}</li>
      ),
      [BLOCKS.QUOTE]: (node: unknown, children: ReactNode) => (
        <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 my-6 italic text-gray-700 dark:text-gray-300">
          {children}
        </blockquote>
      ),
      [BLOCKS.HR]: () => (
        <hr className="my-8 border-gray-200 dark:border-gray-700" />
      ),
      // Tablo desteği
      [BLOCKS.TABLE]: (_node: unknown, children: ReactNode) => (
        <div className="overflow-x-auto my-6">
          <table className="min-w-full table-auto border-collapse border border-gray-300 dark:border-gray-600">
            {children}
          </table>
        </div>
      ),
      [BLOCKS.TABLE_HEADER_CELL]: (_node: unknown, children: ReactNode) => (
        <th className="border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 px-4 py-2 text-left font-semibold text-gray-900 dark:text-white">
          {children}
        </th>
      ),
      [BLOCKS.TABLE_CELL]: (_node: unknown, children: ReactNode) => (
        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-900 dark:text-gray-100">
          {children}
        </td>
      ),
      [BLOCKS.TABLE_ROW]: (_node: unknown, children: ReactNode) => (
        <tr>{children}</tr>
      ),
      // Code block desteği  
      [BLOCKS.EMBEDDED_ENTRY]: () => (
        <div className="my-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400 text-sm">Embedded content</p>
        </div>
      ),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [INLINES.HYPERLINK]: (node: any, children: ReactNode) => (
        <a
          href={(node.data as { uri: string })?.uri}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          {children}
        </a>
      ),
      // Embedded asset (resim, video vs.)
      [BLOCKS.EMBEDDED_ASSET]: (node: unknown) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const asset = (node as any)?.data?.target
        if (asset?.fields?.file?.url) {
          const url = `https:${asset.fields.file.url}`
          const title = asset.fields.title || 'Embedded asset'
          const description = asset.fields.description || ''
          
          if (asset.fields.file.contentType?.startsWith('image/')) {
            return (
              <div className="my-8">
                <Image 
                  src={url} 
                  alt={title}
                  width={800}
                  height={600}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                {description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center italic">
                    {description}
                  </p>
                )}
              </div>
            )
          }
        }
        return (
          <div className="my-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg">
            <p className="text-yellow-800 dark:text-yellow-200 text-sm">
              Embedded asset yüklenemedi
            </p>
          </div>
        )
      },
    },
    // Bilinmeyen node type'lar için fallback
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fallbackRenderer: (node: any) => {
      console.warn('Unknown node type in rich text:', node.nodeType, node)
      return (
        <div className="my-4 p-4 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg">
          <p className="text-gray-600 dark:text-gray-400 text-sm font-mono">
            Unsupported content type: {node.nodeType}
          </p>
          <details className="mt-2">
            <summary className="text-xs cursor-pointer text-gray-500">Debug info</summary>
            <pre className="text-xs mt-1 text-gray-500 overflow-auto">
              {JSON.stringify(node, null, 2)}
            </pre>
          </details>
        </div>
      )
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: excerpt,
          url: window.location.href,
        })
      } catch (error) {
        console.log('Sharing failed:', error)
      }
    } else {
      await navigator.clipboard.writeText(window.location.href)
    }
  }

  // Güvenli content rendering
  const renderContent = () => {
    if (!content || !content.content) {
      return (
        <div className="max-w-2xl mx-auto">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              İçerik Yüklenemedi
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Bu blog yazısının içeriği Contentful&apos;dan yüklenemedi.
            </p>
            <details className="text-sm text-gray-500 dark:text-gray-500">
              <summary className="cursor-pointer">Debug bilgileri</summary>
              <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-800 rounded text-xs text-left">
                <p>Content exists: {!!content ? 'Yes' : 'No'}</p>
                <p>Content.content exists: {!!content?.content ? 'Yes' : 'No'}</p>
                <p>Post ID: {post?.sys?.id || 'Unknown'}</p>
                <p>Content Type: {typeof content}</p>
                <p>Content Keys: {content ? JSON.stringify(Object.keys(content)) : 'null'}</p>
                <p>Content Node Type: {content?.nodeType || 'undefined'}</p>
                <pre className="mt-2 whitespace-pre-wrap">{JSON.stringify(content, null, 2)}</pre>
              </div>
            </details>
          </div>
        </div>
      )
    }

    try {
      return (
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-xl max-w-none prose-gray dark:prose-invert prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-img:rounded-lg">
            {documentToReactComponents(content, richTextOptions)}
          </div>
        </div>
      )
    } catch (error) {
      console.error('Error rendering rich text content:', error)
      return (
        <div className="max-w-2xl mx-auto">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Render Hatası
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Blog içeriği render edilirken hata oluştu.
            </p>
            <p className="text-sm text-red-600 dark:text-red-400 mt-2 font-mono">
              {error instanceof Error ? error.message : 'Unknown error'}
            </p>
          </div>
        </div>
      )
    }
  }

  return (
    <article className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      {/* Article Content */}
      <main className="py-6">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <div className="max-w-4xl mx-auto mb-8">
            <Link href="/blog">
              <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                <ArrowLeft className="mr-2" size={16} />
                Blog&apos;a Dön
              </Button>
            </Link>
          </div>

          {/* Article Header */}
          <header className="max-w-4xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
              {title}
            </h1>
            
            {excerpt && (
              <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                {excerpt}
              </p>
            )}

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-500 mb-8">
              <div className="flex items-center gap-2">
                <User size={16} />
                <span>{author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{formatDate(publishedDate)}</span>
              </div>
              {readingTime && (
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{readingTime} dk okuma</span>
                </div>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="flex items-center gap-2 text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 p-0 h-auto"
              >
                <Share2 size={16} />
                <span>Paylaş</span>
              </Button>
            </div>
            
            {/* Featured Image - Full width and larger */}
            {featuredImage && featuredImage.fields?.file?.url && (
              <div className="mb-12">
                <div className="relative aspect-video w-full rounded-xl overflow-hidden">
                  <Image
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    src={`https:${(featuredImage.fields.file as any).url}`}
                    alt={String(featuredImage.fields?.title || title || 'Blog image')}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            )}
          </header>

          {/* Article Body - Wider content */}
          <div className="mb-16">
            {renderContent()}
          </div>

          {/* Tags Section - Bottom of Article */}
          {tags && tags.length > 0 && (
            <div className="max-w-4xl mx-auto mb-16">
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="text-blue-600 dark:text-blue-400">#</span>
                  Etiketler
                </h3>
                <div className="flex flex-wrap gap-3">
                  {tags.map((tag, index) => (
                    <Badge
                      key={`${tag}-${index}`}
                      variant="secondary"
                      className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-800 px-4 py-2 text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 hover:scale-105 transition-all duration-200 cursor-pointer"
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                  Bu konular hakkında daha fazla yazı okumak için blog sayfamı ziyaret edebilirsiniz.
                </p>
              </div>
            </div>
          )}

          {/* Related Posts */}
          {(() => {
            // Mevcut yazı dışında son 3 yazıyı al
            const relatedPosts = allPosts
              .filter(p => p.sys.id !== post.sys.id)
              .slice(0, 3)
            
            if (relatedPosts.length === 0) {
              return (
                <footer className="max-w-4xl mx-auto pt-12 border-t border-gray-200 dark:border-gray-800">
                  <div className="text-center">
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Bu yazıyı beğendiyseniz, diğer yazılarıma da göz atabilirsiniz.
                    </p>
                    <Link href="/blog">
                      <Button variant="outline" size="lg" className="mb-4">
                        Tüm Yazıları Görüntüle
                      </Button>
                    </Link>
                  </div>
                </footer>
              )
            }

            return (
              <footer className="max-w-4xl mx-auto pt-12 border-t border-gray-200 dark:border-gray-800">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Son Yazılarım
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Bu yazıyı beğendiyseniz, diğer yazılarıma da göz atabilirsiniz.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.sys.id}
                      href={`/blog/${relatedPost.fields.slug}`}
                      className="group"
                    >
                      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105">
                        {/* Featured Image */}
                        {relatedPost.fields.featuredImage && (
                          <div className="relative h-40 overflow-hidden">
                            <Image
                              src={`https:${String(relatedPost.fields.featuredImage.fields?.file?.url || '')}`}
                              alt={String(relatedPost.fields.featuredImage.fields?.title || relatedPost.fields.title || 'Blog image')}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-300"
                              sizes="(max-width: 768px) 100vw, 33vw"
                            />
                          </div>
                        )}
                        
                        {/* Content */}
                        <div className="p-4">
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-2">
                            <Calendar size={12} className="mr-1" />
                            <span>{formatDate(relatedPost.sys.createdAt)}</span>
                          </div>
                          
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {relatedPost.fields.title}
                          </h4>
                          
                          {relatedPost.fields.content && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-3">
                              {generateExcerpt(relatedPost.fields.content, 100)}
                            </p>
                          )}
                          
                          {/* Tags */}
                          {relatedPost.fields.tags && relatedPost.fields.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {relatedPost.fields.tags.slice(0, 2).map((tag, index) => (
                                <Badge
                                  key={`${tag}-${index}`}
                                  variant="secondary"
                                  className="text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-none"
                                >
                                  #{tag}
                                </Badge>
                              ))}
                              {relatedPost.fields.tags.length > 2 && (
                                <Badge
                                  variant="secondary"
                                  className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 border-none"
                                >
                                  +{relatedPost.fields.tags.length - 2}
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="text-center">
                  <Link href="/blog">
                    <Button variant="outline" size="lg">
                      Tüm Yazıları Görüntüle
                    </Button>
                  </Link>
                </div>
              </footer>
            )
          })()}
        </div>
      </main>
    </article>
  )
} 