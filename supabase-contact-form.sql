-- Contact Form Table for Supabase
-- Bu SQL dosyasını Supabase Dashboard > SQL Editor'da çalıştırın

-- 1. Contact messages tablosunu oluştur
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(500) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'unread',
    ip_address INET,
    user_agent TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    admin_notes TEXT
);

-- 2. Email validation için constraint ekle
ALTER TABLE contact_messages 
ADD CONSTRAINT valid_email 
CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- 3. Status field için constraint ekle
ALTER TABLE contact_messages 
ADD CONSTRAINT valid_status 
CHECK (status IN ('unread', 'read', 'replied', 'archived', 'spam'));

-- 4. Index'leri oluştur (performans için)
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_email ON contact_messages(email);
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_is_read ON contact_messages(is_read);

-- 5. Updated_at otomatik güncellemesi için trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 6. Trigger'ı contact_messages tablosuna ekle
DROP TRIGGER IF EXISTS update_contact_messages_updated_at ON contact_messages;
CREATE TRIGGER update_contact_messages_updated_at
    BEFORE UPDATE ON contact_messages
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 7. Row Level Security (RLS) aktive et
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- 8. Public insert policy (form submission için)
CREATE POLICY "Anyone can insert contact messages" ON contact_messages
    FOR INSERT WITH CHECK (true);

-- 9. Admin read policy (sadece admin okuyabilir)
CREATE POLICY "Only admin can read contact messages" ON contact_messages
    FOR SELECT USING (auth.role() = 'admin');

-- 10. Admin update policy (sadece admin güncelleyebilir)
CREATE POLICY "Only admin can update contact messages" ON contact_messages
    FOR UPDATE USING (auth.role() = 'admin');

-- 11. Admin delete policy (sadece admin silebilir)
CREATE POLICY "Only admin can delete contact messages" ON contact_messages
    FOR DELETE USING (auth.role() = 'admin');

-- 12. Spam koruması için rate limiting view
CREATE OR REPLACE VIEW contact_rate_limit AS
SELECT 
    ip_address,
    COUNT(*) as message_count,
    MAX(created_at) as last_message_time
FROM contact_messages 
WHERE created_at > NOW() - INTERVAL '1 hour'
GROUP BY ip_address;

-- 13. Admin dashboard için view
CREATE OR REPLACE VIEW contact_messages_admin AS
SELECT 
    id,
    name,
    email,
    subject,
    LEFT(message, 100) || CASE WHEN LENGTH(message) > 100 THEN '...' ELSE '' END as message_preview,
    message,
    status,
    is_read,
    created_at,
    updated_at,
    admin_notes,
    ip_address,
    user_agent
FROM contact_messages
ORDER BY created_at DESC;

-- 14. İstatistikler için view
CREATE OR REPLACE VIEW contact_stats AS
SELECT 
    COUNT(*) as total_messages,
    COUNT(CASE WHEN status = 'unread' THEN 1 END) as unread_messages,
    COUNT(CASE WHEN status = 'read' THEN 1 END) as read_messages,
    COUNT(CASE WHEN status = 'replied' THEN 1 END) as replied_messages,
    COUNT(CASE WHEN created_at > NOW() - INTERVAL '24 hours' THEN 1 END) as messages_last_24h,
    COUNT(CASE WHEN created_at > NOW() - INTERVAL '7 days' THEN 1 END) as messages_last_week,
    COUNT(CASE WHEN created_at > NOW() - INTERVAL '30 days' THEN 1 END) as messages_last_month
FROM contact_messages;

-- 15. Örnek veri ekle (test için)
INSERT INTO contact_messages (name, email, subject, message, ip_address, user_agent) VALUES
('Test User', 'test@example.com', 'Test Subject', 'This is a test message from the contact form.', '192.168.1.1', 'Mozilla/5.0 (Test Browser)'),
('Jane Doe', 'jane@example.com', 'Proje Hakkında', 'Merhaba! Web sitenizi çok beğendim. Benzer bir proje için işbirliği yapmak istiyorum.', '192.168.1.2', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');

-- 16. Başarılı kurulum mesajı
DO $$
BEGIN
    RAISE NOTICE '✅ Contact form tablosu başarıyla oluşturuldu!';
    RAISE NOTICE '📧 Tablo adı: contact_messages';
    RAISE NOTICE '🔐 Row Level Security aktif';
    RAISE NOTICE '📊 Admin views hazır: contact_messages_admin, contact_stats';
    RAISE NOTICE '🚀 Form entegrasyonu için hazır!';
END $$;

-- 17. Tabloyu kontrol et
SELECT 
    'contact_messages' as table_name,
    COUNT(*) as total_records,
    MAX(created_at) as latest_record
FROM contact_messages; 