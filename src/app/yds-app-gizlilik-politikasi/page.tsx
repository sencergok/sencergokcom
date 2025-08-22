'use client';
import { useState } from 'react';
import Head from 'next/head';

export default function YDSPrivacy() {
  const [language, setLanguage] = useState('tr');

  return (
    <div className="container">
      <Head>
        <title>YDS Sınav Soruları Gizlilik Politikası | YDS Exam Questions Privacy Policy</title>
        <meta name="description" content="YDS Sınav Soruları Uygulaması Gizlilik Politikası" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <div className="header">
          <h1 className="title">
            {language === 'tr' ? 'YDS Sınav Soruları Gizlilik Politikası' : 'YDS Exam Questions Privacy Policy'}
          </h1>
          <div className="language-selector">
            <button 
              onClick={() => setLanguage('tr')} 
              className={language === 'tr' ? 'active' : ''}
            >
              Türkçe
            </button>
            <button 
              onClick={() => setLanguage('en')} 
              className={language === 'en' ? 'active' : ''}
            >
              English
            </button>
          </div>
        </div>

        <div className="content">
          {language === 'tr' ? (
            <div>
              <p className="last-updated">Son Güncelleme: 31.07.2025</p>
              
              <p>Bu gizlilik politikası, YDS Sınav Soruları uygulamasının (&ldquo;Uygulama&rdquo;) kullanıcılarının gizliliğini korumak amacıyla hazırlanmıştır. Bu politika, uygulamanın veri kullanımını ve gizlilik uygulamalarını açıklar.</p>

              <section className="section">
                <h2>1. VERİ TOPLAMA POLİTİKASI</h2>
                <p>YDS Sınav Soruları uygulaması, kullanıcı gizliliğini korumak amacıyla hiçbir kişisel veri toplamaz veya sunuculara göndermez. Tüm veriler sadece cihazınızda yerel olarak saklanır.</p>
              </section>

              <section className="section">
                <h2>2. YEREL VERİ SAKLAMA</h2>
                
                <h3>2.1 Saklanan Veriler</h3>
                <p>Uygulama, sadece cihazınızda aşağıdaki verileri yerel olarak saklar:</p>
                <ul>
                  <li>Adınız (onboarding sürecinde girilen)</li>
                  <li>Test çözme geçmişiniz</li>
                  <li>Başarı istatistikleriniz</li>
                  <li>Uygulama tercihleriniz ve ayarlarınız</li>
                  <li>Kelime kartları ve favori kelimeleriniz</li>
                  <li>İlerleme verileriniz</li>
                </ul>

                <h3>2.2 Veri Saklama Yeri</h3>
                <ul>
                  <li>Tüm veriler cihazınızın yerel depolama alanında saklanır</li>
                  <li>Veriler hiçbir sunucuya gönderilmez</li>
                  <li>Veriler sadece sizin cihazınızda bulunur</li>
                  <li>Uygulama silindiğinde veriler de silinir</li>
                </ul>
              </section>

              <section className="section">
                <h2>3. VERİ KULLANIM AMAÇLARI</h2>
                
                <h3>3.1 Yerel Kullanım</h3>
                <p>Yerel olarak saklanan veriler aşağıdaki amaçlarla kullanılır:</p>
                <ul>
                  <li>Kişiselleştirilmiş öğrenme deneyimi sağlama</li>
                  <li>İlerleme takibi ve raporlama</li>
                  <li>Uygulama ayarlarının hatırlanması</li>
                  <li>Test sonuçlarının görüntülenmesi</li>
                </ul>

                <h3>3.2 Veri Analizi</h3>
                <ul>
                  <li>Hiçbir veri analiz için sunuculara gönderilmez</li>
                  <li>Tüm analizler cihazınızda yerel olarak yapılır</li>
                  <li>Kullanıcı davranışları takip edilmez</li>
                </ul>
              </section>

              <section className="section">
                <h2>4. VERİ PAYLAŞIMI</h2>
                
                <h3>4.1 Veri Paylaşım Politikası</h3>
                <ul>
                  <li>Hiçbir kişisel veri üçüncü taraflarla paylaşılmaz</li>
                  <li>Veriler sunuculara gönderilmez</li>
                  <li>Kullanıcı verileri sadece cihazda saklanır</li>
                </ul>

                <h3>4.2 Üçüncü Taraf Hizmetler</h3>
                <p>Uygulama, sadece aşağıdaki hizmetleri kullanır:</p>
                <ul>
                  <li>App Store: Uygulama dağıtımı ve ödeme işlemleri</li>
                  <li>RevenueCat: Premium abonelik yönetimi (sadece ödeme bilgileri)</li>
                </ul>
                <p>Bu hizmetler sadece ödeme işlemleri için kullanılır, kişisel öğrenme verilerinize erişmez.</p>

                <h3>4.3 Yasal Zorunluluklar</h3>
                <p>Yerel verileriniz sadece aşağıdaki durumlarda erişilebilir:</p>
                <ul>
                  <li>Cihazınızın yasal olarak incelenmesi durumunda</li>
                  <li>Mahkeme kararlarına uyum gerektiğinde</li>
                </ul>
              </section>

              <section className="section">
                <h2>5. VERİ GÜVENLİĞİ</h2>
                
                <h3>5.1 Yerel Güvenlik</h3>
                <p>Verileriniz cihazınızda güvenli şekilde saklanır:</p>
                <ul>
                  <li>iOS&apos;un yerleşik güvenlik özellikleri kullanılır</li>
                  <li>Veriler cihazınızın şifrelenmiş depolama alanında saklanır</li>
                  <li>Uygulama sandbox güvenlik modeli kullanır</li>
                </ul>

                <h3>5.2 Veri Koruma</h3>
                <ul>
                  <li>Veriler sadece sizin cihazınızda bulunur</li>
                  <li>Hiçbir veri internet üzerinden gönderilmez</li>
                  <li>Cihazınızın güvenlik ayarları verilerinizi korur</li>
                </ul>
              </section>

              <section className="section">
                <h2>6. KULLANICI HAKLARI</h2>
                
                <h3>6.1 Veri Kontrolü</h3>
                <p>Aşağıdaki haklara sahipsiniz:</p>
                <ul>
                  <li>Verilerinizi uygulama içinden görüntüleme</li>
                  <li>Verilerinizi düzenleme ve güncelleme</li>
                  <li>Tüm verilerinizi silme (uygulama ayarlarından)</li>
                  <li>Uygulama tercihlerinizi değiştirme</li>
                </ul>

                <h3>6.2 Veri Yönetimi</h3>
                <ul>
                  <li>Verileriniz tamamen sizin kontrolünüzdedir</li>
                  <li>Uygulama silindiğinde tüm veriler silinir</li>
                  <li>Veri yedekleme sizin sorumluluğunuzdadır</li>
                </ul>
              </section>

              <section className="section">
                <h2>7. ÇOCUKLARIN GİZLİLİĞİ</h2>
                <ul>
                  <li>13 yaş altı kullanıcılar için özel koruma</li>
                  <li>Hiçbir kişisel veri toplanmaz</li>
                  <li>Ebeveyn kontrolü ve onayı önerilir</li>
                  <li>Çocuk kullanıcılar için güvenli öğrenme ortamı</li>
                </ul>
              </section>

              <section className="section">
                <h2>8. TAKİP VE ÇEREZLER</h2>
                <ul>
                  <li>Kullanıcı takibi yapılmaz</li>
                  <li>Çerezler kullanılmaz</li>
                  <li>Reklam takibi yapılmaz</li>
                  <li>Analitik veri toplanmaz</li>
                </ul>
              </section>

              <section className="section">
                <h2>9. VERİ TRANSFERİ</h2>
                <ul>
                  <li>Hiçbir veri transfer edilmez</li>
                  <li>Veriler sadece cihazınızda saklanır</li>
                  <li>Uluslararası veri transferi yoktur</li>
                </ul>
              </section>

              <section className="section">
                <h2>10. POLİTİKA DEĞİŞİKLİKLERİ</h2>
                <ul>
                  <li>Bu politika güncellenebilir</li>
                  <li>Önemli değişiklikler kullanıcılara bildirilir</li>
                  <li>Güncel politika uygulama içinde mevcuttur</li>
                  <li>Değişiklikler bu sayfada yayınlanır</li>
                </ul>
              </section>

              <section className="section">
                <h2>11. İLETİŞİM</h2>
                <p>Gizlilik ile ilgili sorularınız, önerileriniz veya şikayetleriniz için:</p>
                <p><strong>E-posta:</strong> sencergok@outlook.com</p>
                <p><strong>Web Sitesi:</strong> https://www.sencergok.com</p>
              </section>

              <section className="section">
                <h2>12. YASAL UYARILAR</h2>
                <p>Bu gizlilik politikası, Türkiye Cumhuriyeti mevzuatına uygun olarak hazırlanmıştır. Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında, veri sorumlusu olarak yukarıda belirtilen iletişim bilgileri üzerinden ulaşabilirsiniz.</p>
              </section>

              <section className="section">
                <h2>13. SORUMLULUK SINIRLAMASI</h2>
                <p>Bu gizlilik politikası, uygulama kullanımı sırasında toplanan veriler için geçerlidir. Üçüncü taraf web siteleri veya uygulamalar için sorumluluk kabul edilmez.</p>
              </section>

              <section className="section">
                <p>Bu gizlilik politikasını kabul ederek uygulamayı kullanmaya devam edebilirsiniz. Politikayı kabul etmiyorsanız, uygulamayı kullanmayı durdurunuz.</p>
              </section>

              <div className="footer-note">
                <p>---</p>
                <p><strong>YDS Sınav Soruları Gizlilik Politikası v1.0</strong></p>
                <p><strong>Son Güncelleme:</strong> 31.07.2025</p>
              </div>
            </div>
          ) : (
            <div>
              <p className="last-updated">Last updated: July 31, 2025</p>
              
              <p>This privacy policy has been prepared to protect the privacy of users of the YDS Exam Questions application (&ldquo;Application&rdquo;). This policy explains the application&apos;s data usage and privacy practices.</p>

              <section className="section">
                <h2>1. DATA COLLECTION POLICY</h2>
                <p>The YDS Exam Questions application does not collect or send any personal data to servers in order to protect user privacy. All data is stored locally only on your device.</p>
              </section>

              <section className="section">
                <h2>2. LOCAL DATA STORAGE</h2>
                
                <h3>2.1 Stored Data</h3>
                <p>The application stores only the following data locally on your device:</p>
                <ul>
                  <li>Your name (entered during onboarding)</li>
                  <li>Your test solving history</li>
                  <li>Your success statistics</li>
                  <li>Your application preferences and settings</li>
                  <li>Word cards and favorite words</li>
                  <li>Your progress data</li>
                </ul>

                <h3>2.2 Data Storage Location</h3>
                <ul>
                  <li>All data is stored in your device&apos;s local storage area</li>
                  <li>Data is not sent to any server</li>
                  <li>Data exists only on your device</li>
                  <li>When the application is deleted, the data is also deleted</li>
                </ul>
              </section>

              <section className="section">
                <h2>3. DATA USAGE PURPOSES</h2>
                
                <h3>3.1 Local Usage</h3>
                <p>Locally stored data is used for the following purposes:</p>
                <ul>
                  <li>Providing personalized learning experience</li>
                  <li>Progress tracking and reporting</li>
                  <li>Remembering application settings</li>
                  <li>Displaying test results</li>
                </ul>

                <h3>3.2 Data Analysis</h3>
                <ul>
                  <li>No data is sent to servers for analysis</li>
                  <li>All analysis is done locally on your device</li>
                  <li>User behaviors are not tracked</li>
                </ul>
              </section>

              <section className="section">
                <h2>4. DATA SHARING</h2>
                
                <h3>4.1 Data Sharing Policy</h3>
                <ul>
                  <li>No personal data is shared with third parties</li>
                  <li>Data is not sent to servers</li>
                  <li>User data is stored only on the device</li>
                </ul>

                <h3>4.2 Third Party Services</h3>
                <p>The application only uses the following services:</p>
                <ul>
                  <li>App Store: Application distribution and payment processing</li>
                  <li>RevenueCat: Premium subscription management (payment information only)</li>
                </ul>
                <p>These services are used only for payment processing and do not access your personal learning data.</p>

                <h3>4.3 Legal Obligations</h3>
                <p>Your local data is accessible only in the following cases:</p>
                <ul>
                  <li>When your device is legally examined</li>
                  <li>When compliance with court orders is required</li>
                </ul>
              </section>

              <section className="section">
                <h2>5. DATA SECURITY</h2>
                
                <h3>5.1 Local Security</h3>
                <p>Your data is stored securely on your device:</p>
                <ul>
                  <li>iOS built-in security features are used</li>
                  <li>Data is stored in your device&apos;s encrypted storage area</li>
                  <li>The application uses sandbox security model</li>
                </ul>

                <h3>5.2 Data Protection</h3>
                <ul>
                  <li>Data exists only on your device</li>
                  <li>No data is sent over the internet</li>
                  <li>Your device&apos;s security settings protect your data</li>
                </ul>
              </section>

              <section className="section">
                <h2>6. USER RIGHTS</h2>
                
                <h3>6.1 Data Control</h3>
                <p>You have the following rights:</p>
                <ul>
                  <li>View your data within the application</li>
                  <li>Edit and update your data</li>
                  <li>Delete all your data (from application settings)</li>
                  <li>Change your application preferences</li>
                </ul>

                <h3>6.2 Data Management</h3>
                <ul>
                  <li>Your data is completely under your control</li>
                  <li>When the application is deleted, all data is deleted</li>
                  <li>Data backup is your responsibility</li>
                </ul>
              </section>

              <section className="section">
                <h2>7. CHILDREN&apos;S PRIVACY</h2>
                <ul>
                  <li>Special protection for users under 13</li>
                  <li>No personal data is collected</li>
                  <li>Parental control and approval is recommended</li>
                  <li>Safe learning environment for child users</li>
                </ul>
              </section>

              <section className="section">
                <h2>8. TRACKING AND COOKIES</h2>
                <ul>
                  <li>No user tracking is performed</li>
                  <li>No cookies are used</li>
                  <li>No advertising tracking is performed</li>
                  <li>No analytics data is collected</li>
                </ul>
              </section>

              <section className="section">
                <h2>9. DATA TRANSFER</h2>
                <ul>
                  <li>No data is transferred</li>
                  <li>Data is stored only on your device</li>
                  <li>No international data transfer</li>
                </ul>
              </section>

              <section className="section">
                <h2>10. POLICY CHANGES</h2>
                <ul>
                  <li>This policy may be updated</li>
                  <li>Important changes are notified to users</li>
                  <li>Current policy is available within the application</li>
                  <li>Changes are published on this page</li>
                </ul>
              </section>

              <section className="section">
                <h2>11. CONTACT</h2>
                <p>For your questions, suggestions or complaints regarding privacy:</p>
                <p><strong>Email:</strong> sencergok@outlook.com</p>
                <p><strong>Website:</strong> https://www.sencergok.com</p>
              </section>

              <section className="section">
                <h2>12. LEGAL NOTICES</h2>
                <p>This privacy policy has been prepared in accordance with the legislation of the Republic of Turkey. Within the scope of the Personal Data Protection Law (KVKK), you can reach us as the data controller through the contact information specified above.</p>
              </section>

              <section className="section">
                <h2>13. LIABILITY LIMITATION</h2>
                <p>This privacy policy is valid for data collected during application use. No responsibility is accepted for third-party websites or applications.</p>
              </section>

              <section className="section">
                <p>By accepting this privacy policy, you can continue to use the application. If you do not accept the policy, stop using the application.</p>
              </section>

              <div className="footer-note">
                <p>---</p>
                <p><strong>YDS Exam Questions Privacy Policy v1.0</strong></p>
                <p><strong>Last Update:</strong> July 31, 2025</p>
              </div>
            </div>
          )}
        </div>
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          max-width: 800px;
          margin: 0 auto;
        }

        .main {
          padding: 2rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .header {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 2rem;
          border-bottom: 1px solid #eaeaea;
          padding-bottom: 1.5rem;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 2.5rem;
          text-align: center;
          color: #333;
          margin-bottom: 1rem;
        }

        .language-selector {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }

        .language-selector button {
          padding: 0.5rem 1rem;
          font-size: 1rem;
          border: 1px solid #ddd;
          border-radius: 5px;
          background: white;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .language-selector button.active {
          background: #59C2C1;
          color: white;
          border-color: #59C2C1;
        }

        .content {
          padding: 0 1rem;
        }

        .last-updated {
          font-style: italic;
          color: #666;
          margin-bottom: 2rem;
        }

        .section {
          margin-bottom: 2rem;
        }

        h2 {
          color: #444;
          margin-top: 1.5rem;
          margin-bottom: 1rem;
          font-size: 1.5rem;
        }

        h3 {
          color: #555;
          margin-top: 1.2rem;
          margin-bottom: 0.8rem;
          font-size: 1.2rem;
        }

        p {
          line-height: 1.6;
          font-size: 1.1rem;
          color: #333;
          margin: 0.75rem 0;
        }

        ul {
          padding-left: 1.5rem;
        }

        li {
          margin: 0.5rem 0;
          line-height: 1.6;
          font-size: 1.1rem;
        }

        .footer-note {
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid #eaeaea;
          text-align: center;
          font-style: italic;
          color: #666;
        }

        @media (max-width: 600px) {
          .title {
            font-size: 1.8rem;
          }

          .content {
            padding: 0 0.5rem;
          }

          h2 {
            font-size: 1.3rem;
          }

          h3 {
            font-size: 1.1rem;
          }

          p, li {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
}