import type { Metadata } from 'next';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import PortfolioGrid from './components/PortfolioGrid';
import StatsSection from './components/StatsSection';
import ContactSection from './components/ContactSection';

export const metadata: Metadata = {
  title: 'ZenCode | Web Solutions Agency South Africa',
  description: 'ZenCode is a South African web solutions agency building custom websites, eCommerce stores, and AI-powered tools for businesses across South Africa and beyond.',
  alternates: { canonical: 'https://zencode.co.za' },
  openGraph: {
    title: 'ZenCode | Web Solutions Agency South Africa',
    description: 'Custom websites, eCommerce, SEO & AI automation for South African businesses.',
    url: 'https://zencode.co.za',
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PortfolioGrid />
      <ServicesSection />
      <StatsSection />
      <ContactSection />
    </>
  );
}
