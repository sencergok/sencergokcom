'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Code, Smartphone, Mail, Sun, Moon, PenTool } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Smooth scroll function - Mobil için optimize edilmiş
  const scrollToSection = (sectionId: string) => {
    console.log('🚀 scrollToSection called with:', sectionId)
    const element = document.getElementById(sectionId)
    console.log('📍 Found element:', element)
    
    if (element) {
      console.log('🎯 Attempting to scroll to element')
      
      // Mobil için delay ekle ve tek method kullan
      setTimeout(() => {
        console.log('⏰ Starting smooth scroll')
        
        const headerHeight = 100
        const elementRect = element.getBoundingClientRect()
        const absoluteElementTop = elementRect.top + window.pageYOffset
        const scrollToPosition = absoluteElementTop - headerHeight
        
        console.log('🎯 Final scroll position:', scrollToPosition)
        
        // Sadece manual animation kullan - en tutarlı sonuç
        const currentScroll = window.pageYOffset
        const distance = scrollToPosition - currentScroll
        console.log('🎮 Starting animation - from:', currentScroll, 'to:', scrollToPosition)
        
        const startTime = performance.now()
        const duration = 600 // Daha yumuşak animasyon
        
        function animate(currentTime: number) {
          const elapsed = currentTime - startTime
          const progress = Math.min(elapsed / duration, 1)
          
          // Easing function (ease-out)
          const easeProgress = 1 - Math.pow(1 - progress, 3)
          const newPosition = currentScroll + (distance * easeProgress)
          
          window.scrollTo(0, newPosition)
          
          if (progress < 1) {
            requestAnimationFrame(animate)
          } else {
            console.log('✅ Smooth scroll completed')
          }
        }
        
        requestAnimationFrame(animate)
      }, 100) // Mobil için 100ms delay
    } else {
      console.error('❌ Element not found with ID:', sectionId)
    }
  }

  // Handle navigation clicks
  const handleNavClick = (href: string, e: React.MouseEvent) => {
    console.log('🔗 handleNavClick called with href:', href)
    const isHomePage = pathname === '/'
    console.log('🏠 Is home page:', isHomePage)
    
    // Eğer anchor link ise (#about, #projects, #contact)
    if (href.startsWith('#')) {
      console.log('⚓ Anchor link detected:', href)
      e.preventDefault()
      setIsMenuOpen(false) // Mobil menu'yu kapat
      
      if (isHomePage) {
        // Ana sayfadaysa direk scroll yap
        console.log('📍 Direct scroll on home page')
        scrollToSection(href.substring(1))
      } else {
        // Başka sayfadaysa önce ana sayfaya git, sonra scroll yap
        console.log('🏠 Navigate to home first, then scroll')
        router.push('/')
        setTimeout(() => {
          scrollToSection(href.substring(1))
        }, 10)
      }
    }
    // Eğer /#section şeklinde ise
    else if (href.startsWith('/#')) {
      console.log('🔗 Home anchor link detected:', href)
      e.preventDefault()
      setIsMenuOpen(false) // Mobil menu'yu kapat
      
      if (isHomePage) {
        // Ana sayfadaysa direk scroll yap
        console.log('📍 Direct scroll on home page (/#)')
        scrollToSection(href.substring(2))
      } else {
        // Başka sayfadaysa önce ana sayfaya git, sonra scroll yap
        console.log('🏠 Navigate to home first, then scroll (/#)')
        router.push('/')
        setTimeout(() => {
          scrollToSection(href.substring(2))
        }, 10)
      }
    }
    // Normal link ise (/blog gibi)
    else {
      console.log('🔗 Normal link:', href)
      setIsMenuOpen(false) // Mobil menu'yu kapat
    }
  }

  // Ana sayfa için relative linkler, diğer sayfalar için absolute linkler
  const getMenuItems = () => {
    const isHomePage = pathname === '/'
    return [
      { href: '/blog', label: 'Blog', icon: PenTool },
      { href: isHomePage ? '#about' : '/#about', label: 'Hakkımda', icon: Code },
      { href: isHomePage ? '#projects' : '/#projects', label: 'Projelerim', icon: Smartphone },
      { href: isHomePage ? '#contact' : '/#contact', label: 'İletişime Geç! 👋', icon: Mail },
    ]
  }

  const menuItems = getMenuItems()

  if (!mounted) return null

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="text-2xl font-bold text-gray-900 dark:text-white cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="flex items-center space-x-2">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Sencer Gök 🚀
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {menuItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(item.href, e)}
                className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 cursor-pointer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </motion.a>
            ))}
            
            {/* Theme Toggle */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="relative cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <AnimatePresence mode="wait">
                  {theme === 'dark' ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun size={18} className="text-yellow-500" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon size={18} className="text-blue-600" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          </nav>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="relative cursor-pointer"
            >
              <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun size={18} className="text-yellow-500" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon size={18} className="text-blue-600" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative z-50 cursor-pointer"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-lg border-t dark:border-gray-700"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="px-4 py-6 space-y-4">
              {menuItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(item.href, e)}
                  className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 py-2 cursor-pointer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <item.icon size={20} />
                  <span className="text-lg">{item.label}</span>
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
} 