import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with ZenCode Web Solutions. Tell us about your project and we\'ll respond within 24 hours with a plan and pricing.',
  alternates: { canonical: 'https://zencode.co.za/contact' },
  openGraph: {
    title: 'Contact ZenCode | Start Your Project',
    description: 'Get in touch with ZenCode Web Solutions. We respond within 24 hours with a plan and pricing.',
    url: 'https://zencode.co.za/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
