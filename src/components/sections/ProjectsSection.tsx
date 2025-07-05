'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ExternalLink, Download, Star, Calendar, Smartphone, Sparkles, Rocket } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const projects = [
    {
      title: 'KPSS GO: Soru ve Konu Anlatım',
      category: 'Education',
      description: 'KPSS&apos;ye hazırlık sürecini eğlenceli hale getiren kapsamlı uygulama! İnteraktif testler ve detaylı çözümlerle öğrenme keyfi 📚',
      features: ['10.000+ Soru 📝', 'Video Anlatımlar 🎬', 'İstatistik Takibi 📊', 'Offline Kullanım 📱'],
      tags: ['Swift', 'iOS', 'Core Data', 'UI/UX'],
      gradient: 'from-blue-500 to-blue-700',
      iconBg: 'bg-blue-100 dark:bg-blue-900/30',
      iconColor: 'text-blue-600 dark:text-blue-400',
      rating: 4.8,
      downloads: '5K+',
      year: 2024,
      emoji: '📚'
    },
    {
      title: 'Medication Tracking & Reminder',
      category: 'Health & Fitness',
      description: 'Sağlığınız için geliştirdiğim akıllı hatırlatma sistemi! İlaçlarınızı hiç unutmayın ve sağlıklı kalın 💊',
      features: ['Akıllı Hatırlatma ⏰', 'Doz Takibi 📋', 'Sağlık Raporları 📈', 'Doktor Paylaşımı 👨‍⚕️'],
      tags: ['React Native', 'TypeScript', 'Push Notifications', 'Health Kit'],
      gradient: 'from-green-500 to-emerald-700',
      iconBg: 'bg-green-100 dark:bg-green-900/30',
      iconColor: 'text-green-600 dark:text-green-400',
      rating: 4.7,
      downloads: '3K+',
      year: 2024,
      emoji: '💊'
    },
    {
      title: 'Water Remover Tool',
      category: 'Lifestyle',
      description: 'Telefonunuza su kaçtı mı? Panik yapmayın! Ses frekansları ile etkili temizlik yapan yenilikçi çözümüm 🌊',
      features: ['Ses Frekansı 🔊', 'Hızlı Temizlik ⚡', 'Güvenli Kullanım ✅', 'Kolay Arayüz 🎯'],
      tags: ['Swift', 'AVFoundation', 'iOS', 'Audio Processing'],
      gradient: 'from-cyan-500 to-blue-700',
      iconBg: 'bg-cyan-100 dark:bg-cyan-900/30',
      iconColor: 'text-cyan-600 dark:text-cyan-400',
      rating: 4.6,
      downloads: '8K+',
      year: 2023,
      emoji: '💧'
    },
    {
      title: 'Notishine',
      category: 'Lifestyle',
      description: 'Bildirimlerin kaosundan kurtulun! Bildirimlerinizi düzenleyen ve özelleştiren akıllı asistanınız 🔔',
      features: ['Bildirim Filtreleme 🔍', 'Özel Sesler 🎵', 'Zaman Planlaması ⏰', 'Widget Desteği 📱'],
      tags: ['SwiftUI', 'WidgetKit', 'UserNotifications', 'iOS'],
      gradient: 'from-purple-500 to-pink-700',
      iconBg: 'bg-purple-100 dark:bg-purple-900/30',
      iconColor: 'text-purple-600 dark:text-purple-400',
      rating: 4.5,
      downloads: '2K+',
      year: 2023,
      emoji: '🔔'
    },
    {
      title: 'EhliyetBox: Ehliyet Sınav Soru',
      category: 'Education',
      description: 'Ehliyet sınavını ilk seferde geçmek isteyenler için! Güncel sorular ve detaylı analizlerle başarı garantili 🚗',
      features: ['Güncel Sorular 📄', 'Deneme Sınavları 📝', 'İstatistik 📊', 'Hata Analizi 🔍'],
      tags: ['React Native', 'Redux', 'AsyncStorage', 'Animation'],
      gradient: 'from-orange-500 to-red-700',
      iconBg: 'bg-orange-100 dark:bg-orange-900/30',
      iconColor: 'text-orange-600 dark:text-orange-400',
      rating: 4.4,
      downloads: '12K+',
      year: 2023,
      emoji: '🚗'
    },
    {
      title: 'MasalAI: Sonsuz Masal Deneyimi',
      category: 'Books',
      description: 'AI ile sonsuz masal dünyası! Çocuklarınız için kişiselleştirilmiş masallar yaratıyor ve sesli anlatıyorum 🧚‍♀️',
      features: ['AI Masal Üretimi 🤖', 'Sesli Anlatım 🗣️', 'Kişiselleştirme 🎨', 'Çocuk Dostu 👶'],
      tags: ['Swift', 'AI Integration', 'Text-to-Speech', 'Core ML'],
      gradient: 'from-pink-500 to-rose-700',
      iconBg: 'bg-pink-100 dark:bg-pink-900/30',
      iconColor: 'text-pink-600 dark:text-pink-400',
      rating: 4.9,
      downloads: '1K+',
      year: 2024,
      emoji: '🧚‍♀️'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <section id="projects" ref={ref} className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants}>
            <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-medium border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm cursor-default">
              Eserlerim 🎨
            </Badge>
          </motion.div>
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Hayallerimi
            </span>{' '}
            Kodladığım Uygulamalar
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            Kahve molalarında düşündüğüm fikirleri gerçeğe dönüştürdüm! 
            App Store&apos;da 7+ uygulamamla binlerce kişinin günlük hayatını kolaylaştırıyorum. 
            Her biri farklı bir hikaye, farklı bir çözüm! 🚀
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
              key={project.title}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02, rotate: 1 }}
              transition={{ duration: 0.3 }}
              className="cursor-default"
            >
              <Card className="h-full overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-900 dark:border-gray-700">
                {/* Header with Gradient */}
                <div className={`h-32 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20" />
                  
                  {/* Floating emoji */}
                  <motion.div
                    className="absolute top-2 right-2 text-2xl"
                    animate={{
                      y: [0, -5, 0],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {project.emoji}
                  </motion.div>
                  
                  <div className="absolute top-4 left-4">
                    <div className={`w-12 h-12 rounded-xl ${project.iconBg} bg-white/90 backdrop-blur-sm flex items-center justify-center`}>
                      <Smartphone className={`w-6 h-6 ${project.iconColor}`} />
                    </div>
                  </div>
                  <div className="absolute top-4 right-12">
                    <Badge variant="secondary" className="bg-white/90 text-gray-800 backdrop-blur-sm cursor-default">
                      {project.category}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-lg leading-tight">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{project.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Download className="w-4 h-4" />
                      <span>{project.downloads}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{project.year}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Süper Özellikler:</h4>
                    <div className="grid grid-cols-2 gap-1">
                      {project.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-1">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                          <span className="text-xs text-gray-600 dark:text-gray-400">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" className="text-xs px-2 py-0.5 cursor-default border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center"
        >
          <div className="p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl max-w-2xl mx-auto border border-gray-200 dark:border-gray-700">
            <motion.div 
              className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Daha Fazla Keşfetmeye Hazır mısınız? 🎯
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              App Store&apos;da tüm uygulamalarımı inceleyebilir, indirip deneyebilir ve 
              hangi teknolojilerle nelerin mümkün olduğunu görebilirsiniz! 
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer"
            >
              <Button 
                size="lg" 
                className="px-8 py-3 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 cursor-pointer"
                asChild
              >
                <a 
                  href="https://apps.apple.com/us/developer/sencer-gok/id1777568061"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2"
                >
                  <Rocket size={20} />
                  <span>App Store&apos;da Keşfet</span>
                  <ExternalLink size={16} />
                </a>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 