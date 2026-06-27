'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import ContactForm from '../components/ContactForm';
import Link from 'next/link';

export default function ContactPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.ct-label', { y: 20, opacity: 0, duration: 0.6 })
        .from('.ct-title', { y: 40, opacity: 0, duration: 0.8 }, '-=0.3')
        .from('.ct-desc', { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
        .from('.ct-card', { y: 40, opacity: 0, duration: 0.7, stagger: 0.1 }, '-=0.3')
        .from('.ct-form-wrap', { y: 40, opacity: 0, duration: 0.8 }, '-=0.5');
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} style={{ paddingTop: 120, minHeight: '100vh' }}>
      {/* Header */}
      <div style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(37,78,88,0.5) 0%, transparent 70%)',
        padding: '80px 40px 60px',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <span className="ct-label section-label">Get In Touch</span>
          <h1 className="ct-title section-title" style={{ marginBottom: 20 }}>Let&apos;s Build Something Great</h1>
          <p className="ct-desc" style={{ color: 'rgba(232,228,223,0.55)', fontSize: '1rem', lineHeight: 1.8, maxWidth: 560 }}>
            Whether you need a new website, an eCommerce store, SEO help, or AI automation — we&apos;re here to help. Fill in the form and we&apos;ll respond within 24 hours with a plan and pricing.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '60px 40px 100px' }}>
        <div className="ct-layout" style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '60px', alignItems: 'start' }}>
          {/* Info cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { icon: '✉', title: 'Email Us', value: 'info@zencode.co.za', href: 'mailto:info@zencode.co.za' },
              { icon: '🌐', title: 'Website', value: 'zencode.co.za', href: 'https://zencode.co.za' },
              { icon: '📍', title: 'Location', value: 'South Africa', href: undefined },
            ].map((item) => (
              <div key={item.title} className="ct-card" style={{ background: 'rgba(37,78,88,0.25)', border: '1px solid rgba(136,189,188,0.1)', padding: '24px', borderRadius: 4 }}>
                <div style={{ fontSize: '1.5rem', marginBottom: 12 }}>{item.icon}</div>
                <div style={{ fontSize: '0.7rem', letterSpacing: '0.15em', color: 'rgba(232,228,223,0.35)', textTransform: 'uppercase', marginBottom: 6 }}>{item.title}</div>
                {item.href ? (
                  <a href={item.href} style={{ color: 'var(--teal-light)', fontSize: '0.9rem', textDecoration: 'none' }}>{item.value}</a>
                ) : (
                  <span style={{ color: '#e8e4df', fontSize: '0.9rem' }}>{item.value}</span>
                )}
              </div>
            ))}

            <div className="ct-card" style={{ background: 'rgba(37,78,88,0.25)', border: '1px solid rgba(136,189,188,0.1)', padding: '24px', borderRadius: 4 }}>
              <div style={{ fontSize: '0.7rem', letterSpacing: '0.15em', color: 'rgba(232,228,223,0.35)', textTransform: 'uppercase', marginBottom: 12 }}>Our Services</div>
              {['Web Development', 'Web Design', 'eCommerce', 'SEO & Optimisation', 'AI Automation', 'Maintenance'].map((s) => (
                <div key={s} style={{ color: 'rgba(232,228,223,0.55)', fontSize: '0.85rem', marginBottom: 8, paddingLeft: 12, borderLeft: '2px solid rgba(136,189,188,0.2)' }}>{s}</div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="ct-form-wrap" style={{ background: 'rgba(37,78,88,0.2)', border: '1px solid rgba(136,189,188,0.1)', padding: '52px', borderRadius: 4 }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#e8e4df', marginBottom: 8 }}>Send Us a Message</h2>
            <p style={{ color: 'rgba(232,228,223,0.4)', fontSize: '0.85rem', marginBottom: 36 }}>We respond within 24 hours with a project plan and pricing.</p>
            <ContactForm />
          </div>
        </div>
      </div>

      {/* Browse work strip */}
      <div style={{ borderTop: '1px solid rgba(136,189,188,0.08)', padding: '48px 40px', textAlign: 'center' }}>
        <p style={{ color: 'rgba(232,228,223,0.4)', fontSize: '0.9rem', marginBottom: 16 }}>Want to see our work first?</p>
        <Link href="/#portfolio" className="btn-outline">Browse Our Portfolio</Link>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .ct-layout { grid-template-columns: 1fr !important; gap: 32px !important; }
          .ct-form-wrap { padding: 28px !important; }
        }
      `}</style>
    </div>
  );
}
