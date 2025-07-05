'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Code, Smartphone, Globe, Palette, Users, Award, TrendingUp, Coffee } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const skills = [
    {
      category: 'Frontend Magic ✨',
      icon: Globe,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      items: [
        { name: 'React & Next.js', level: 95 },
        { name: 'TypeScript', level: 90 },
        { name: 'Tailwind CSS', level: 92 },
        { name: 'JavaScript (ES6+)', level: 95 },
        { name: 'HTML5 & CSS3', level: 98 }
      ]
    },
    {
      category: 'Mobile Crafting 📱',
      icon: Smartphone,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
      items: [
        { name: 'React Native', level: 88 },
        { name: 'Swift & SwiftUI', level: 85 },
        { name: 'iOS Development', level: 87 },
        { name: 'App Store Connect', level: 90 },
        { name: 'Mobile UI/UX', level: 92 }
      ]
    },
    {
      category: 'Backend & Tools 🛠️',
      icon: Code,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      items: [
        { name: 'Node.js', level: 80 },
        { name: 'REST APIs', level: 85 },
        { name: 'Git & GitHub', level: 90 },
        { name: 'Figma & Design', level: 85 },
        { name: 'Firebase', level: 82 }
      ]
    }
  ]

  const achievements = [
    {
      icon: Award,
      title: '7+ Mobil Uygulama',
      description: 'App Store&apos;da yayınlanan harika uygulamalar 🎉',
      color: 'text-yellow-600 dark:text-yellow-400',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/30'
    },
    {
      icon: Users,
      title: '10K+ Kullanıcı',
      description: 'Hayatına dokunduğum insanlar ❤️',
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30'
    },
    {
      icon: TrendingUp,
      title: '3+ Yıl Macera',
      description: 'Sürekli öğrenme ve gelişim yolculuğu 🚀',
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30'
    },
    {
      icon: Coffee,
      title: '1000+ Kahve',
      description: 'Bu projeleri hayata geçiren yakıt ☕',
      color: 'text-brown-600 dark:text-orange-400',
      bgColor: 'bg-orange-100 dark:bg-orange-900/30'
    }
  ]

  const personalityTraits = [
    { icon: '🎯', title: 'Detay Odaklı', description: 'Piksel mükemmeliyetçisiyim' },
    { icon: '🚀', title: 'Hızlı Öğrenen', description: 'Yeni teknolojilere aşığım' },
    { icon: '🎨', title: 'Yaratıcı', description: 'Her soruna farklı çözümler bulurum' },
    { icon: '🤝', title: 'Takım Oyuncusu', description: 'Birlikte başarmanın gücüne inanırım' }
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
    <section id="about" ref={ref} className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants}>
            <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-medium border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm cursor-default">
              Hakkımda 🙋‍♂️
            </Badge>
          </motion.div>
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Kod Tutkunu
            </span>{' '}
            Bir İnsan
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            3+ yıldır kahve eşliğinde kod yazıyorum. Lo-fi müzik çalarken, 
            kedilerimin gözetiminde modern teknolojilerle harika uygulamalar yaratmaya odaklanıyorum! 
            Her proje benim için yeni bir macera 🎢
          </motion.p>
        </motion.div>

        {/* Personality Traits */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-20"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Nasıl Biriyim? 🤔
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              İşte beni tanımlayan özellikler!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {personalityTraits.map((trait) => (
              <motion.div
                key={trait.title}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="cursor-default"
              >
                <Card className="p-6 h-full hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 dark:border-gray-700">
                  <div className="text-center space-y-4">
                    <div className="text-4xl mb-3">
                      {trait.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        {trait.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                        {trait.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {achievements.map((achievement) => (
            <motion.div 
              key={achievement.title} 
              variants={itemVariants}
              whileHover={{ scale: 1.05, rotate: 1 }}
              className="cursor-default"
            >
              <Card className="p-6 h-full hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 dark:border-gray-700">
                <div className="text-center space-y-4">
                  <div className={`w-16 h-16 mx-auto rounded-2xl ${achievement.bgColor} flex items-center justify-center`}>
                    <achievement.icon className={`w-8 h-8 ${achievement.color}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {achievement.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-12"
        >
          <motion.div variants={itemVariants} className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Kullandığım Araçlar 🛠️
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Modern teknolojiler ve best practices ile harika deneyimler yaratıyorum.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {skills.map((skillGroup, groupIndex) => (
              <motion.div
                key={skillGroup.category}
                variants={itemVariants}
                custom={groupIndex}
                whileHover={{ scale: 1.02 }}
                className="cursor-default"
              >
                <Card className="p-6 h-full hover:shadow-lg transition-all duration-300 border dark:border-gray-700 bg-white dark:bg-gray-800">
                  {/* Header */}
                  <div className="flex items-center space-x-3 mb-6">
                    <div className={`w-12 h-12 rounded-xl ${skillGroup.bgColor} flex items-center justify-center`}>
                      <skillGroup.icon className={`w-6 h-6 ${skillGroup.color}`} />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                      {skillGroup.category}
                    </h4>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-4">
                    {skillGroup.items.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ 
                          duration: 0.6, 
                          delay: groupIndex * 0.2 + skillIndex * 0.1 
                        }}
                        className="space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {skill.name}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full ${
                              skillGroup.color === 'text-blue-600 dark:text-blue-400' ? 'bg-blue-500' :
                              skillGroup.color === 'text-purple-600 dark:text-purple-400' ? 'bg-purple-500' :
                              'bg-green-500'
                            }`}
                            initial={{ width: 0 }}
                            animate={isInView ? { width: `${skill.level}%` } : {}}
                            transition={{ 
                              duration: 1, 
                              delay: groupIndex * 0.2 + skillIndex * 0.1 + 0.5,
                              ease: "easeOut"
                            }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Personal Touch */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mt-20 p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl border border-gray-200 dark:border-gray-700"
        >
          <div className="max-w-3xl mx-auto">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
              <Palette className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Neden Benimle Çalışmalısınız? 🤝
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg mb-6">
              Her projeye tutkuyla yaklaşıyor, kullanıcı odaklı düşünüyor ve clean code yazıyorum. 
              App Store&apos;da 7+ uygulamamla kanıtlanmış deneyimim var. En önemlisi, sürekli öğrenmeye 
              ve kendimi geliştirmeye açığım! 
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <Badge variant="secondary" className="px-3 py-1 cursor-default bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600">Clean Code 🧹</Badge>
              <Badge variant="secondary" className="px-3 py-1 cursor-default bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600">User Experience 💖</Badge>
              <Badge variant="secondary" className="px-3 py-1 cursor-default bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600">Modern Design ✨</Badge>
              <Badge variant="secondary" className="px-3 py-1 cursor-default bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600">Fast Delivery ⚡</Badge>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 