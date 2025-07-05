# 📧 Contact Form Supabase Integration Setup

Bu dokümantasyon, iletişim formunuzun Supabase ile nasıl entegre edileceğini açıklar.

## 🚀 Kurulum Adımları

### 1. Supabase Projesi Oluşturma

1. [Supabase](https://supabase.com) hesabınıza gidin
2. "New Project" butonuna tıklayın
3. Proje adını ve şifreyi belirleyin
4. Database Region seçin (Europe West için `eu-west-1`)
5. Proje oluşturulana kadar bekleyin

### 2. Environment Variables Ayarları

`.env.local` dosyanızı güncelleyin:

```env
# Mevcut Contentful ayarları
CONTENTFUL_SPACE_ID=your_contentful_space_id
CONTENTFUL_ACCESS_TOKEN=your_contentful_access_token
CONTENTFUL_MANAGEMENT_TOKEN=your_contentful_management_token

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your_service_role_key_here
```

**Supabase değerlerini bulma:**
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase Dashboard > Settings > API > Project URL
- `SUPABASE_SERVICE_KEY`: Supabase Dashboard > Settings > API > Service Role Key

### 3. Database Tablosunu Oluşturma

1. Supabase Dashboard > SQL Editor'a gidin
2. `supabase-contact-form.sql` dosyasının içeriğini kopyalayın
3. SQL Editor'da çalıştırın

### 4. NPM Paketlerini Yükleme

```bash
npm install @supabase/supabase-js
```

## 📊 Tablo Yapısı

**Table Name:** `contact_messages`

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key (auto-generated) |
| `name` | VARCHAR(255) | Gönderenin adı |
| `email` | VARCHAR(255) | Email adresi |
| `subject` | VARCHAR(500) | Mesaj konusu |
| `message` | TEXT | Ana mesaj içeriği |
| `created_at` | TIMESTAMP | Oluşturulma zamanı |
| `updated_at` | TIMESTAMP | Güncellenme zamanı |
| `status` | VARCHAR(50) | Mesaj durumu (unread, read, replied, archived, spam) |
| `ip_address` | INET | Gönderenin IP adresi |
| `user_agent` | TEXT | Browser bilgisi |
| `is_read` | BOOLEAN | Okundu/okunmadı |
| `admin_notes` | TEXT | Admin notları |

## 🔒 Güvenlik Özellikleri

### Rate Limiting
- Her IP için **saatte 10 mesaj** sınırı
- Memory cache ile basit rate limiting

### Input Validation
- Email format kontrolü
- Karakter uzunluğu sınırları
- HTML tag sanitization

### Database Security
- Row Level Security (RLS) aktif
- Sadece insert işlemi herkese açık
- Read/Update/Delete sadece admin

## 🛡️ Row Level Security Policies

```sql
-- Herkes mesaj gönderebilir
CREATE POLICY "Anyone can insert contact messages" ON contact_messages
    FOR INSERT WITH CHECK (true);

-- Sadece admin okuyabilir
CREATE POLICY "Only admin can read contact messages" ON contact_messages
    FOR SELECT USING (auth.role() = 'admin');
```

## 📈 Admin Dashboard Views

### 1. **contact_messages_admin** - Yönetim paneli için
- Mesaj önizleme ile liste
- Kolay yönetim için optimize edilmiş

### 2. **contact_stats** - İstatistikler
- Toplam mesaj sayısı
- Okunmamış mesajlar
- Son 24 saat/hafta/ay istatistikleri

### 3. **contact_rate_limit** - Rate limiting
- IP bazlı istek sayısı
- Spam koruması

## 🔧 API Endpoints

### POST /api/contact
Form gönderimi için ana endpoint

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Proje Hakkında",
  "message": "Merhaba! Projelerinizi inceledim..."
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Mesajınız başarıyla gönderildi!",
  "data": {
    "id": "uuid",
    "created_at": "2024-01-01T12:00:00Z"
  }
}
```

**Error Response:**
```json
{
  "error": "Tüm alanlar zorunludur.",
  "code": "MISSING_FIELDS"
}
```

### GET /api/contact
API health check endpoint

**Response:**
```json
{
  "status": "ok",
  "message": "Contact API is working",
  "database_status": "connected",
  "total_messages": 42
}
```

## 🎯 Error Codes

| Code | Description |
|------|-------------|
| `MISSING_FIELDS` | Eksik form alanları |
| `INVALID_EMAIL` | Geçersiz email formatı |
| `INPUT_TOO_LONG` | Girilen veri çok uzun |
| `RATE_LIMIT_EXCEEDED` | Çok fazla istek |
| `DATABASE_ERROR` | Veritabanı hatası |
| `INTERNAL_ERROR` | Sunucu hatası |

## 🧪 Test Etme

### 1. API Health Check
```bash
curl https://your-domain.com/api/contact
```

### 2. Test Form Submission
```bash
curl -X POST https://your-domain.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Subject",
    "message": "Test message"
  }'
```

### 3. Database Query
```sql
-- Supabase SQL Editor'da
SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT 10;
```

## 📋 Checklist

- [ ] Supabase projesi oluşturuldu
- [ ] Environment variables ayarlandı
- [ ] Database tablosu oluşturuldu
- [ ] NPM paketleri yüklendi
- [ ] API endpoint test edildi
- [ ] Form gönderimi test edildi
- [ ] Supabase dashboard'da veriler görüldü

## 🎨 Özelleştirme

### Rate Limiting Değiştirme
`src/app/api/contact/route.ts` dosyasında:
```typescript
const maxRequests = 10 // Bu değeri değiştirin
const resetTime = now + 60 * 60 * 1000 // 1 saat
```

### Validation Kuralları
```typescript
// Email regex'i özelleştirin
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/

// Uzunluk sınırlarını değiştirin
if (name.length > 255 || subject.length > 500 || message.length > 5000)
```

## 🔍 Monitoring

### Supabase Dashboard
- Database > Tables > contact_messages
- Logs > Database logs
- Auth > Users (eğer authentication eklerseniz)

### Next.js Logs
```bash
# Development
npm run dev

# Production logs
npm run build
npm start
```

## 📞 Support

Bu entegrasyon hakkında sorularınız varsa:
- GitHub Issues açın
- Documentation'ı kontrol edin
- Supabase Community'ye sorun

---

**✨ Artık iletişim formunuz tam olarak çalışıyor ve tüm mesajlar Supabase'de güvenli bir şekilde saklanıyor!** 