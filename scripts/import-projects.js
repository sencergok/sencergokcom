require('dotenv').config({ path: '.env.local' });
const contentfulManagement = require('contentful-management');

const projectsData = [
  {
    title: "KPSS GO: Soru ve Konu Anlatım",
    slug: "kpss-go",
    description: "KPSS sınavına hazırlananlar için kapsamlı soru bankası ve konu anlatım uygulaması. 30,000+ soru ile Türkiye'nin en büyük KPSS soru bankası.",
    category: "Education",
    features: [
      "30,000+ KPSS sorusu",
      "Video konu anlatımları",
      "Deneme sınavları",
      "İlerleme takibi",
      "Offline çalışma",
      "Kişiselleştirilmiş öğrenme",
      "Günlük hedefler",
      "Detaylı istatistikler"
    ],
    technologies: ["React Native", "TypeScript", "Firebase", "Redux", "Expo"],
    githubUrl: "",
    appStoreUrl: "https://apps.apple.com/tr/app/kpss-go-soru-ve-konu-anlat%C4%B1m/id6448265615",
    rating: 4.8,
    downloads: "50,000+",
    releaseDate: "2023-03-15",
    status: "published",
    featured: true,
    emoji: "📚",
    gradient: {
      from: "#667eea",
      to: "#764ba2"
    }
  },
  {
    title: "Medication Tracking & Reminder",
    slug: "medication-tracker",
    description: "İlaç zamanlarınızı takip edin ve asla unutmayın. Sağlıklı yaşam için akıllı hatırlatma sistemi.",
    category: "Health",
    features: [
      "Akıllı hatırlatmalar",
      "İlaç veritabanı",
      "Yan etki takibi",
      "Doktor paylaşımı",
      "Takvim entegrasyonu",
      "İstatistik raporları",
      "Aile üyesi desteği",
      "Apple Health entegrasyonu"
    ],
    technologies: ["Swift", "SwiftUI", "Core Data", "UserNotifications", "HealthKit"],
    githubUrl: "",
    appStoreUrl: "https://apps.apple.com/tr/app/medication-tracking-reminder/id6478264641",
    rating: 4.7,
    downloads: "25,000+",
    releaseDate: "2024-01-20",
    status: "published",
    featured: true,
    emoji: "💊",
    gradient: {
      from: "#fa709a",
      to: "#fee140"
    }
  },
  {
    title: "Water Remover Tool",
    slug: "water-remover",
    description: "Telefonunuzun hoparlöründen suyu çıkarmak için tasarlanmış ses frekansı uygulaması. Suya dayanıklı telefonlar için ideal.",
    category: "Lifestyle",
    features: [
      "Farklı frekans seçenekleri",
      "Otomatik temizleme",
      "Görsel animasyonlar",
      "Basit kullanım",
      "Hoparlör testi",
      "Su sensörü desteği",
      "Zamanlanmış temizlik",
      "Hızlı erişim widget'ı"
    ],
    technologies: ["Swift", "AVAudioEngine", "Core Animation", "SwiftUI"],
    githubUrl: "",
    appStoreUrl: "https://apps.apple.com/tr/app/water-remover-tool/id6479998186",
    rating: 4.5,
    downloads: "15,000+",
    releaseDate: "2024-02-10",
    status: "published",
    featured: false,
    emoji: "💧",
    gradient: {
      from: "#4facfe",
      to: "#00f2fe"
    }
  },
  {
    title: "Notishine",
    slug: "notishine",
    description: "Bildirimlerinizi özelleştirin ve telefon deneyiminizi geliştirin. Akıllı bildirim yönetimi.",
    category: "Lifestyle",
    features: [
      "Bildirim özelleştirme",
      "Akıllı filtreleme",
      "Zaman bazlı kurallar",
      "LED kontrolü",
      "Sesli bildirimler",
      "Görsel efektler",
      "Profil yönetimi",
      "Hızlı ayarlar"
    ],
    technologies: ["Kotlin", "Android SDK", "Material Design", "Room Database"],
    githubUrl: "",
    appStoreUrl: "https://apps.apple.com/tr/app/notishine/id6502517378",
    rating: 4.6,
    downloads: "20,000+",
    releaseDate: "2024-04-05",
    status: "published",
    featured: false,
    emoji: "✨",
    gradient: {
      from: "#a8edea",
      to: "#fed6e3"
    }
  },
  {
    title: "EhliyetBox: Ehliyet Sınav Soru",
    slug: "ehliyet-box",
    description: "Ehliyet sınavına hazırlık için güncel sorular ve simülasyon. B sınıfı ehliyet için kapsamlı hazırlık platformu.",
    category: "Education",
    features: [
      "Güncel ehliyet soruları",
      "Gerçekçi sınav simülasyonu",
      "Video çözümler",
      "Yanlış soru analizi",
      "İlerleme takibi",
      "Konu bazlı çalışma",
      "Deneme sınavları",
      "Başarı rozetleri"
    ],
    technologies: ["React Native", "TypeScript", "SQLite", "Expo", "Reanimated"],
    githubUrl: "",
    appStoreUrl: "https://apps.apple.com/tr/app/ehliyetbox-ehliyet-s%C4%B1nav-soru/id6449608114",
    rating: 4.9,
    downloads: "80,000+",
    releaseDate: "2023-05-12",
    status: "published",
    featured: true,
    emoji: "🚗",
    gradient: {
      from: "#ff9a9e",
      to: "#fecfef"
    }
  },
  {
    title: "Cooka",
    slug: "cooka-recipe-app",
    description: "Akıllı yemek tarifi uygulaması. Malzemelerinize göre tarif önerisi ve adım adım pişirme rehberi.",
    category: "Lifestyle",
    features: [
      "Malzeme bazlı tarif önerisi",
      "Adım adım rehber",
      "Video tarifler",
      "Alışveriş listesi",
      "Beslenme analizi",
      "Favoriler koleksiyonu",
      "Zamanlayıcı",
      "Sosyal paylaşım"
    ],
    technologies: ["Flutter", "Dart", "Firebase", "Machine Learning Kit", "Cloud Storage"],
    githubUrl: "",
    appStoreUrl: "https://apps.apple.com/tr/app/cooka/id6470141749",
    rating: 4.4,
    downloads: "12,000+",
    releaseDate: "2023-12-08",
    status: "published",
    featured: false,
    emoji: "👨‍🍳",
    gradient: {
      from: "#ffecd2",
      to: "#fcb69f"
    }
  },
  {
    title: "MasalAI: Sonsuz Masal Deneyimi",
    slug: "masal-ai",
    description: "Yapay zeka ile oluşturulan kişiselleştirilmiş masallar. Çocuklar için sonsuz hikaye dünyası.",
    category: "Entertainment",
    features: [
      "AI ile kişisel masallar",
      "İnteraktif hikayeler",
      "Görsel masal kitapları",
      "Sesli anlatım",
      "Karakter özelleştirme",
      "Ebeveyn kontrolü",
      "Offline okuma",
      "Çoklu dil desteği"
    ],
    technologies: ["SwiftUI", "Core ML", "OpenAI API", "AVFoundation", "CloudKit"],
    githubUrl: "",
    appStoreUrl: "https://apps.apple.com/tr/app/masalai-sonsuz-masal-deneyimi/id6463384847",
    rating: 4.8,
    downloads: "35,000+",
    releaseDate: "2023-10-20",
    status: "published",
    featured: true,
    emoji: "🧚‍♀️",
    gradient: {
      from: "#ff9a9e",
      to: "#ad5389"
    }
  }
];

async function importProjects() {
  try {
    console.log('🚀 Starting Contentful import...');
    
    // Environment variables'ları kontrol et
    const spaceId = process.env.CONTENTFUL_SPACE_ID;
    const accessToken = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
    
    if (!spaceId || !accessToken) {
      console.error('❌ Please set CONTENTFUL_SPACE_ID and CONTENTFUL_MANAGEMENT_TOKEN in your .env.local file');
      console.log('\nTo get your Management Token:');
      console.log('1. Go to https://app.contentful.com/spaces/' + (spaceId || 'YOUR_SPACE_ID') + '/api/cma_tokens');
      console.log('2. Create a new token');
      console.log('3. Add CONTENTFUL_MANAGEMENT_TOKEN=your_token to .env.local');
      process.exit(1);
    }

    // Contentful Management client oluştur
    const client = contentfulManagement.createClient({
      accessToken: accessToken,
    });

    // Space'i al
    const space = await client.getSpace(spaceId);
    const environment = await space.getEnvironment('master');

    console.log('✅ Connected to Contentful space:', spaceId);

    // Her proje için entry oluştur
    for (const project of projectsData) {
      try {
        console.log(`📝 Creating entry: ${project.title}`);
        
        const entry = await environment.createEntry('project', {
          fields: {
            title: {
              'en-US': project.title
            },
            slug: {
              'en-US': project.slug
            },
            description: {
              'en-US': project.description
            },
            category: {
              'en-US': project.category
            },
            features: {
              'en-US': project.features.join(', ')
            },
            technologies: {
              'en-US': project.technologies.join(', ')
            },
            appStoreUrl: {
              'en-US': project.appStoreUrl
            },
            rating: {
              'en-US': project.rating.toString()
            },
            downloads: {
              'en-US': project.downloads
            },
            releaseDate: {
              'en-US': project.releaseDate
            },
            status: {
              'en-US': 'Yayında'
            },
            featured: {
              'en-US': project.featured
            },
            emoji: {
              'en-US': project.emoji
            }
          }
        });

        // Entry'yi publish et
        await entry.publish();
        console.log(`✅ Published: ${project.title}`);
        
        // Rate limiting için kısa bekle
        await new Promise(resolve => setTimeout(resolve, 500));
        
      } catch (error) {
        console.error(`❌ Error creating ${project.title}:`, error.message);
        continue;
      }
    }

    console.log('\n🎉 Import completed successfully!');
    console.log('📱 You can now view your projects at: http://localhost:3000');
    
  } catch (error) {
    console.error('❌ Import failed:', error.message);
    process.exit(1);
  }
}

// Script'i çalıştır
importProjects(); 