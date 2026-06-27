'use client';

import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { gsap } from 'gsap';
import ContactForm from './ContactForm';

export default function InstagramModal() {
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const source = searchParams.get('utm_source') || searchParams.get('ref') || searchParams.get('from');
    if (source && source.toLowerCase() === 'instagram') {
      setIsOpen(true);
    }
  }, [searchParams]);

  useEffect(() => {
    if (isOpen && overlayRef.current && modalRef.current) {
      gsap.from(overlayRef.current, { opacity: 0, duration: 0.4 });
      gsap.from(modalRef.current, { y: 60, opacity: 0, duration: 0.5, ease: 'power3.out' });
    }
  }, [isOpen]);

  const close = () => {
    if (overlayRef.current && modalRef.current) {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3 });
      gsap.to(modalRef.current, { y: 40, opacity: 0, duration: 0.3, onComplete: () => setIsOpen(false) });
    } else {
      setIsOpen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div ref={overlayRef} className="overlay-modal" onClick={(e) => e.target === overlayRef.current && close()}>
      <div
        ref={modalRef}
        style={{
          background: 'var(--teal-mid)',
          border: '1px solid rgba(136,189,188,0.2)',
          borderRadius: 4,
          maxWidth: 620,
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '48px',
          position: 'relative',
        }}
      >
        {/* Close */}
        <button
          onClick={close}
          style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', color: 'rgba(232,228,223,0.5)', fontSize: '1.4rem', cursor: 'pointer', lineHeight: 1, padding: 4 }}
          aria-label="Close"
        >
          ✕
        </button>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <span className="section-label">👋 Welcome from Instagram</span>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#e8e4df', marginBottom: 12, lineHeight: 1.2 }}>
            Let&apos;s Build Something Great
          </h2>
          <p style={{ color: 'rgba(232,228,223,0.6)', lineHeight: 1.7, fontSize: '0.95rem' }}>
            Tell us about your project and we&apos;ll get back to you with a plan and pricing — usually within 24 hours.
          </p>
        </div>

        <ContactForm onSuccess={close} compact />
      </div>
    </div>
  );
}
