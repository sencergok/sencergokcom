'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Code, Smartphone, Globe, Users, Award, TrendingUp, Coffee } from 'lucide-react'
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
        { name: 'Supabase', level: 85 },
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
      description: 'App Store\'da yayınlanan uygulamalar',
      color: 'text-gray-900 dark:text-white',
      bgColor: 'bg-gray-100 dark:bg-gray-800'
    },
    {
      icon: Users,
      title: '10K+ Kullanıcı',
      description: 'Kullanıcı tabanı',
      color: 'text-gray-900 dark:text-white',
      bgColor: 'bg-gray-100 dark:bg-gray-800'
    },
    {
      icon: TrendingUp,
      title: '3+ Yıl Deneyim',
      description: 'Sürekli öğrenme ve gelişim',
      color: 'text-gray-900 dark:text-white',
      bgColor: 'bg-gray-100 dark:bg-gray-800'
    },
    {
      icon: Coffee,
      title: '1000+ Kahve',
      description: 'Tutku ve disiplin',
      color: 'text-gray-900 dark:text-white',
      bgColor: 'bg-gray-100 dark:bg-gray-800'
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
            <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-medium border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 cursor-default">
              Çalışma Prensipleri
            </Badge>
          </motion.div>
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Nasıl Çalışırım
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            Hedefe odaklı, sade ve sürdürülebilir çözümler üretirim. Ölçeklenebilirlik, performans ve erişilebilirlik önceliğimdir.
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
              Temel İlkeler
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Her projede öncelik verdiğim prensipler
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {personalityTraits.map((trait) => (
              <motion.div
                key={trait.title}
                variants={itemVariants}
                className="cursor-default"
              >
                <Card className="p-6 h-full border rounded-xl bg-white dark:bg-gray-900">
                  <div className="text-center space-y-4">
                    <div className="text-xs text-gray-500 dark:text-gray-400">İlke</div>
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
              className="cursor-default"
            >
              <Card className="p-6 h-full border rounded-xl bg-white dark:bg-gray-900">
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
                <Card className="p-6 h-full border rounded-xl bg-white dark:bg-gray-900">
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
                            className={`h-full rounded-full bg-gray-900 dark:bg-white`}
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

      </div>
    </section>
  )
} 