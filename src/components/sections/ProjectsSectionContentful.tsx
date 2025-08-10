'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { ExternalLink, Globe } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { ProjectEntry } from '@/types/contentful'

interface ProjectsSectionProps {
  projects: ProjectEntry[]
  title?: string
  description?: string
  showAllProjectsLink?: boolean
}

export default function ProjectsSectionContentful({
  projects,
  title = "Seçilmiş Çalışmalar",
  description = "Üzerinde çalıştığım bazı projelerden kısa bir seçki.",
  showAllProjectsLink = true
}: ProjectsSectionProps) {
  const ref = useRef<HTMLElement>(null)

  // removed variants for simpler static transitions

  // Helper function to get asset URL safely
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getAssetUrl = (asset: any): string => {
    if (asset?.url) return asset.url
    if (asset?.fields?.file?.url) return `https:${asset.fields.file.url}`
    return ''
  }

  // previously used for colored fallbacks

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'short'
    })
  }

  if (!projects || projects.length === 0) {
    return (
      <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Şu anda listelenecek proje bulunmuyor.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" ref={ref} className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-medium border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 cursor-default">
            Projeler
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">{description}</p>
        </div>

        {/* Featured project + compact list */}
        {projects.length > 0 && (
          <div className="space-y-12">
            {/* Featured */}
            {(() => {
              const featured = projects[0]
              return (
                <Card className="overflow-hidden border rounded-2xl bg-white dark:bg-gray-900 dark:border-gray-800">
                  <div className="flex flex-col md:flex-row">
                    <div className="relative md:w-1/2 aspect-video md:aspect-auto">
                      {getAssetUrl(featured.thumbnail) || getAssetUrl(featured.images?.[0]) ? (
                        <Image
                          src={getAssetUrl(featured.thumbnail) || getAssetUrl(featured.images?.[0]) || ''}
                          alt={featured.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800" />
                      )}
                    </div>
                    <div className="md:w-1/2 p-6 md:p-8 flex flex-col gap-4">
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <span className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300">{featured.category}</span>
                        <span>•</span>
                        <span>{formatDate(featured.releaseDate)}</span>
                      </div>
                      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{featured.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 line-clamp-3">{featured.description}</p>
                      {featured.technologies && featured.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {(Array.isArray(featured.technologies) ? featured.technologies : []).slice(0, 5).map((tech, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs px-2 py-0.5 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <div className="flex gap-2 pt-2">
                        {featured.appStoreUrl && (
                          <Button asChild size="sm" className="cursor-pointer">
                            <a href={featured.appStoreUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                              <ExternalLink size={14} className="mr-1" />
                              App Store
                            </a>
                          </Button>
                        )}
                        {featured.githubUrl && (
                          <Button asChild size="sm" variant="outline" className="cursor-pointer">
                            <a href={featured.githubUrl} target="_blank" rel="noopener noreferrer">GitHub</a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })()}

            {/* Compact list */}
            {projects.length > 1 && (
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Diğer projeler</h4>
                <ul className="divide-y divide-gray-200 dark:divide-gray-800 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 max-h-96 overflow-y-auto">
                  {projects.slice(1).map((p) => (
                    <li key={p.id} className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                          {getAssetUrl(p.thumbnail) || getAssetUrl(p.images?.[0]) ? (
                            <Image src={getAssetUrl(p.thumbnail) || getAssetUrl(p.images?.[0]) || ''} alt={p.title} fill className="object-cover" />
                          ) : null}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                            <span className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300">{p.category}</span>
                            <span>•</span>
                            <span>{formatDate(p.releaseDate)}</span>
                          </div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white truncate">{p.title}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          {p.appStoreUrl && (
                            <a href={p.appStoreUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-700 dark:text-gray-300 hover:underline">App Store</a>
                          )}
                          {p.githubUrl && (
                            <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-700 dark:text-gray-300 hover:underline">GitHub</a>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Call to Action */}
        {showAllProjectsLink && (
          <div className="text-center mt-14">
            <div className="p-8 rounded-2xl max-w-2xl mx-auto border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Tüm Uygulamalarım
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                App Store&apos;da yayınlanan projelerimi keşfedin.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer"
              >
                <Button 
                  size="lg" 
                  className="px-8 py-3 text-lg font-semibold rounded-md bg-gray-900 text-white hover:bg-black dark:bg-white dark:text-black dark:hover:bg-gray-200 cursor-pointer"
                  asChild
                >
                  <a 
                    href="https://apps.apple.com/us/developer/sencer-gok/id1777568061"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2"
                  >
                    <Globe size={20} />
                    <span>App Store&apos;da Keşfet</span>
                    <ExternalLink size={16} />
                  </a>
                </Button>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
} 