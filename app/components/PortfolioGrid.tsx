'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Project } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

// Assigns CSS grid span sizes for the uneven layout
function getGridStyle(size: string, index: number): React.CSSProperties {
  if (size === 'large') return { gridColumn: 'span 2', gridRow: 'span 2' };
  if (size === 'medium') return { gridColumn: 'span 2', gridRow: 'span 1' };
  return { gridColumn: 'span 1', gridRow: 'span 1' };
}

const categories = ['All', 'Design', 'Development', 'eCommerce', 'SEO & Optimisation', 'AI'];

export default function PortfolioGrid({ projects }: { projects: Project[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    gsap.killTweensOf(['.portfolio-heading', '.portfolio-filter-btn']);
    gsap.set(['.portfolio-heading', '.portfolio-filter-btn'], { clearProps: 'all' });

    const ctx = gsap.context(() => {
      gsap.from('.portfolio-heading', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        clearProps: 'opacity,transform',
        scrollTrigger: { trigger: '.portfolio-heading', start: 'top 85%', once: true },
      });
      gsap.from('.portfolio-filter-btn', {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: 'power3.out',
        clearProps: 'opacity,transform',
        scrollTrigger: { trigger: '.portfolio-filter-btn', start: 'top 85%', once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // Kill any stuck tweens from previous runs, then re-animate
    gsap.killTweensOf('.portfolio-item');
    gsap.set('.portfolio-item', { opacity: 1, y: 0 });
    const ctx = gsap.context(() => {
      gsap.from('.portfolio-item', {
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: 'power3.out',
        clearProps: 'opacity,transform',
        scrollTrigger: {
          trigger: '#portfolio',
          start: 'top 85%',
          once: true,
        },
      });
    });
    return () => ctx.revert();
  }, [activeCategory]);

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.categories.some((c) => c.toLowerCase().includes(activeCategory.toLowerCase())));

  return (
    <section ref={sectionRef} id="portfolio" style={{ padding: '120px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>
        {/* Heading */}
        <div className="portfolio-heading" style={{ paddingBottom: 56 }}>
          <span className="section-label">Selected Work</span>
          <h2 className="section-title" style={{ marginBottom: 0 }}>Our Portfolio</h2>
        </div>

        {/* Filters + CTA row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 48 }}>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  className={`portfolio-filter-btn${isActive ? ' pf-active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              );
            })}
          </div>
          <Link href="/contact" className="btn-outline" style={{ flexShrink: 0 }}>
            Start a Project
          </Link>
        </div>

        {/* Uneven grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridAutoRows: '260px',
          gap: '12px',
        }}>
          {filtered.map((project, i) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className="portfolio-card portfolio-item"
              style={{
                ...getGridStyle(project.gridSize, i),
                display: 'block',
                textDecoration: 'none',
                position: 'relative',
                overflow: 'hidden',
                background: 'var(--teal-mid)',
              }}
            >
              {/* Image */}
              {project.thumbnailUrl && (
                <img
                  src={project.thumbnailUrl}
                  alt={project.title}
                  className="portfolio-card-img"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease', display: 'block' }}
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                />
              )}

              {/* Overlay — bottom-only gradient so image stays visible */}
              <div
                className="portfolio-card-inner"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '75%',
                  background: 'linear-gradient(to top, rgba(17,45,50,0.97) 0%, rgba(17,45,50,0.75) 45%, transparent 100%)',
                  padding: '24px 24px 22px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  opacity: 0,
                  transition: 'opacity 0.35s ease',
                }}
              >
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
                  {project.categories.slice(0, 2).map((cat) => (
                    <span key={cat} style={{ fontSize: '0.65rem', letterSpacing: '0.12em', color: 'var(--teal-light)', textTransform: 'uppercase' }}>{cat}</span>
                  ))}
                </div>
                <h3 style={{ color: '#e8e4df', fontSize: 'clamp(1rem, 2vw, 1.25rem)', fontWeight: 700, marginBottom: 8, lineHeight: 1.2 }}>{project.title}</h3>
                <p style={{ color: 'rgba(232,228,223,0.65)', fontSize: '0.83rem', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {project.shortDesc}
                </p>
                <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 6, color: 'var(--teal-light)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  View Project <span style={{ fontSize: '1rem' }}>→</span>
                </div>
              </div>

              {/* Always-visible title badge for small cards */}
              {project.gridSize === 'small' && (
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '12px 16px',
                  background: 'linear-gradient(to top, rgba(17,45,50,0.9), transparent)',
                  pointerEvents: 'none',
                }}>
                  <div style={{ color: '#e8e4df', fontSize: '0.85rem', fontWeight: 600 }}>{project.title}</div>
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .portfolio-filter-btn {
          display: inline-flex;
          align-items: center;
          padding: 10px 24px;
          border-radius: 4px;
          border: 1px solid rgba(136,189,188,0.2);
          background: rgba(37,78,88,0.3);
          color: rgba(232,228,223,0.55);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          cursor: pointer;
          outline: none;
          transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
        }
        .portfolio-filter-btn:hover {
          color: var(--teal-light);
          border-color: rgba(136,189,188,0.5);
          background: rgba(136,189,188,0.1);
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(136,189,188,0.12);
        }
        .portfolio-filter-btn:active { transform: translateY(0); box-shadow: none; }
        .portfolio-filter-btn.pf-active {
          color: var(--teal-dark);
          background: var(--teal-light);
          border-color: var(--teal-light);
          box-shadow: 0 4px 20px rgba(136,189,188,0.35);
        }
        .portfolio-filter-btn.pf-active:hover {
          color: var(--teal-dark);
          background: var(--teal-light);
          transform: translateY(-2px);
          box-shadow: 0 6px 24px rgba(136,189,188,0.45);
        }
        .portfolio-card:hover .portfolio-card-inner { opacity: 1 !important; }
        .portfolio-card:hover .portfolio-card-img { transform: scale(1.06); }
        @media (max-width: 768px) {
          #portfolio .portfolio-item {
            grid-column: span 4 !important;
            grid-row: span 1 !important;
          }
        }
        @media (max-width: 480px) {
          #portfolio div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
