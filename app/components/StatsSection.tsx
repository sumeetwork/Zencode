'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 101, suffix: '+', label: 'Happy Clients' },
  { value: 2980, suffix: '', label: 'Hours Worked / Year' },
  { value: 10, suffix: '+', label: 'Years of Experience' },
  { value: 50, suffix: '+', label: 'Projects Delivered' },
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.stat-item', {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.stat-item', start: 'top 85%' },
      });

      // Count-up animation
      document.querySelectorAll('.stat-number').forEach((el) => {
        const target = parseInt(el.getAttribute('data-target') || '0', 10);
        gsap.fromTo(
          el,
          { textContent: 0 },
          {
            textContent: target,
            duration: 2,
            ease: 'power1.out',
            snap: { textContent: 1 },
            scrollTrigger: { trigger: el, start: 'top 85%' },
            onUpdate() { el.textContent = Math.ceil(parseFloat(el.textContent || '0')).toLocaleString(); },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        padding: '100px 0',
        background: 'var(--teal-mid)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* BG pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(rgba(136,189,188,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(136,189,188,0.04) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px', position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
          {stats.map((stat) => (
            <div key={stat.label} className="stat-item" style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 2 }}>
                <span
                  className="stat-number"
                  data-target={stat.value}
                  style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: 'var(--teal-light)', lineHeight: 1, letterSpacing: '-0.04em' }}
                >
                  {stat.value.toLocaleString()}
                </span>
                <span style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 800, color: 'var(--teal-light)', letterSpacing: '-0.04em' }}>{stat.suffix}</span>
              </div>
              <div style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: 'rgba(232,228,223,0.45)', textTransform: 'uppercase', marginTop: 12 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
