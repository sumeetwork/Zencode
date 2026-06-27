'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';

const MARQUEE_ITEMS = [
  'Web Development', 'AI Automation', 'eCommerce', 'SEO Optimisation',
  'Web Design', 'React / Next.js', 'WordPress', 'HubSpot CMS', 'Shopify', 'Custom Development',
  'Web Development', 'AI Automation', 'eCommerce', 'SEO Optimisation',
  'Web Design', 'React / Next.js', 'WordPress', 'HubSpot CMS', 'Shopify', 'Custom Development',
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Entrance timeline ──────────────────────────────────────────────
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.from('.hero-label', { y: 24, opacity: 0, duration: 0.8 }, 0.1)
        .from('.hero-word', { yPercent: 110, opacity: 0, duration: 1.05, stagger: 0.13, ease: 'power4.out' }, 0.35)
        .from('.hero-desc', { y: 28, opacity: 0, duration: 0.9 }, '-=0.55')
        .from('.hero-btn', { y: 20, opacity: 0, duration: 0.65, stagger: 0.1 }, '-=0.55')
        .from('.hero-stat', { y: 32, opacity: 0, duration: 0.7, stagger: 0.12 }, '-=0.5')
        .from('.hero-marquee-wrap', { opacity: 0, duration: 1 }, '-=0.3')
        .from('.hero-scroll', { opacity: 0, duration: 0.8 }, '-=0.4');

      // ── Blobs float in ────────────────────────────────────────────────
      tl.from('.hero-blob', { scale: 0.4, opacity: 0, duration: 2.5, stagger: 0.3, ease: 'power2.out' }, 0);

      // ── Count-up stats ────────────────────────────────────────────────
      [
        { cls: '.stat-val-0', end: 101, suffix: '+' },
        { cls: '.stat-val-1', end: 2980, suffix: '', format: true },
        { cls: '.stat-val-2', end: 10,  suffix: '+' },
      ].forEach(({ cls, end, suffix, format }) => {
        const el = document.querySelector(cls);
        if (!el) return;
        gsap.to({ v: 0 }, {
          v: end, duration: 2.4, delay: 1.6, ease: 'power2.out',
          onUpdate() {
            const n = Math.round((this.targets()[0] as { v: number }).v);
            el.textContent = (format ? n.toLocaleString() : n) + suffix;
          },
        });
      });

      // ── Accent line pulse ─────────────────────────────────────────────
      gsap.fromTo('.hero-accent-line',
        { scaleY: 0, opacity: 0 },
        { scaleY: 1, opacity: 1, duration: 1.6, delay: 1.2, ease: 'power3.out', transformOrigin: 'top center' }
      );

    }, sectionRef);

    // ── Mouse parallax ────────────────────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      const xPct = (e.clientX / window.innerWidth  - 0.5);
      const yPct = (e.clientY / window.innerHeight - 0.5);
      gsap.to('.hero-blob-1', { x: xPct * 50, y: yPct * 35, duration: 2, ease: 'power2.out', overwrite: 'auto' });
      gsap.to('.hero-blob-2', { x: xPct * -35, y: yPct * -25, duration: 2.5, ease: 'power2.out', overwrite: 'auto' });
      gsap.to('.hero-blob-3', { x: xPct * 25, y: yPct * 20, duration: 3, ease: 'power2.out', overwrite: 'auto' });
      gsap.to('.hero-grid', { x: xPct * 12, y: yPct * 8, duration: 3, ease: 'power2.out', overwrite: 'auto' });
    };

    const el = sectionRef.current;
    el?.addEventListener('mousemove', onMove);
    return () => { ctx.revert(); el?.removeEventListener('mousemove', onMove); };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', paddingTop: 120, paddingBottom: 160 }}
    >
      {/* ── Background blobs ── */}
      <div className="hero-blob hero-blob-1" style={{
        position: 'absolute', right: '-8%', top: '0%',
        width: '60vw', height: '60vw', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(37,78,88,0.28) 0%, rgba(136,189,188,0.07) 45%, transparent 70%)',
        pointerEvents: 'none', filter: 'blur(50px)',
      }} />
      <div className="hero-blob hero-blob-2" style={{
        position: 'absolute', left: '-18%', bottom: '5%',
        width: '50vw', height: '50vw', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(136,189,188,0.1) 0%, transparent 70%)',
        pointerEvents: 'none', filter: 'blur(70px)',
      }} />
      <div className="hero-blob hero-blob-3" style={{
        position: 'absolute', right: '22%', bottom: '18%',
        width: '28vw', height: '28vw', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(37,78,88,0.18) 0%, transparent 70%)',
        pointerEvents: 'none', filter: 'blur(35px)',
      }} />

      {/* ── Grid lines ── */}
      <div className="hero-grid" style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(136,189,188,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(136,189,188,0.04) 1px, transparent 1px)',
        backgroundSize: '80px 80px', pointerEvents: 'none',
      }} />

      {/* ── Left accent line ── */}
      <div className="hero-accent-line" style={{
        position: 'absolute', left: 0, top: '18%',
        width: 2, height: '38%',
        background: 'linear-gradient(to bottom, transparent, rgba(136,189,188,0.5), transparent)',
      }} />

      {/* ── Floating dot accents ── */}
      {[
        { top: '22%', right: '18%', size: 5, delay: '0s' },
        { top: '55%', right: '8%',  size: 3, delay: '0.8s' },
        { top: '70%', right: '32%', size: 4, delay: '1.6s' },
        { top: '35%', right: '42%', size: 3, delay: '2.4s' },
      ].map((d, i) => (
        <div key={i} style={{
          position: 'absolute', top: d.top, right: d.right,
          width: d.size, height: d.size, borderRadius: '50%',
          background: 'var(--teal-light)', opacity: 0.35,
          animation: `dotPulse 3s ease-in-out infinite`,
          animationDelay: d.delay,
        }} />
      ))}

      {/* ── Corner bracket decoration ── */}
      <div style={{
        position: 'absolute', top: 100, right: 40,
        width: 48, height: 48,
        borderTop: '1px solid rgba(136,189,188,0.2)',
        borderRight: '1px solid rgba(136,189,188,0.2)',
      }} />
      <div style={{
        position: 'absolute', bottom: 160, left: 40,
        width: 32, height: 32,
        borderBottom: '1px solid rgba(136,189,188,0.15)',
        borderLeft: '1px solid rgba(136,189,188,0.15)',
      }} />

      {/* ── Main content ── */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px', position: 'relative', width: '100%' }}>
        <div style={{ maxWidth: '860px' }}>
          <span className="hero-label section-label" style={{ display: 'inline-block', marginBottom: 28 }}>
            Web Solutions Agency · South Africa
          </span>

          <h1 style={{ marginBottom: 32 }}>
            {[
              { text: 'We Build',  color: '#e8e4df' },
              { text: 'Awesome',   color: 'var(--teal-light)' },
              { text: 'Websites.', color: '#e8e4df' },
            ].map(({ text, color }, i) => (
              <div key={i} style={{ overflow: 'hidden', lineHeight: 1.05 }}>
                <div className="hero-word" style={{
                  fontSize: 'clamp(3.2rem, 7.5vw, 5.8rem)',
                  fontWeight: 800, letterSpacing: '-0.04em',
                  color, display: 'block',
                }}>
                  {text}
                </div>
              </div>
            ))}
          </h1>

          <p className="hero-desc" style={{
            fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
            color: 'rgba(232,228,223,0.6)',
            lineHeight: 1.8, maxWidth: '560px', marginBottom: 48,
          }}>
            We&apos;re ZenCode — a web solutions agency utilizing the latest cutting-edge technology.
            Our professional team ensures your website performs flawlessly on every device, driving
            real results for your brand online.
          </p>

          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 72 }}>
            <Link href="#portfolio" className="btn-primary hero-btn">View Our Work</Link>
            <Link href="/contact" className="btn-outline hero-btn">Start a Project</Link>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '52px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
            {[
              { cls: 'stat-val-0', initial: '101+', label: 'Happy Clients' },
              { cls: 'stat-val-1', initial: '2,980', label: 'Hours Worked / Year' },
              { cls: 'stat-val-2', initial: '10+',  label: 'Years Experience' },
            ].map((stat, i) => (
              <div key={stat.label} className="hero-stat" style={{ position: 'relative' }}>
                {i > 0 && (
                  <div style={{ position: 'absolute', left: -26, top: 4, width: 1, height: 36, background: 'rgba(136,189,188,0.12)' }} />
                )}
                <div style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 800, color: 'var(--teal-light)', letterSpacing: '-0.03em', lineHeight: 1 }}>
                  <span className={stat.cls}>{stat.initial}</span>
                </div>
                <div style={{ fontSize: '0.72rem', letterSpacing: '0.16em', color: 'rgba(232,228,223,0.38)', textTransform: 'uppercase', marginTop: 8 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Marquee strip ── */}
      <div className="hero-marquee-wrap" style={{
        position: 'absolute', bottom: 72, left: 0, right: 0,
        overflow: 'hidden',
        borderTop: '1px solid rgba(136,189,188,0.07)',
        borderBottom: '1px solid rgba(136,189,188,0.07)',
        padding: '11px 0',
      }}>
        <div style={{ display: 'flex', animation: 'marqueeScroll 28s linear infinite', width: 'max-content' }}>
          {MARQUEE_ITEMS.map((item, i) => (
            <span key={i} style={{ color: 'rgba(136,189,188,0.45)', fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', paddingRight: 48, whiteSpace: 'nowrap' }}>
              {item}
              <span style={{ marginLeft: 48, opacity: 0.3 }}>·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="hero-scroll" style={{
        position: 'absolute', bottom: 22, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
      }}>
        <span style={{ fontSize: '0.6rem', letterSpacing: '0.22em', color: 'rgba(232,228,223,0.25)', textTransform: 'uppercase' }}>Scroll</span>
        <div style={{ width: 1, height: 36, background: 'linear-gradient(to bottom, rgba(136,189,188,0.5), transparent)', animation: 'scrollPulse 2s ease-in-out infinite' }} />
      </div>

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.4; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(0.7); }
        }
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes dotPulse {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50%       { opacity: 0.7;  transform: scale(1.6); }
        }
      `}</style>
    </section>
  );
}
