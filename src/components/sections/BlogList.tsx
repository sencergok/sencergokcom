'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowRight, Search } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { BlogPostEntry } from '@/types/contentful'
import { generateExcerpt, contentContainsQuery } from '@/lib/excerpt'

interface BlogListProps {
  posts: BlogPostEntry[]
}

export default function BlogList({ posts = [] }: BlogListProps) {
  const [searchQuery, setSearchQuery] = useState('')

  // Debug logs
  console.log('BlogList Debug:', {
    postsLength: posts?.length || 0,
    posts: posts?.slice(0, 2), // İlk 2 post'u göster
  })

  // Güvenli filter - posts undefined olabilir
  const filteredPosts = (posts || []).filter(post => {
    if (!post?.fields) return false
    
    const matchesSearch = post.fields.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (post.fields.content && contentContainsQuery(post.fields.content, searchQuery))
    return matchesSearch
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  // Eğer posts boş ise özel mesaj göster
  if (!posts || posts.length === 0) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-6">📝</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Henüz Blog Yazısı Yok
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Contentful&apos;dan blog yazıları çekilemedi veya henüz yazı eklenmemiş.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-sm text-gray-600 dark:text-gray-400">
              <p><strong>Debug Info:</strong></p>
              <p>Posts: {posts?.length || 0}</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-28">
      <div className="container mx-auto px-4">
        
        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-8xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Blog Yazıları
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Frontend geliştirme, mobil programlama ve teknoloji üzerine yazılarım
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
              <input
                type="text"
                placeholder="Blog yazılarında ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
              />
            </div>
          </div>
        </motion.div>

        {/* Results Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-5 text-center"
        >
          <p className="text-gray-600 dark:text-gray-400">
            {filteredPosts.length} yazı bulundu
            {searchQuery && ` "${searchQuery}" aramasında`}
          </p>
        </motion.div>

        {/* Blog Posts Grid */}
        {filteredPosts.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {filteredPosts.map((post) => (
              <motion.div key={post.sys?.id || Math.random()} variants={itemVariants}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden border-0 bg-white dark:bg-gray-800 group cursor-pointer">
                  <Link href={`/blog/${post.fields?.slug || ''}`}>
                    <div>
                      {/* Featured Image */}
                      {post.fields?.featuredImage && (
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={`https:${String(post.fields.featuredImage.fields?.file?.url || '')}`}
                            alt={String(post.fields.featuredImage.fields?.title || post.fields.title || 'Blog image')}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>
                      )}

                      {/* Content */}
                      <div className="p-6">
                        {/* Meta Info */}
                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                          <div className="flex items-center space-x-1">
                            <Calendar size={14} />
                            <span>{formatDate(post.sys?.createdAt || new Date().toISOString())}</span>
                          </div>
                          {post.fields?.readingTime && (
                            <div className="flex items-center space-x-1">
                              <Clock size={14} />
                              <span>{post.fields.readingTime} dk</span>
                            </div>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {post.fields?.title || 'Başlık Yok'}
                        </h3>

                        {/* Excerpt */}
                        {post.fields?.content && (
                          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4">
                            {generateExcerpt(post.fields.content, 150)}
                          </p>
                        )}

                        {/* Tags */}
                        {post.fields?.tags && post.fields.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-4">
                            {post.fields.tags.slice(0, 3).map((tag, tagIndex) => (
                              <Badge
                                key={`${tag}-${tagIndex}`}
                                variant="secondary"
                                className="text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                              >
                                {tag}
                              </Badge>
                            ))}
                            {post.fields.tags.length > 3 && (
                              <Badge variant="secondary" className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                                +{post.fields.tags.length - 3}
                              </Badge>
                            )}
                          </div>
                        )}

                        {/* Read More */}
                        <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                          <span>Devamını oku</span>
                          <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Hiçbir yazı bulunamadı
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Farklı anahtar kelimeler ile tekrar deneyin
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
} 