'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { ExternalLink, Download, Calendar, Globe } from 'lucide-react'
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
  title = "Projeler",
  description = "Kullanıcı problemi odaklı, basit ve hızlı çözümler.",
  showAllProjectsLink = true
}: ProjectsSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4
      }
    }
  }

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
            Henüz proje bulunamadı. Contentful&apos;dan veri çekerken bir sorun oluşmuş olabilir.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" ref={ref} className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants}>
            <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-medium border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 cursor-default">
              Projeler
            </Badge>
          </motion.div>
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            {title}
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            {description}
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="cursor-default"
            >
              <Card className="h-full overflow-hidden border rounded-xl bg-white dark:bg-gray-900 dark:border-gray-800 p-0">
                {/* Header with Image */}
                <div className="aspect-square relative overflow-hidden">
                  {/* Project Image (1:1 aspect ratio) */}
                  {getAssetUrl(project.thumbnail) || getAssetUrl(project.images?.[0]) ? (
                    <>
                      <Image
                        src={getAssetUrl(project.thumbnail) || getAssetUrl(project.images?.[0]) || ''}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {/* Dark overlay for text readability */}
                       <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                    </>
                  ) : (
                    /* Fallback gradient if no image */
                    <>
                     <div className={`w-full h-full bg-gray-200 dark:bg-gray-800`} />
                      <div className="absolute inset-0 bg-black/20" />
                    </>
                  )}
                  
                  {/* Floating emoji */}
                  {/* emojis removed for minimalism */}
                  
                  <div className="absolute top-4 left-4">
                    <div className="px-2.5 py-1 rounded-md bg-white/90 text-gray-800 text-xs font-medium">{project.category}</div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-lg leading-tight line-clamp-2">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                    {/* Rating removed for simplicity */}
                    <div className="flex items-center space-x-1">
                      <Download className="w-4 h-4" />
                      <span>{project.stats?.downloads || project.downloads || '1K+'}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(project.releaseDate)}</span>
                    </div>
                  </div>

                  {/* Description */}
                   <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Features */}
                  {project.features && project.features.length > 0 && (
                    <div className="space-y-2">
                       <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Özellikler</h4>
                      <div className="grid grid-cols-1 gap-1">
                        {(Array.isArray(project.features) ? project.features : []).slice(0, 4).map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-1">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />
                            <span className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Technologies */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {(Array.isArray(project.technologies) ? project.technologies : []).slice(0, 4).map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline" className="text-xs px-2 py-0.5 cursor-default border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800">
                          {tech}
                        </Badge>
                      ))}
                      {(Array.isArray(project.technologies) ? project.technologies : []).length > 4 && (
                        <Badge variant="outline" className="text-xs px-2 py-0.5 cursor-default border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800">
                          +{(Array.isArray(project.technologies) ? project.technologies : []).length - 4}
                        </Badge>
                      )}
                    </div>
                  )}

                  {/* Action Buttons */}
                   <div className="flex space-x-2 pt-2">
                    {project.appStoreUrl && (
                      <motion.a
                        href={project.appStoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                         <Button 
                           size="sm" 
                           className="w-full text-xs cursor-pointer bg-gray-900 hover:bg-black dark:bg-white dark:text-black dark:hover:bg-gray-200"
                         >
                          <ExternalLink size={12} className="mr-1" />
                          App Store
                        </Button>
                      </motion.a>
                    )}
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                         <Button 
                           size="sm" 
                           variant="outline" 
                           className="w-full text-xs cursor-pointer"
                         >
                          GitHub
                        </Button>
                      </motion.a>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        {showAllProjectsLink && (
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-center"
          >
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
          </motion.div>
        )}
      </div>
    </section>
  )
} 