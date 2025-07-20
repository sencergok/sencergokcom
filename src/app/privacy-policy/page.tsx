'use client';
import { useState } from 'react';
import Head from 'next/head';

export default function Privacy() {
  const [language, setLanguage] = useState('tr');

  return (
    <div className="container">
      <Head>
        <title>Gizlilik Politikası | Privacy Policy</title>
        <meta name="description" content="İlaç Takip Uygulaması Gizlilik Politikası" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <div className="header">
          <h1 className="title">
            {language === 'tr' ? 'Gizlilik Politikası' : 'Privacy Policy'}
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
              <p className="last-updated">Son güncelleme: 15 Mayıs 2025</p>
              
              <section className="section">
                <h2>Giriş</h2>
                <p>İlaç Takip Uygulamamız, ilaçlarınızı takip etmenize ve hatırlatmalar ayarlamanıza yardımcı olan bir hizmettir. Gizliliğiniz bizim için önemlidir.</p>
                <p>Bu Gizlilik Politikası, uygulamayı kullanımınız sırasında hiçbir veri toplamadığımızı açıklamaktadır.</p>
              </section>

              <section className="section">
                <h2>Veri Toplama</h2>
                <p>İlaç Takip Uygulamamız hiçbir kişisel veriyi toplamaz, saklamaz veya üçüncü taraflarla paylaşmaz.</p>
                <p>Eklediğiniz tüm ilaçlar ve hatırlatıcılar yalnızca kendi cihazınızda saklanır ve sunucularımıza gönderilmez.</p>
              </section>

              <section className="section">
                <h2>Cihaz İzinleri</h2>
                <p>Uygulamamız yalnızca aşağıdaki izinleri kullanır:</p>
                <ul>
                  <li><strong>Bildirim İzni:</strong> Size zamanında ilaç hatırlatmaları göndermek için</li>
                </ul>
                <p>Bu izinler, belirtilen amacın dışında herhangi bir veri toplamak için kullanılmaz.</p>
              </section>

              <section className="section">
                <h2>Verilerinizin Güvenliği</h2>
                <p>Tüm verileriniz yalnızca cihazınızda yerel olarak saklanır ve herhangi bir sunucuya gönderilmez.</p>
                <p>Cihazınızı ve uygulamayı korumak sizin sorumluluğunuzdadır.</p>
              </section>

              <section className="section">
                <h2>Değişiklikler</h2>
                <p>Bu gizlilik politikasını herhangi bir zamanda güncelleme hakkını saklı tutarız. Değişiklikler, bu sayfada yayınlandıktan sonra geçerli olacaktır.</p>
              </section>

              <section className="section">
                <h2>İletişim</h2>
                <p>Bu gizlilik politikası hakkında herhangi bir sorunuz varsa, lütfen bizimle sencergok@outlook.com adresinden iletişime geçin.</p>
              </section>
            </div>
          ) : (
            <div>
              <p className="last-updated">Last updated: May 15, 2025</p>
              
              <section className="section">
                <h2>Introduction</h2>
                <p>Our Medicine Tracker App is a service that helps you track your medications and set reminders. Your privacy is important to us.</p>
                <p>This Privacy Policy explains that we do not collect any data during your use of the application.</p>
              </section>

              <section className="section">
                <h2>Data Collection</h2>
                <p>Our Medicine Tracker App does not collect, store, or share any personal data.</p>
                <p>All medications and reminders you add are stored only on your own device and are not sent to our servers.</p>
              </section>

              <section className="section">
                <h2>Device Permissions</h2>
                <p>Our app only uses the following permissions:</p>
                <ul>
                  <li><strong>Notification Permission:</strong> To send you timely medication reminders</li>
                </ul>
                <p>These permissions are not used to collect any data beyond the stated purpose.</p>
              </section>

              <section className="section">
                <h2>Security of Your Data</h2>
                <p>All your data is stored locally on your device only and is not sent to any server.</p>
                <p>It is your responsibility to keep your device and the app secure.</p>
              </section>

              <section className="section">
                <h2>Changes</h2>
                <p>We reserve the right to update this privacy policy at any time. Changes will be effective when posted on this page.</p>
              </section>

              <section className="section">
                <h2>Contact</h2>
                <p>If you have any questions about this privacy policy, please contact us at sencergok@outlook.com</p>
              </section>
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

          p, li {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
}