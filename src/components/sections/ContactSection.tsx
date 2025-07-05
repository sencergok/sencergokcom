'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, CheckCircle, Coffee, Heart } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'sencergok@outlook.com',
      href: 'mailto:sencergok@outlook.com',
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      description: 'En hızlı ulaşım yolu! ✉️'
    },
    {
      icon: Phone,
      title: 'Telefon',
      value: '+90 545 810 7460',
      href: 'tel:+905458107460',
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      description: 'Acil durumlar için 📞'
    },
    {
      icon: MapPin,
      title: 'Konum',
      value: 'Ankara, Türkiye 🇹🇷',
      href: '#',
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
      description: 'Remote çalışmaya açığım 🌍'
    }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Form verilerini API'ye gönder
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        // Başarılı gönderim
        setIsSubmitted(true)
        setFormData({ name: '', email: '', subject: '', message: '' })
        console.log('✅ Form başarıyla gönderildi:', result)
        
        // Reset success message after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000)
      } else {
        // Hata durumu
        console.error('❌ Form gönderim hatası:', result)
        alert(result.error || 'Mesaj gönderilirken bir hata oluştu.')
      }
    } catch (error) {
      console.error('❌ Network error:', error)
      alert('Bağlantı hatası! Lütfen internet bağlantınızı kontrol edin.')
    } finally {
      setIsSubmitting(false)
    }
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

  return (
    <section id="contact" ref={ref} className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants}>
            <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-medium border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm cursor-default">
              Selam De! 👋
            </Badge>
          </motion.div>
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Konuşalım
            </span>{' '}
            ve Birlikte Yapalım!
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            Yeni bir proje için işbirliği yapmak istiyorsanız, sadece merhaba demek istiyorsanız 
            ya da hangi kahveyi tercih ettiğimi merak ediyorsanız, 
            bana ulaşmaktan çekinmeyin! Sohbet etmeyi seviyorum ☕
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-8"
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Bana Nasıl Ulaşabilirsin? 📲
              </h3>
            </motion.div>

            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((contact) => (
                <motion.div
                  key={contact.title}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, x: 5, rotate: 1 }}
                  transition={{ duration: 0.2 }}
                  className="cursor-pointer"
                >
                  <Card className="p-6 hover:shadow-lg transition-all duration-300 border dark:border-gray-700 bg-white dark:bg-gray-800">
                    <a 
                      href={contact.href}
                      className="flex items-center space-x-4 group"
                    >
                      <div className={`w-12 h-12 rounded-xl ${contact.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                        <contact.icon className={`w-6 h-6 ${contact.color}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                          {contact.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-300 transition-colors duration-200">
                          {contact.value}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                          {contact.description}
                        </p>
                      </div>
                    </a>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Compact Info Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Response Time */}
              <motion.div 
                variants={itemVariants}
                className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Yanıt Süresi ⏰</h4>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
                  Genellikle <span className="font-semibold text-blue-600 dark:text-blue-400">24 saat</span> içinde 
                  size geri dönüş yapıyorum. Kahve molalarımda mesajları kontrol ederim! ☕
                </p>
              </motion.div>

              {/* Availability */}
              <motion.div 
                variants={itemVariants}
                className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Müsaitlik Durumu 🎯</h4>
                </div>
                <div className="flex items-center space-x-1 mb-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-green-700 dark:text-green-400 font-medium text-xs">Yeni projeler için müsait!</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-xs">
                  Özellikle yaratıcı ve eğlenceli projelere açığım 🚀
                </p>
              </motion.div>

              {/* Fun Facts */}
              <motion.div 
                variants={itemVariants}
                className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-xl border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Coffee className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Fun Fact ☕</h4>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-xs">
                  En iyi fikirlerim gece 00:00-03:00 arası geliyor. O yüzden gece mesaj atarsanız 
                  hemen cevap verebilirim! 🌙
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants}>
              <Card className="p-8 shadow-lg border dark:border-gray-700 bg-white dark:bg-gray-800">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Mesaj Gönder 💌
                  </h3>
                </div>

                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg"
                  >
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                      <span className="text-green-800 dark:text-green-300 font-medium">
                        Mesajınız başarıyla gönderildi! Kahve molasında size dönüş yapacağım ☕
                      </span>
                    </div>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div variants={itemVariants}>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Adınız *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Adınızı girin"
                      />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="email@example.com"
                      />
                    </motion.div>
                  </div>

                  <motion.div variants={itemVariants}>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Konu *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Hangi konuda konuşmak istiyorsunuz?"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Mesajınız *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Projenizden bahsedin, sorularınızı sorun ya da sadece merhaba deyin! 😊"
                    />
                  </motion.div>

                  <motion.div 
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="cursor-pointer"
                  >
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-8 py-3 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Gönderiliyor...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Heart size={20} />
                          <span>Mesajı Gönder</span>
                          <Send size={16} />
                        </div>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 