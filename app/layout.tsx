import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import InstagramModal from "./components/InstagramModal";

const SITE_URL = 'https://zencode.co.za';
const SITE_NAME = 'ZenCode Web Solutions';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'ZenCode | Web Solutions Agency South Africa',
    template: '%s | ZenCode Web Solutions',
  },
  description: 'ZenCode is a South African web solutions agency specialising in custom websites, eCommerce stores, SEO optimisation, and AI automation for businesses across South Africa and beyond.',
  keywords: ['web development', 'web design', 'eCommerce', 'SEO', 'AI automation', 'South Africa', 'ZenCode', 'WordPress', 'Next.js'],
  authors: [{ name: 'ZenCode Web Solutions', url: SITE_URL }],
  creator: 'ZenCode Web Solutions',
  publisher: 'ZenCode Web Solutions',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'ZenCode | Web Solutions Agency South Africa',
    description: 'Custom websites, eCommerce, SEO & AI automation for South African businesses.',
    images: [{ url: '/images/logo1.png', width: 800, height: 800, alt: 'ZenCode Web Solutions' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZenCode | Web Solutions Agency South Africa',
    description: 'Custom websites, eCommerce, SEO & AI automation for South African businesses.',
    images: ['/images/logo1.png'],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-ZA">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </head>
      <body style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Local Business structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProfessionalService',
              name: 'ZenCode Web Solutions',
              url: SITE_URL,
              logo: `${SITE_URL}/images/logo.png`,
              description: 'South African web solutions agency specialising in custom websites, eCommerce, SEO, and AI automation.',
              address: { '@type': 'PostalAddress', addressCountry: 'ZA' },
              areaServed: 'South Africa',
              serviceType: ['Web Development', 'Web Design', 'eCommerce', 'SEO', 'AI Automation'],
              email: 'info@zencode.co.za',
              sameAs: ['https://zencode.co.za'],
            }),
          }}
        />
        <Header />
        <main style={{ flex: 1 }}>
          {children}
        </main>
        <Footer />
        <Suspense fallback={null}>
          <InstagramModal />
        </Suspense>
      </body>
    </html>
  );
}
