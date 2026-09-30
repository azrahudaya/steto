import Link from "next/link";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const authReady = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
  
  return (
    <div className="site-shell">
      {/* Header */}
      <header className="site-header">
        <Link href="/" className="wordmark">
          steto<span className="wordmark-stop">.</span>
        </Link>
        <nav className="header-actions">
          {authReady ? (
            <>
              <SignInButton mode="redirect">
                <Button variant="ghost">Masuk</Button>
              </SignInButton>
              <SignUpButton mode="redirect">
                <Button>Mulai gratis</Button>
              </SignUpButton>
            </>
          ) : (
            <span className="text-sm text-muted-foreground">Konfigurasi diperlukan</span>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div>
            <div className="hero-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
              Catatan pemeriksaan puskesmas
            </div>
            <h1 className="hero-title">
              Dokter fokus ke pasien,<br/><em>Steto yang mencatat.</em>
            </h1>
            <p className="hero-description">
              Ubah percakapan pemeriksaan menjadi draf SOAP dan saran ICD-10 secara otomatis. 
              Dokter tetap memeriksa, mengedit, dan menyetujui setiap catatan.
            </p>
            <div className="hero-actions">
              {authReady && (
                <SignUpButton mode="redirect">
                  <Button size="lg">Coba gratis</Button>
                </SignUpButton>
              )}
              <Button variant="outline" size="lg">
                <a href="#cara-kerja">Lihat cara kerja</a>
              </Button>
            </div>
          </div>
          
          {/* Visual - Record Sheet */}
          <div className="hidden lg:block">
            <div style={{
              background: '#ffffff',
              border: '1px solid #e5e5e5',
              borderRadius: '16px',
              padding: '32px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.06)'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingBottom: '24px',
                borderBottom: '1px solid #e5e5e5',
                marginBottom: '24px',
                fontSize: '13px',
                fontWeight: 600,
                color: '#737373'
              }}>
                <span>Alur Kerja</span>
                <span>3 Langkah</span>
              </div>
              
              {[
                { num: '01', title: 'Rekam percakapan', desc: 'Dengan persetujuan pasien, rekam dialog pemeriksaan.' },
                { num: '02', title: 'Tinjau draf', desc: 'Periksa transkrip, SOAP, dan saran kode ICD-10.' },
                { num: '03', title: 'Setujui catatan', desc: 'Dokter memegang keputusan akhir atas semua keluaran AI.' }
              ].map((step, i) => (
                <div key={i} style={{
                  display: 'flex',
                  gap: '20px',
                  padding: i < 2 ? '20px 0' : '20px 0 0',
                  borderBottom: i < 2 ? '1px solid #e5e5e5' : 'none'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: i === 0 ? '#0066ff' : '#f5f5f5',
                    color: i === 0 ? 'white' : '#737373',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '16px',
                    flexShrink: 0
                  }}>
                    {step.num}
                  </div>
                  <div>
                    <h3 style={{ fontWeight: 600, marginBottom: '6px', fontSize: '16px' }}>{step.title}</h3>
                    <p style={{ color: '#525252', fontSize: '14px', lineHeight: 1.5 }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-grid">
          {[
            {
              icon: '🎙️',
              title: 'Rekam Percakapan',
              desc: 'Dengan persetujuan pasien, rekam dialog pemeriksaan secara alami saat dokter berinteraksi.'
            },
            {
              icon: '📝',
              title: 'Draf SOAP Otomatis',
              desc: 'AI menyusun draf catatan SOAP dari percakapan. Dokter tinggal review dan edit seperlunya.'
            },
            {
              icon: '🔍',
              title: 'Saran ICD-10',
              desc: 'Sistem memberikan rekomendasi kode diagnosis berdasarkan temuan klinis yang tercatat.'
            },
            {
              icon: '✅',
              title: 'Kontrol Penuh',
              desc: 'Setiap keluaran AI adalah draf. Dokter memegang keputusan akhir untuk disetujui atau diedit.'
            },
            {
              icon: '🔗',
              title: 'Siap SATUSEHAT',
              desc: 'Catatan dapat dikirim ke SATUSEHAT dalam format FHIR setelah mendapat kredensial resmi.'
            },
            {
              icon: '📱',
              title: 'Akses Mudah',
              desc: 'Antarmuka sederhana yang dapat diakses dari perangkat apapun di puskesmas.'
            }
          ].map((feature, i) => (
            <div key={i} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '80px 24px',
        background: '#0066ff',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: 700,
            color: 'white',
            marginBottom: '16px',
            letterSpacing: '-0.02em'
          }}>
            Siap mencoba Steto?
          </h2>
          <p style={{
            fontSize: '18px',
            color: 'rgba(255,255,255,0.9)',
            marginBottom: '32px'
          }}>
            Mulai gratis untuk puskesmas Anda. Tidak perlu kartu kredit.
          </p>
          {authReady && (
            <SignUpButton mode="redirect">
              <Button size="lg" variant="secondary" style={{ 
                background: 'white', 
                color: '#0066ff',
                fontWeight: 600
              }}>
                Daftar sekarang
              </Button>
            </SignUpButton>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-container">
          <div className="footer-brand">steto.</div>
          <p style={{ fontSize: '14px' }}>
            Data simulasi untuk demonstrasi. Bukan alat diagnosis medis.
          </p>
        </div>
      </footer>
    </div>
  );
}
