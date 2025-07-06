'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Mail, Heart, ExternalLink, Coffee, Rocket } from 'lucide-react'
import { usePathname } from 'next/navigation'

export default function Footer() {
  const pathname = usePathname()
  
  const mobileApps = [
    { name: 'KPSS GO', emoji: '📚' },
    { name: 'Medication Tracker', emoji: '💊' },
    { name: 'Water Remover', emoji: '💧' },
    { name: 'Notishine', emoji: '🔔' },
    { name: 'EhliyetBox', emoji: '🚗' },
    { name: 'MasalAI', emoji: '🧚‍♀️' },
    { name: 'Ve daha fazlası...', emoji: '🚀' }
  ]

  // Ana sayfa için relative linkler, diğer sayfalar için absolute linkler
  const getQuickLinks = () => {
    const isHomePage = pathname === '/'
    return [
      { name: 'Hakkımda', href: isHomePage ? '#about' : '/#about', emoji: '🙋‍♂️', download: false },
      { name: 'Eserlerim', href: isHomePage ? '#projects' : '/#projects', emoji: '🎨', download: false },
      { name: 'Selam De!', href: isHomePage ? '#contact' : '/#contact', emoji: '👋', download: false },
      { name: 'CV İndir', href: '/SencerGok_Ozgecmis.pdf', emoji: '📄', download: true }
  ]
  }

  const quickLinks = getQuickLinks()

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/sencergok',
      icon: Github,
      color: 'hover:text-gray-900 dark:hover:text-white',
      description: 'Open source projelerim'
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/sencergok',
      icon: Linkedin,
      color: 'hover:text-blue-600 dark:hover:text-blue-400',
      description: 'Profesyonel network'
    },
    {
      name: 'Twitter',
      href: 'https://x.com/sencerdev',
      icon: Twitter,
      color: 'hover:text-blue-400 dark:hover:text-blue-300',
      description: 'Günlük düşüncelerim'
    },
    {
      name: 'Email',
      href: 'mailto:sencergok@outlook.com',
      icon: Mail,
      color: 'hover:text-red-500 dark:hover:text-red-400',
      description: 'Direkt iletişim'
    }
  ]

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

  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {/* About Section */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <div className="mb-6">
              <motion.h3 
                className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
              >
                Sencer 🚀
              </motion.h3>
              <p className="text-gray-400 dark:text-gray-500 leading-relaxed text-sm">
                Kahve eşliğinde kod yazan, gece kodlamayı seven, kullanıcı deneyimini önceleyerek 
                modern uygulamalar geliştiren bir macera severi! 
                Her proje benim için yeni bir keşif 🌟
              </p>
            </div>
            
            {/* Fun Stats */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="text-center p-2 bg-gray-800 dark:bg-gray-900 rounded-lg">
                <div className="text-blue-400 font-bold">1000+</div>
                <div className="text-gray-500 dark:text-gray-600">☕ Kahve</div>
              </div>
              <div className="text-center p-2 bg-gray-800 dark:bg-gray-900 rounded-lg">
                <div className="text-purple-400 font-bold">7+</div>
                <div className="text-gray-500 dark:text-gray-600">📱 Uygulama</div>
              </div>
              <div className="text-center p-2 bg-gray-800 dark:bg-gray-900 rounded-lg">
                <div className="text-green-400 font-bold">10K+</div>
                <div className="text-gray-500 dark:text-gray-600">😊 Kullanıcı</div>
              </div>
              <div className="text-center p-2 bg-gray-800 dark:bg-gray-900 rounded-lg">
                <div className="text-yellow-400 font-bold">∞</div>
                <div className="text-gray-500 dark:text-gray-600">💡 Fikir</div>
              </div>
            </div>
          </motion.div>

          {/* Mobile Apps */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h4 className="text-lg font-semibold mb-4 text-white">
              Mobil Eserlerim 📱
            </h4>
            <div className="space-y-2">
              {mobileApps.map((app, index) => (
                <motion.div
                  key={app.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ x: 5, scale: 1.02 }}
                  className="flex items-center space-x-2 text-sm text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition-colors duration-200 cursor-default"
                >
                  <span className="text-base">{app.emoji}</span>
                  <span>{app.name}</span>
                </motion.div>
              ))}
            </div>
            <motion.a
              href="https://apps.apple.com/us/developer/sencer-gok/id1777568061"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 mt-4 text-blue-400 hover:text-blue-300 transition-colors duration-200 text-sm cursor-pointer"
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>App Store&apos;da Tümünü Gör</span>
              <ExternalLink size={14} />
            </motion.a>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h4 className="text-lg font-semibold mb-4 text-white">
              Hızlı Linkler 🔗
            </h4>
            <div className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ x: 5, scale: 1.02 }}
                >
                  <a
                    href={link.href}
                    className="flex items-center space-x-2 text-sm text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition-colors duration-200 cursor-pointer"
                    {...(link.download && { 
                      download: true, 
                      target: '_blank',
                      rel: 'noopener noreferrer'
                    })}
                  >
                    <span className="text-base">{link.emoji}</span>
                    <span>{link.name}</span>
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Social & Contact */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h4 className="text-lg font-semibold mb-4 text-white">
              Benimle Takılın! 🤝
            </h4>
            <div className="space-y-3 mb-6">
              {socialLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer"
                >
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center space-x-3 text-gray-400 dark:text-gray-500 ${link.color} transition-all duration-200 group`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-gray-800 dark:bg-gray-900 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <link.icon size={16} />
                    </div>
                    <div>
                      <div className="text-sm font-medium">{link.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-600">{link.description}</div>
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>

            {/* Status */}
            <div className="p-3 bg-gradient-to-r from-green-900/20 to-emerald-900/20 rounded-lg border border-green-800/30">
              <div className="flex items-center space-x-2 mb-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-green-400 font-medium text-sm">Aktif ve Müsait!</span>
              </div>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Yeni projeler için hazırım 🎯
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 dark:border-gray-900 bg-gray-950 dark:bg-gray-950">
        <div className="container mx-auto px-4 py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0"
          >
            <div className="flex items-center space-x-2 text-sm text-gray-400 dark:text-gray-500">
              <span>© 2024 Sencer Gök</span>
              <span>•</span>
              <span>Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
              >
                <Heart className="w-4 h-4 text-red-500 fill-current" />
              </motion.div>
              <span>and</span>
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Coffee className="w-4 h-4 text-orange-400" />
              </motion.div>
              <span>and Next.js</span>
            </div>

            <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-600">
              <motion.span
                className="flex items-center space-x-1 cursor-default"
                whileHover={{ scale: 1.05 }}
              >
                <span>🇹🇷 Türkiye&apos;den</span>
                <Rocket className="w-3 h-3" />
              </motion.span>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
} 