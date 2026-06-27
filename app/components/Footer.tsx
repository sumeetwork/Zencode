'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--teal-dark)', borderTop: '1px solid rgba(136,189,188,0.08)', padding: '60px 0 32px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '48px', marginBottom: '48px' }}>
          {/* Brand */}
          <div>
            <Link href="/" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: 16 }}>
              <img
                src="/images/logo1.png"
                alt="ZenCode Web Solutions"
                className="footer-logo-pulse"
                style={{ height: 56, width: 'auto', display: 'block' }}
              />
            </Link>
            <p style={{ color: 'rgba(232,228,223,0.55)', fontSize: '0.9rem', lineHeight: 1.7 }}>
              Building awesome websites for businesses across South Africa and beyond.
            </p>
          </div>

          {/* Services */}
          <div>
            <div className="section-label" style={{ marginBottom: 20 }}>Services</div>
            {['Web Development', 'Web Design', 'eCommerce', 'SEO & Optimisation', 'AI Automation'].map((s) => (
              <div key={s} className="footer-text-link">
                {s}
              </div>
            ))}
          </div>

          {/* Quick Links */}
          <div>
            <div className="section-label" style={{ marginBottom: 20 }}>Quick Links</div>
            {[
              { label: 'Home', href: '/' },
              { label: 'Our Work', href: '/#portfolio' },
              { label: 'Services', href: '/#services' },
              { label: 'Contact', href: '/contact' },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="footer-nav-link">
                {l.label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <div className="section-label" style={{ marginBottom: 20 }}>Contact</div>
            <a href="mailto:info@zencode.co.za" className="footer-nav-link">
              info@zencode.co.za
            </a>
            <a href="https://zencode.co.za" className="footer-nav-link">
              zencode.co.za
            </a>
            <div style={{ marginTop: 20 }}>
              <Link href="/contact" className="btn-outline" style={{ padding: '10px 24px', fontSize: '0.75rem' }}>
                Start a Project
              </Link>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(136,189,188,0.08)', paddingTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ color: 'rgba(232,228,223,0.3)', fontSize: '0.8rem' }}>
            © {new Date().getFullYear()} ZenCode. All rights reserved.
          </p>
          <p style={{ color: 'rgba(232,228,223,0.3)', fontSize: '0.8rem' }}>
            Web Solutions Agency · South Africa
          </p>
        </div>
      </div>

      <style>{`
        .footer-logo-pulse {
          animation: logoPulse 3s ease-in-out infinite;
        }
        @keyframes logoPulse {
          0%, 100% { filter: none; }
          40%       { filter: invert(1); }
          60%       { filter: invert(1); }
        }
        .footer-nav-link {
          display: block;
          color: rgba(232,228,223,0.55);
          font-size: 0.88rem;
          margin-bottom: 10px;
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-nav-link:hover { color: var(--teal-light); }
        .footer-text-link {
          color: rgba(232,228,223,0.55);
          font-size: 0.88rem;
          margin-bottom: 10px;
          transition: color 0.2s;
          cursor: default;
        }
        .footer-text-link:hover { color: var(--teal-light); }
      `}</style>
    </footer>
  );
}
