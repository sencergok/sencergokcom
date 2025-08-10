'use client'

import { ExternalLink, ArrowRight } from 'lucide-react'
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

  // intentionally simplified hero; fun facts removed

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div className="container mx-auto px-4 pt-28 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left: Text */}
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Yeni projelere açık
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Sade, hızlı ve kullanıcı odaklı ürünler geliştiriyorum.
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl">
              React, React Native ve Swift ile modern arayüzler ve App Store’da yayınlanan mobil uygulamalar.
            </p>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <Badge key={skill} variant="outline" className="px-3 py-1 text-xs border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900">
                  {skill}
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-3 pt-2">
              <Button
                size="lg"
                className="rounded-md bg-gray-900 text-white hover:bg-black dark:bg-white dark:text-black dark:hover:bg-gray-200"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                İletişime Geç
                <ArrowRight className="ml-2" size={18} />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-md"
                onClick={() => {
                  const link = document.createElement('a')
                  link.href = '/SencerGok_Ozgecmis.pdf'
                  link.download = 'SencerGok_Ozgecmis.pdf'
                  link.target = '_blank'
                  document.body.appendChild(link)
                  link.click()
                  document.body.removeChild(link)
                }}
              >
                Özgeçmiş
              </Button>
            </div>
          </div>
          {/* Right: Minimal panel */}
          <div className="relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">App Store</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">7+ Uygulama</div>
              </div>
              <a
                href="https://apps.apple.com/us/developer/sencer-gok/id1777568061"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                Eserleri Gör
                <ExternalLink className="ml-1" size={16} />
              </a>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900">
                <div className="text-2xl font-semibold">10K+</div>
                <div className="text-xs text-gray-500">Kullanıcı</div>
              </div>
              <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900">
                <div className="text-2xl font-semibold">3+</div>
                <div className="text-xs text-gray-500">Yıl</div>
              </div>
              <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900">
                <div className="text-2xl font-semibold">7+</div>
                <div className="text-xs text-gray-500">Uygulama</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 