import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/home/Hero';
import StatsBar from '../components/home/StatsBar';
import Features from '../components/home/Features';
import HighlightCards from '../components/home/HighlightCards';
import HowItWorks from '../components/home/HowItWorks';

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
    </>
  );
}
