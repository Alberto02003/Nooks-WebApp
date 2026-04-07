import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import StatsBar from '../components/StatsBar';
import Features from '../components/Features';
import HighlightCards from '../components/HighlightCards';
import HowItWorks from '../components/HowItWorks';
import FAQ from '../components/FAQ';

export default function HomePage() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return (
    <>
      <Hero />
      <StatsBar />
      <Features />
      <HighlightCards />
      <HowItWorks />
      <FAQ />
    </>
  );
}
