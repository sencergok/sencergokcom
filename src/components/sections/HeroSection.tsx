'use client'

import { motion } from "framer-motion"
import { Download, ExternalLink, Smartphone, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useRef } from 'react'

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)

  const skills = [
    "React & Next.js 🚀",
    "React Native 📱", 
    "TypeScript 💪", 
    "Swift & SwiftUI 🍎",
    "Node.js ⚡",
    "UI/UX Design 🎨"
  ]

  const funFacts = [
    "☕ Günde 2+ kahve içerim",
    "🌙 Gece kodlamayı severim", 
    "🎧 Lo-fi müzik eşliğinde kodlarım",
    "🚀 Her gün yeni bir şey öğrenirim"
  ]

  return (
    <section ref={ref} className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20" />
      
      {/* Animated Background Elements */}
      <motion.div
        className="absolute inset-0"
      >
        {/* Floating Shapes */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-blue-200 dark:bg-blue-500/20 rounded-full opacity-20"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-16 h-16 bg-purple-200 dark:bg-purple-500/20 rounded-full opacity-20"
          animate={{
            y: [0, 20, 0],
            rotate: [360, 180, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-40 left-1/4 w-12 h-12 bg-pink-200 dark:bg-pink-500/20 rounded-full opacity-20"
          animate={{
            y: [0, -15, 0],
            x: [0, 10, 0]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Fun floating elements */}
        <motion.div
          className="absolute top-32 right-1/3 text-4xl"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          ☕
        </motion.div>
        
        <motion.div
          className="absolute bottom-32 right-1/4 text-3xl"
          animate={{
            y: [0, 15, 0],
            rotate: [0, -10, 10, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🚀
        </motion.div>
      </motion.div>

      <div className="container mx-auto px-4 pt-20 pb-8 relative z-10">
        <div className="text-center space-y-8">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-700 cursor-default">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
              Yeni projeler için müsait! 🎯
            </Badge>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
              Merhaba! Ben{' '}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                Sencer
              </span>
              <motion.span
                animate={{ rotate: [0, 14, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                className="inline-block ml-4"
              >
                👋
              </motion.span>
            </h1>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-700 dark:text-gray-300">
              Kod Yazan Bir Kaşif 🧭
            </h2>
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Kahve eşliğinde kod yazıyor, kullanıcı deneyimini önceleyerek
            <span className="text-blue-600 dark:text-blue-400 font-semibold"> hayal edebileceğiniz her uygulamayı</span> gerçeğe dönüştürüyorum. 
            App Store&apos;da 7+ uygulamamla binlerce kişinin hayatına dokundum! ✨
          </motion.p>

          {/* Fun Facts */}
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Hakkımda mini bilgiler:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {funFacts.map((fact, index) => (
                <motion.div
                  key={fact}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                  className="text-xs bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-2 border border-gray-200 dark:border-gray-700"
                >
                  {fact}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="cursor-default"
              >
                <Badge variant="outline" className="px-3 py-1 text-sm font-medium border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                  {skill}
                </Badge>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer"
            >
              <Button 
                size="lg" 
                className="px-8 py-3 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 cursor-pointer"
                onClick={() => {
                  const contactSection = document.getElementById('contact')
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
              >
                <Heart className="mr-2" size={20} />
                Birlikte Çalışalım!
              </Button>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer"
            >
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-3 text-lg font-semibold border-2 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                onClick={() => {
                  // PDF dosyasını indirmek için link oluştur ve tıkla
                  const link = document.createElement('a')
                  link.href = '/SencerGok_Ozgecmis.pdf'
                  link.download = 'SencerGok_Ozgecmis.pdf'
                  link.target = '_blank'
                  document.body.appendChild(link)
                  link.click()
                  document.body.removeChild(link)
                }}
              >
                <Download className="mr-2" size={20} />
                CV İndir
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
          >
            <div className="text-center">
              <motion.div
                className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.5 }}
              >
                7+
              </motion.div>
              <p className="text-gray-600 dark:text-gray-400 font-medium">Mobil Uygulama 📱</p>
            </div>
            
            <div className="text-center">
              <motion.div
                className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.7 }}
              >
                3+
              </motion.div>
              <p className="text-gray-600 dark:text-gray-400 font-medium">Yıl Macera 🎢</p>
            </div>
            
            <div className="text-center">
              <motion.div
                className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400 mb-2"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.9 }}
              >
                10K+
              </motion.div>
              <p className="text-gray-600 dark:text-gray-400 font-medium">Mutlu Kullanıcı 😊</p>
            </div>
          </motion.div>

          {/* App Store Link */}
          <motion.div
            className="pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.1 }}
          >
            <motion.a
              href="https://apps.apple.com/us/developer/sencer-gok/id1777568061"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 cursor-pointer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Smartphone size={20} />
              <span className="font-medium">App Store&apos;da Eserlerimi Keşfet</span>
              <ExternalLink size={16} />
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.3 }}
      >
      </motion.div>
    </section>
  )
} 