'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ContactForm from './ContactForm';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-heading', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-heading', start: 'top 85%' },
      });
      gsap.from('.contact-form-wrap', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-form-wrap', start: 'top 85%' },
      });
      gsap.from('.contact-info-item', {
        x: -30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-info-item', start: 'top 85%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" style={{ padding: '120px 0', background: 'rgba(37,78,88,0.1)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '80px', alignItems: 'start' }}>
          {/* Left info */}
          <div>
            <div className="contact-heading">
              <span className="section-label">Get In Touch</span>
              <h2 className="section-title" style={{ marginBottom: 24 }}>Let&apos;s Build Something Great</h2>
              <p style={{ color: 'rgba(232,228,223,0.55)', lineHeight: 1.8, fontSize: '0.95rem', marginBottom: 48 }}>
                We&apos;d love to hear all about who you are and what your needs are! Tell us about your project and we&apos;ll get back to you with a plan and pricing.
              </p>
            </div>

            <div>
              {[
                { icon: '✉', label: 'Email', value: 'info@zencode.co.za', href: 'mailto:info@zencode.co.za' },
                { icon: '🌐', label: 'Website', value: 'zencode.co.za', href: 'https://zencode.co.za' },
                { icon: '📍', label: 'Location', value: 'South Africa', href: undefined },
              ].map((item) => (
                <div key={item.label} className="contact-info-item" style={{ display: 'flex', gap: 20, alignItems: 'flex-start', marginBottom: 28 }}>
                  <div style={{ width: 44, height: 44, background: 'rgba(136,189,188,0.1)', border: '1px solid rgba(136,189,188,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 3, flexShrink: 0, fontSize: '1.1rem' }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', letterSpacing: '0.15em', color: 'rgba(232,228,223,0.35)', textTransform: 'uppercase', marginBottom: 4 }}>{item.label}</div>
                    {item.href ? (
                      <a href={item.href} style={{ color: 'var(--teal-light)', fontSize: '0.95rem', textDecoration: 'none', transition: 'opacity 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')} onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}>{item.value}</a>
                    ) : (
                      <span style={{ color: '#e8e4df', fontSize: '0.95rem' }}>{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right form */}
          <div
            className="contact-form-wrap"
            style={{ background: 'rgba(37,78,88,0.3)', border: '1px solid rgba(136,189,188,0.1)', padding: '48px', borderRadius: 4 }}
          >
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#e8e4df', marginBottom: 8 }}>Send Us a Message</h3>
            <p style={{ color: 'rgba(232,228,223,0.45)', fontSize: '0.85rem', marginBottom: 32 }}>We respond within 24 hours.</p>
            <ContactForm />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #contact > div > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
