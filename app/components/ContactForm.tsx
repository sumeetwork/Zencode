'use client';

import { useState } from 'react';

const PROJECT_TYPES = [
  { value: '',            label: 'Select Project Type' },
  { value: 'website',    label: 'New Website' },
  { value: 'redesign',   label: 'Website Redesign' },
  { value: 'ecommerce',  label: 'eCommerce / Online Store' },
  { value: 'seo',        label: 'SEO & Optimisation' },
  { value: 'ai',         label: 'AI Automation' },
  { value: 'maintenance',label: 'Maintenance & Support' },
  { value: 'other',      label: 'Other / Custom Project' },
];

const PROJECT_TYPE_LABEL: Record<string, string> = {
  website: 'New Website',
  redesign: 'Website Redesign',
  ecommerce: 'eCommerce / Online Store',
  seo: 'SEO & Optimisation',
  ai: 'AI Automation',
  maintenance: 'Maintenance & Support',
  other: 'Other / Custom Project',
};

interface Props {
  onSuccess?: () => void;
  compact?: boolean;
}

export default function ContactForm({ onSuccess, compact }: Props) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', projectType: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    try {
      const res = await fetch('https://formspree.io/f/mwvdonll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'Full Name': form.name,
          'Email Address': form.email,
          'Phone Number': form.phone || 'Not provided',
          'Project Type': PROJECT_TYPE_LABEL[form.projectType] ?? form.projectType,
          'Message': form.message,
          _replyto: form.email,
          _subject: `New Enquiry — ${PROJECT_TYPE_LABEL[form.projectType] ?? 'Project'} from ${form.name}`,
        }),
      });
      if (!res.ok) throw new Error('Server error');
      setStatus('sent');
      if (onSuccess) setTimeout(onSuccess, 2500);
    } catch {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again or email us at info@zencode.co.za');
    }
  };

  if (status === 'sent') {
    return (
      <div style={{ textAlign: 'center', padding: compact ? '24px 0' : '52px 0' }}>
        <div style={{
          width: 60, height: 60, borderRadius: '50%',
          background: 'rgba(136,189,188,0.12)', border: '2px solid rgba(136,189,188,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 20px', fontSize: '1.6rem',
        }}>✓</div>
        <h3 style={{ color: 'var(--teal-light)', fontSize: '1.3rem', fontWeight: 700, marginBottom: 10 }}>
          Message Sent!
        </h3>
        <p style={{ color: 'rgba(232,228,223,0.65)', fontSize: '0.95rem', lineHeight: 1.7, maxWidth: 380, margin: '0 auto' }}>
          Thanks for reaching out, <strong style={{ color: '#e8e4df' }}>{form.name.split(' ')[0]}</strong>!
          We&apos;ve sent a confirmation to <strong style={{ color: '#e8e4df' }}>{form.email}</strong> with your enquiry details.
          We&apos;ll be in touch within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-fields-grid" style={{ display: 'grid', gridTemplateColumns: compact ? '1fr' : '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', color: 'rgba(232,228,223,0.5)', textTransform: 'uppercase', marginBottom: 8 }}>Full Name *</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Your full name" className="form-input" />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', color: 'rgba(232,228,223,0.5)', textTransform: 'uppercase', marginBottom: 8 }}>Email *</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="your@email.com" className="form-input" />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', color: 'rgba(232,228,223,0.5)', textTransform: 'uppercase', marginBottom: 8 }}>Contact Number</label>
          <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+27 ..." className="form-input" />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', color: 'rgba(232,228,223,0.5)', textTransform: 'uppercase', marginBottom: 8 }}>Project Type *</label>
          <select name="projectType" value={form.projectType} onChange={handleChange} required className="form-select">
            {PROJECT_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ marginBottom: 24 }}>
        <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', color: 'rgba(232,228,223,0.5)', textTransform: 'uppercase', marginBottom: 8 }}>Project Summary *</label>
        <textarea name="message" value={form.message} onChange={handleChange} required placeholder="Tell us about your project, goals, timeline..." className="form-textarea" />
      </div>

      {status === 'error' && (
        <p style={{ color: '#f87171', fontSize: '0.85rem', marginBottom: 16, padding: '10px 14px', background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: 3 }}>
          {errorMsg}
        </p>
      )}

      <button type="submit" disabled={status === 'sending'} className="btn-primary"
        style={{ width: '100%', justifyContent: 'center', opacity: status === 'sending' ? 0.7 : 1, cursor: status === 'sending' ? 'not-allowed' : 'pointer' }}>
        {status === 'sending' ? (
          <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />
            Sending…
          </span>
        ) : 'Send Message →'}
      </button>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 640px) {
          .form-fields-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </form>
  );
}
