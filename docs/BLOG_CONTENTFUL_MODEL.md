# Blog Contentful Model Setup

Bu dokümantasyon, blog sistemi için gereken Contentful content modellerinin kurulumunu açıklar.

## 1. Blog Post Content Model

### Content Model ID: `blogPost`

#### Fields:

1. **Title** 
   - Field ID: `title`
   - Type: Short text
   - Required: Yes
   - Help text: Blog yazısının başlığı

2. **Slug**
   - Field ID: `slug` 
   - Type: Short text
   - Required: Yes
   - Unique: Yes
   - Help text: URL için kullanılacak slug (örn: "merhaba-dunya")

3. **Content**
   - Field ID: `content`
   - Type: Rich text
   - Required: Yes
   - Help text: Blog yazısının ana içeriği

4. **Excerpt** (REMOVED)
   - ~~Field ID: `excerpt`~~
   - ~~Type: Long text~~
   - ~~Required: Yes~~
   - ~~Max length: 300 characters~~
   - ~~Help text: Yazının kısa özeti (listede gösterilecek)~~
   - **Note**: Bu field kaldırıldı. Excerpt otomatik olarak content'ten generate ediliyor.

5. **Featured Image**
   - Field ID: `featuredImage`
   - Type: Media (one file)
   - Required: No
   - Validation: Images only
   - Help text: Yazının kapak görseli

6. **Tags**
   - Field ID: `tags`
   - Type: Short text (list)
   - Required: No
   - Help text: Yazı etiketleri (örn: React, JavaScript)

7. **Published Date**
   - Field ID: `publishedDate`
   - Type: Date & time
   - Required: Yes
   - Help text: Yazının yayın tarihi

8. **Reading Time**
   - Field ID: `readingTime`
   - Type: Integer
   - Required: No
   - Help text: Tahmini okuma süresi (dakika)

9. **SEO Title**
   - Field ID: `seoTitle`
   - Type: Short text
   - Required: No
   - Max length: 60 characters
   - Help text: SEO için özel başlık

10. **SEO Description**
    - Field ID: `seoDescription`
    - Type: Long text
    - Required: No
    - Max length: 160 characters
    - Help text: SEO için meta açıklama

11. **Author**
    - Field ID: `author`
    - Type: Short text
    - Required: No
    - Default value: "Sencer Gök"
    - Help text: Yazı yazarı

12. **Status**
    - Field ID: `status`
    - Type: Short text
    - Required: Yes
    - Default value: "draft"
    - Validation: Only allow "draft" or "published"
    - Help text: Yazı durumu

---

## 2. Blog Category Content Model (Opsiyonel)

### Content Model ID: `blogCategory`

#### Fields:

1. **Name**
   - Field ID: `name`
   - Type: Short text
   - Required: Yes
   - Help text: Kategori adı

2. **Slug**
   - Field ID: `slug`
   - Type: Short text
   - Required: Yes
   - Unique: Yes
   - Help text: URL için kategori slug'ı

3. **Description**
   - Field ID: `description`
   - Type: Long text
   - Required: No
   - Help text: Kategori açıklaması

4. **Color**
   - Field ID: `color`
   - Type: Short text
   - Required: No
   - Help text: Kategori rengi (hex kodu)

---

## 3. Contentful Content Model JSON (Import için)

Aşağıdaki JSON'ları Contentful'da Content Model Management API ile import edebilirsiniz:

### Blog Post Model JSON:

```json
{
  "sys": {
    "id": "blogPost",
    "type": "ContentType"
  },
  "name": "Blog Post",
  "fields": [
    {
      "id": "title",
      "name": "Title",
      "type": "Symbol",
      "required": true
    },
    {
      "id": "slug",
      "name": "Slug",
      "type": "Symbol",
      "required": true,
      "unique": true
    },
    {
      "id": "content",
      "name": "Content",
      "type": "RichText",
      "required": true
    },
    // Excerpt field removed - now auto-generated from content
    {
      "id": "featuredImage",
      "name": "Featured Image",
      "type": "Link",
      "linkType": "Asset",
      "required": false
    },
    {
      "id": "tags",
      "name": "Tags",
      "type": "Array",
      "items": {
        "type": "Symbol"
      },
      "required": false
    },
    {
      "id": "publishedDate",
      "name": "Published Date",
      "type": "Date",
      "required": true
    },
    {
      "id": "readingTime",
      "name": "Reading Time",
      "type": "Integer",
      "required": false
    },
    {
      "id": "seoTitle",
      "name": "SEO Title",
      "type": "Symbol",
      "required": false,
      "validations": [
        {
          "size": {
            "max": 60
          }
        }
      ]
    },
    {
      "id": "seoDescription",
      "name": "SEO Description",
      "type": "Text",
      "required": false,
      "validations": [
        {
          "size": {
            "max": 160
          }
        }
      ]
    },
    {
      "id": "author",
      "name": "Author",
      "type": "Symbol",
      "required": false
    },
    {
      "id": "status",
      "name": "Status",
      "type": "Symbol",
      "required": true,
      "validations": [
        {
          "in": ["draft", "published"]
        }
      ]
    }
  ],
  "displayField": "title"
}
```

### Blog Category Model JSON:

```json
{
  "sys": {
    "id": "blogCategory",
    "type": "ContentType"
  },
  "name": "Blog Category",
  "fields": [
    {
      "id": "name",
      "name": "Name",
      "type": "Symbol",
      "required": true
    },
    {
      "id": "slug",
      "name": "Slug",
      "type": "Symbol",
      "required": true,
      "unique": true
    },
    {
      "id": "description",
      "name": "Description",
      "type": "Text",
      "required": false
    },
    {
      "id": "color",
      "name": "Color",
      "type": "Symbol",
      "required": false
    }
  ],
  "displayField": "name"
}
```

---

## 4. Kurulum Adımları

### Adım 1: Content Model Oluşturma
1. Contentful Dashboard'a gidin
2. Your Space > Content model'e gidin
3. "Add content type" butonuna tıklayın
4. Yukarıdaki field'ları tek tek ekleyin

### Adım 2: İlk Blog Yazısı Oluşturma
1. Content'e gidin
2. "Add entry" > "Blog Post" seçin
3. Alanları doldurun:
   - Title: "Merhaba Blog Dünyası!"
   - Slug: "merhaba-blog-dunyasi"
   - Content: Rich text editörde yazınızı yazın
   - ~~Excerpt: "Bu benim ilk blog yazım..."~~ (Artık otomatik generate ediliyor)
   - Tags: ["React", "Next.js", "Blog"]
   - Published Date: Bugünün tarihi
   - Status: "published"

### Adım 3: Yayınlama
1. Sağ üst köşedeki "Publish" butonuna tıklayın
2. Website'inizi kontrol edin: `/blog`

---

## 5. Örnek Blog Yazısı İçeriği

```markdown
# Merhaba Blog Dünyası! 👋

Bu benim yeni blog alanımın ilk yazısı. Burada yazılım geliştirme maceramı, öğrendiklerimi ve deneyimlerimi paylaşacağım.

## Neler Yazacağım?

- **React ve Next.js** projeleri
- **Mobile Development** deneyimleri  
- **iOS Development** hikayeleri
- **UI/UX Design** ipuçları
- **Kahve & Kod** kombinasyonları ☕

Umarım yazılarım faydalı olur! Kahve molalarınızda okumaya değer içerikler üretmeye çalışacağım.

**Happy coding!** 🚀
```

---

## 6. SEO ve Performans

- Her blog yazısı için benzersiz slug kullanın
- SEO title ve description alanlarını doldurun
- Featured image ekleyin (optimal boyut: 1200x630px)
- Reading time'ı hesaplayın (kelime sayısı / 200)
- Tags kullanarak kategorilendirin

---

## 7. Deployment

Blog sistemi otomatik olarak:
- `/blog` - Blog ana sayfası
- `/blog/[slug]` - Blog yazısı detay sayfası

Build time'da static generation ile oluşturulur ve 1 saatte bir revalidate edilir. 