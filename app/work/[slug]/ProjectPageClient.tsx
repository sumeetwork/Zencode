'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Project } from '../../data/projects';
import { projects } from '../../data/projects';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectPageClient({ project }: { project: Project }) {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Assign CSS animation classes — opacity handled by CSS @keyframes (immune to StrictMode double-mount)
    // GSAP is used only for scroll-triggered sections below the fold
    const hero = pageRef.current?.querySelector('.pp-hero-content') as HTMLElement | null;
    if (hero) hero.classList.add('pp-hero-animate');
    const mockup = pageRef.current?.querySelector('.pp-mockup') as HTMLElement | null;
    if (mockup) mockup.classList.add('pp-mockup-animate');

    const ctx = gsap.context(() => {
      // Scroll-triggered sections — these are fine since they only run once and are below fold
      gsap.from('.pp-desc-block', {
        y: 40, opacity: 0, duration: 0.9, ease: 'power3.out', clearProps: 'opacity,transform',
        scrollTrigger: { trigger: '.pp-desc-block', start: 'top 85%', once: true },
      });
      gsap.from('.pp-sidebar', {
        y: 30, opacity: 0, duration: 0.8, ease: 'power3.out', clearProps: 'opacity,transform',
        scrollTrigger: { trigger: '.pp-sidebar', start: 'top 85%', once: true },
      });
      gsap.from('.pp-image', {
        y: 50, opacity: 0, duration: 0.85, stagger: 0.18, ease: 'power3.out', clearProps: 'opacity,transform',
        scrollTrigger: { trigger: '.pp-images-section', start: 'top 85%', once: true },
      });
      gsap.from('.pp-related-card', {
        y: 40, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out', clearProps: 'opacity,transform',
        scrollTrigger: { trigger: '.pp-related-section', start: 'top 85%', once: true },
      });
    }, pageRef);
    return () => ctx.revert();
  }, [project.slug]);

  const related = projects
    .filter((p) => p.slug !== project.slug && p.categories.some((c) => project.categories.includes(c)))
    .slice(0, 3);

  // Build title words for staggered reveal
  const titleWords = project.title.split(' ');

  return (
    <div ref={pageRef}>
      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <div style={{
        position: 'relative', minHeight: '100vh',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        overflow: 'hidden', paddingTop: 100, paddingBottom: 60,
      }}>
        {/* Grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(136,189,188,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(136,189,188,0.035) 1px, transparent 1px)',
          backgroundSize: '80px 80px', pointerEvents: 'none',
        }} />

        {/* Animated blobs */}
        <div className="pp-blob" style={{
          position: 'absolute', top: '-10%', right: '-5%',
          width: '55vw', height: '55vw', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37,78,88,0.32) 0%, rgba(136,189,188,0.06) 50%, transparent 70%)',
          filter: 'blur(55px)', pointerEvents: 'none',
          animation: 'ppBlob1 10s ease-in-out infinite',
        }} />
        <div className="pp-blob" style={{
          position: 'absolute', bottom: '0%', left: '-15%',
          width: '45vw', height: '45vw', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(136,189,188,0.09) 0%, transparent 70%)',
          filter: 'blur(70px)', pointerEvents: 'none',
          animation: 'ppBlob2 13s ease-in-out infinite',
        }} />

        {/* Accent left bar */}
        <div style={{
          position: 'absolute', left: 0, top: '25%', width: 2, height: '35%',
          background: 'linear-gradient(to bottom, transparent, rgba(136,189,188,0.4), transparent)',
        }} />

        {/* Corner bracket */}
        <div style={{
          position: 'absolute', bottom: 60, right: 40,
          width: 36, height: 36,
          borderBottom: '1px solid rgba(136,189,188,0.18)',
          borderRight: '1px solid rgba(136,189,188,0.18)',
        }} />

        {/* Top bar: back link + project counter */}
        <div style={{
          position: 'absolute', top: 100, left: 0, right: 0,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '0 40px',
        }}>
          <Link href="/#portfolio" className="pp-back">
            ← Back to Work
          </Link>
          <span className="pp-num" style={{
            fontSize: '0.65rem', letterSpacing: '0.2em',
            color: 'rgba(136,189,188,0.25)', textTransform: 'uppercase',
          }}>
            {String(projects.findIndex(p => p.slug === project.slug) + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </span>
        </div>

        {/* Main layout: left text + right mockup */}
        <div className="pp-hero-content" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px', width: '100%', position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: '60px', alignItems: 'center' }}>

            {/* Left — text */}
            <div>
              {/* Category chips */}
              <div className="pp-cats" style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
                {project.categories.map((cat) => (
                  <span key={cat} style={{
                    fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase',
                    color: 'var(--teal-light)', background: 'rgba(136,189,188,0.1)',
                    border: '1px solid rgba(136,189,188,0.22)', padding: '5px 14px',
                  }}>
                    {cat}
                  </span>
                ))}
              </div>

              {/* Title — word by word clip reveal */}
              <h1 style={{ marginBottom: 32 }}>
                {titleWords.map((word, i) => (
                  <div key={i} style={{ overflow: 'hidden', lineHeight: 1.05, display: 'block' }}>
                    <span className="pp-word" style={{
                      display: 'inline-block',
                      fontSize: 'clamp(2.6rem, 5.5vw, 4.4rem)',
                      fontWeight: 800, color: '#e8e4df', letterSpacing: '-0.035em',
                    }}>
                      {word}
                    </span>
                  </div>
                ))}
              </h1>

              {/* Divider line */}
              <div className="pp-divider" style={{
                height: 1, background: 'rgba(136,189,188,0.12)', marginBottom: 28,
              }} />

              {/* Meta row */}
              <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap', marginBottom: 36 }}>
                {project.client && (
                  <div className="pp-meta-row">
                    <div style={{ fontSize: '0.62rem', letterSpacing: '0.2em', color: 'rgba(232,228,223,0.35)', textTransform: 'uppercase', marginBottom: 5 }}>Client</div>
                    <div style={{ color: '#e8e4df', fontWeight: 600, fontSize: '0.95rem' }}>{project.client}</div>
                  </div>
                )}
                <div className="pp-meta-row">
                  <div style={{ fontSize: '0.62rem', letterSpacing: '0.2em', color: 'rgba(232,228,223,0.35)', textTransform: 'uppercase', marginBottom: 5 }}>Services</div>
                  <div style={{ color: 'rgba(232,228,223,0.7)', fontSize: '0.88rem' }}>{project.categories.join(' · ')}</div>
                </div>
              </div>

              {/* CTAs */}
              <div className="pp-hero-cta" style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                {project.siteUrl && (
                  <a href={project.siteUrl} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: '0.8rem' }}>
                    Visit Live Site →
                  </a>
                )}
                <a href="#project-content" className="btn-outline" style={{ fontSize: '0.8rem' }}>
                  Read More ↓
                </a>
              </div>
            </div>

            {/* Right — browser mockup */}
            {project.thumbnailUrl && (
              <div className="pp-mockup" style={{ position: 'relative' }}>
                {/* Glow behind mockup */}
                <div style={{
                  position: 'absolute', inset: -20,
                  background: 'radial-gradient(ellipse, rgba(136,189,188,0.08) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }} />

                {/* Browser chrome */}
                <div style={{
                  background: 'rgba(37,78,88,0.5)',
                  border: '1px solid rgba(136,189,188,0.18)',
                  backdropFilter: 'blur(4px)',
                  overflow: 'hidden',
                  boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(136,189,188,0.08)',
                  transform: 'perspective(900px) rotateY(-4deg) rotateX(2deg)',
                }}>
                  {/* Browser bar */}
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '10px 14px',
                    background: 'rgba(17,45,50,0.8)',
                    borderBottom: '1px solid rgba(136,189,188,0.1)',
                  }}>
                    <div style={{ display: 'flex', gap: 5 }}>
                      {['rgba(255,95,86,0.7)', 'rgba(255,189,46,0.7)', 'rgba(39,201,63,0.7)'].map((c, i) => (
                        <div key={i} style={{ width: 9, height: 9, borderRadius: '50%', background: c }} />
                      ))}
                    </div>
                    <div style={{
                      flex: 1, height: 22, background: 'rgba(136,189,188,0.07)',
                      border: '1px solid rgba(136,189,188,0.1)',
                      display: 'flex', alignItems: 'center', paddingLeft: 10,
                      fontSize: '0.65rem', color: 'rgba(136,189,188,0.4)', letterSpacing: '0.05em',
                    }}>
                      {project.siteUrl?.replace(/^https?:\/\//, '') ?? 'zencode.co.za'}
                    </div>
                  </div>

                  {/* Screenshot */}
                  <div style={{ overflow: 'hidden', maxHeight: 300 }}>
                    <img
                      src={project.thumbnailUrl}
                      alt={project.title}
                      style={{ width: '100%', display: 'block', objectFit: 'cover', objectPosition: 'top' }}
                      onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                    />
                  </div>
                </div>

                {/* Reflection */}
                <div style={{
                  position: 'absolute', bottom: -30, left: '5%', right: '5%', height: 30,
                  background: 'linear-gradient(to bottom, rgba(136,189,188,0.04), transparent)',
                  filter: 'blur(4px)',
                  transform: 'perspective(900px) rotateY(-4deg) rotateX(2deg) scaleY(-0.3)',
                  transformOrigin: 'top',
                  opacity: 0.5,
                }} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Main content ────────────────────────────────────────────────── */}
      <div id="project-content" style={{ maxWidth: '1280px', margin: '0 auto', padding: '72px 40px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '72px', alignItems: 'start' }}>

          {/* Description */}
          <div className="pp-desc-block">
            <div style={{ fontSize: '0.68rem', letterSpacing: '0.2em', color: 'rgba(136,189,188,0.55)', textTransform: 'uppercase', marginBottom: 18 }}>
              About the Project
            </div>
            <p style={{ fontSize: '1.08rem', color: 'rgba(232,228,223,0.68)', lineHeight: 1.88 }}>
              {project.fullDesc}
            </p>

            {project.tags.length > 0 && (
              <div style={{ marginTop: 44 }}>
                <div style={{ fontSize: '0.68rem', letterSpacing: '0.18em', color: 'rgba(232,228,223,0.3)', textTransform: 'uppercase', marginBottom: 14 }}>
                  Technologies &amp; Tools
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {project.tags.map((tag) => (
                    <span key={tag} style={{
                      fontSize: '0.78rem', color: 'rgba(232,228,223,0.6)',
                      background: 'rgba(37,78,88,0.4)', padding: '6px 14px',
                      border: '1px solid rgba(136,189,188,0.1)',
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="pp-sidebar" style={{ position: 'sticky', top: 100 }}>
            <div style={{ background: 'rgba(37,78,88,0.2)', border: '1px solid rgba(136,189,188,0.1)', padding: '32px' }}>
              {project.client && (
                <div style={{ marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid rgba(136,189,188,0.07)' }}>
                  <div style={{ fontSize: '0.62rem', letterSpacing: '0.2em', color: 'rgba(232,228,223,0.3)', textTransform: 'uppercase', marginBottom: 8 }}>Client</div>
                  <div style={{ color: '#e8e4df', fontWeight: 700 }}>{project.client}</div>
                </div>
              )}
              <div style={{ marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid rgba(136,189,188,0.07)' }}>
                <div style={{ fontSize: '0.62rem', letterSpacing: '0.2em', color: 'rgba(232,228,223,0.3)', textTransform: 'uppercase', marginBottom: 10 }}>Services</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {project.categories.map((cat) => (
                    <span key={cat} style={{
                      fontSize: '0.72rem', color: 'var(--teal-light)',
                      background: 'rgba(136,189,188,0.1)', padding: '4px 10px',
                      border: '1px solid rgba(136,189,188,0.15)',
                    }}>
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
              {project.siteUrl && (
                <a href={project.siteUrl} target="_blank" rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ display: 'flex', width: '100%', justifyContent: 'center', fontSize: '0.8rem' }}>
                  Visit Website →
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Images ──────────────────────────────────────────────────────── */}
      {project.images.length > 0 && (
        <div className="pp-images-section" style={{
          background: 'rgba(17,45,50,0.6)', padding: '72px 0 88px',
          borderTop: '1px solid rgba(136,189,188,0.07)',
          borderBottom: '1px solid rgba(136,189,188,0.07)',
        }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>
            <div style={{ fontSize: '0.68rem', letterSpacing: '0.2em', color: 'rgba(136,189,188,0.45)', textTransform: 'uppercase', marginBottom: 36 }}>
              Project Screenshots
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: project.images.length === 1 ? '1fr' : project.images.length === 2 ? '1fr 1fr' : 'repeat(auto-fit, minmax(380px, 1fr))',
              gap: 16,
            }}>
              {project.images.map((img, i) => (
                <div key={i} className="pp-image pp-img-wrap" style={{ overflow: 'hidden', border: '1px solid rgba(136,189,188,0.08)' }}>
                  <img src={img} alt={`${project.title} screenshot ${i + 1}`}
                    className="pp-img-inner"
                    style={{ width: '100%', height: 'auto', display: 'block', transition: 'transform 0.6s ease' }}
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Related ─────────────────────────────────────────────────────── */}
      {related.length > 0 && (
        <div className="pp-related-section" style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 40px 88px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 36, flexWrap: 'wrap', gap: 16 }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#e8e4df', letterSpacing: '-0.02em' }}>More Projects</h2>
            <Link href="/#portfolio" style={{ fontSize: '0.75rem', letterSpacing: '0.1em', color: 'var(--teal-light)', textDecoration: 'none', textTransform: 'uppercase' }}>
              View All →
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12 }}>
            {related.map((p) => (
              <Link key={p.slug} href={`/work/${p.slug}`}
                className="pp-related-card portfolio-card"
                style={{ display: 'block', height: 230, textDecoration: 'none', position: 'relative', overflow: 'hidden' }}>
                {p.thumbnailUrl && (
                  <img src={p.thumbnailUrl} alt={p.title}
                    className="portfolio-card-img"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', transition: 'transform 0.6s ease' }}
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                  />
                )}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: '65%',
                  background: 'linear-gradient(to top, rgba(17,45,50,0.96), transparent)',
                  display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '20px 22px',
                }}>
                  <div style={{ color: 'var(--teal-light)', fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 5 }}>{p.categories[0]}</div>
                  <div style={{ color: '#e8e4df', fontWeight: 700, fontSize: '0.95rem' }}>{p.title}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <div style={{ background: 'rgba(37,78,88,0.3)', borderTop: '1px solid rgba(136,189,188,0.08)', padding: '88px 40px', textAlign: 'center' }}>
        <span className="section-label" style={{ display: 'block', marginBottom: 14 }}>Start Your Project</span>
        <h2 style={{ fontSize: 'clamp(1.7rem, 3vw, 2.4rem)', fontWeight: 800, color: '#e8e4df', letterSpacing: '-0.03em', marginBottom: 14 }}>
          Have a similar project in mind?
        </h2>
        <p style={{ color: 'rgba(232,228,223,0.45)', marginBottom: 36, maxWidth: 440, margin: '0 auto 36px', lineHeight: 1.75, fontSize: '0.93rem' }}>
          Let&apos;s talk about your goals and create something that drives real results.
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/contact" className="btn-primary">Get a Free Quote</Link>
          <Link href="/#portfolio" className="btn-outline">Browse Portfolio</Link>
        </div>
      </div>

      <style>{`
        /* ── Hero CSS animations (immune to React StrictMode double-mount) ── */
        .pp-hero-content {
          opacity: 0;
          transform: translateY(24px);
        }
        .pp-hero-content.pp-hero-animate {
          animation: ppHeroIn 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s forwards;
        }
        .pp-mockup {
          opacity: 0;
          transform: translateX(48px);
        }
        .pp-mockup.pp-mockup-animate {
          animation: ppMockupIn 1s cubic-bezier(0.16,1,0.3,1) 0.55s forwards;
        }
        @keyframes ppHeroIn {
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes ppMockupIn {
          to { opacity: 1; transform: translateX(0); }
        }

        /* ── Back link ── */
        .pp-back {
          display: inline-flex; align-items: center; gap: 8px;
          color: rgba(232,228,223,0.55); font-size: 0.75rem;
          letter-spacing: 0.12em; text-transform: uppercase; text-decoration: none;
          border: 1px solid rgba(136,189,188,0.15); padding: 7px 14px;
          transition: color 0.2s, border-color 0.2s;
        }
        .pp-back:hover { color: var(--teal-light); border-color: rgba(136,189,188,0.4); }

        /* ── Hover effects ── */
        .pp-img-wrap:hover .pp-img-inner { transform: scale(1.03); }
        .portfolio-card:hover .portfolio-card-img { transform: scale(1.06); }

        /* ── Blob animations ── */
        @keyframes ppBlob1 {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(-40px, 30px) scale(1.1); }
        }
        @keyframes ppBlob2 {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(50px,-40px) scale(0.9); }
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .pp-mockup { display: none !important; }
          .pp-sidebar { position: static !important; }
        }
      `}</style>
    </div>
  );
}
