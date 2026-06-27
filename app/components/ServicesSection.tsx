'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: '⚡',
    title: 'AI Automation',
    desc: 'Transform manual processes into intelligent, self-optimizing workflows. From automated lead management and 24/7 AI support agents to dynamic content creation — we deliver measurable impact from day one.',
    tags: ['Workflow Automation', 'AI Agents', 'Lead Management'],
  },
  {
    icon: '💻',
    title: 'Web Development',
    desc: 'Your website is the hub of all your online activity. We design responsive, fast-loading websites that help you generate the most conversions through attractive design and user-friendly experience.',
    tags: ['WordPress', 'React / Next.js', 'Custom CMS'],
  },
  {
    icon: '🎨',
    title: 'Web Design',
    desc: 'We work in fast-driven new web-based strategies crafted from long-term research. We create content and graphics focusing on your brand objectives — more than likes, real growth.',
    tags: ['UI / UX', 'Brand Identity', 'Responsive Design'],
  },
  {
    icon: '🛍️',
    title: 'eCommerce',
    desc: 'From UX/UI design to product catalogues and payment gateways, we build digital commerce experiences that convert. WooCommerce, Shopify, or fully custom — we cover it all.',
    tags: ['WooCommerce', 'Shopify', 'Payment Gateways'],
  },
  {
    icon: '🔍',
    title: 'SEO & Optimisation',
    desc: 'Drive targeted traffic and improve your search rankings. Our dedicated SEO specialists handle technical optimisation, speed improvements, and keyword strategy to move you up in results.',
    tags: ['Technical SEO', 'Page Speed', 'Analytics'],
  },
  {
    icon: '🛡️',
    title: 'Website Maintenance',
    desc: 'Keep your site secure, fast, and up to date. We handle ongoing maintenance, updates, backups, and performance monitoring so you can focus on running your business.',
    tags: ['Security', 'Updates', 'Monitoring'],
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.services-heading', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.services-heading', start: 'top 85%' },
      });
      gsap.from('.service-card', {
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.service-card', start: 'top 85%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" style={{ padding: '120px 0', background: 'rgba(37,78,88,0.15)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>
        <div className="services-heading" style={{ marginBottom: 72, maxWidth: 560 }}>
          <span className="section-label">What We Do</span>
          <h2 className="section-title">Our Services</h2>
          <p style={{ marginTop: 20, color: 'rgba(232,228,223,0.55)', lineHeight: 1.75, fontSize: '1rem' }}>
            From idea to launch — we handle everything your brand needs to succeed online.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 2 }}>
          {services.map((service, i) => (
            <div
              key={service.title}
              className="service-card"
              style={{
                padding: '44px 40px',
                background: i % 2 === 0 ? 'rgba(17,45,50,0.6)' : 'rgba(37,78,88,0.25)',
                border: '1px solid rgba(136,189,188,0.06)',
                transition: 'background 0.3s, border-color 0.3s',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = 'rgba(37,78,88,0.5)';
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(136,189,188,0.15)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = i % 2 === 0 ? 'rgba(17,45,50,0.6)' : 'rgba(37,78,88,0.25)';
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(136,189,188,0.06)';
              }}
            >
              <div style={{ fontSize: '1.8rem', marginBottom: 20 }}>{service.icon}</div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#e8e4df', marginBottom: 14, letterSpacing: '-0.01em' }}>{service.title}</h3>
              <p style={{ color: 'rgba(232,228,223,0.55)', fontSize: '0.9rem', lineHeight: 1.75, marginBottom: 24 }}>{service.desc}</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {service.tags.map((tag) => (
                  <span key={tag} style={{ fontSize: '0.7rem', letterSpacing: '0.1em', color: 'var(--teal-light)', background: 'rgba(136,189,188,0.08)', padding: '4px 10px', borderRadius: 2 }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
