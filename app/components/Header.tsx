'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/#services', label: 'Services' },
  { href: '/#portfolio', label: 'Work' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.header-logo', { y: -20, opacity: 0, duration: 0.8, ease: 'power3.out' });
      gsap.from('.header-nav-item', {
        y: -20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.2,
      });
    }, headerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? 'rgba(17,45,50,0.97)'
          : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(136,189,188,0.1)' : 'none',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        padding: scrolled ? '16px 0' : '28px 0',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link href="/" className="header-logo" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <img
            src="/images/logo1.png"
            alt="ZenCode Web Solutions"
            className="logo-pulse"
            style={{ height: 44, width: 'auto', display: 'block' }}
          />
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', gap: '36px', alignItems: 'center' }} className="hidden-mobile">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link header-nav-item ${pathname === link.href ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" className="btn-primary header-nav-item" style={{ padding: '10px 24px', fontSize: '0.75rem' }}>
            Get a Quote
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="mobile-menu-btn"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, display: 'none' }}
          aria-label="Toggle menu"
        >
          <div style={{ width: 24, height: 2, background: '#e8e4df', marginBottom: 5, transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
          <div style={{ width: 24, height: 2, background: '#e8e4df', marginBottom: 5, transition: 'all 0.3s', opacity: menuOpen ? 0 : 1 }} />
          <div style={{ width: 24, height: 2, background: '#e8e4df', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: 'rgba(17,45,50,0.98)', borderTop: '1px solid rgba(136,189,188,0.1)', padding: '20px 40px 28px' }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link ${pathname === link.href ? 'active' : ''}`}
              style={{ display: 'block', padding: '12px 0', fontSize: '0.9rem' }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" className="btn-primary" style={{ marginTop: 16, padding: '12px 28px' }} onClick={() => setMenuOpen(false)}>
            Get a Quote
          </Link>
        </div>
      )}

      <style>{`
        .logo-pulse {
          animation: logoPulse 3s ease-in-out infinite;
        }
        @keyframes logoPulse {
          0%, 100% { filter: none; }
          40%       { filter: invert(1); }
          60%       { filter: invert(1); }
        }
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </header>
  );
}
