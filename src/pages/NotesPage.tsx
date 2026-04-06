import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { gsap, useGSAP } from '../lib/gsap';

export default function NotesPage() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const cards = t('pages.notes.feature_cards', { returnObjects: true }) as { title: string; desc: string }[];

  useGSAP(() => {
    // Editor canvas scales up on scroll
    gsap.fromTo('.notes-editor', { scale: 0.8, borderRadius: '3rem' }, {
      scale: 1, borderRadius: '1.5rem', ease: 'none',
      scrollTrigger: { trigger: '.notes-editor', start: 'top 85%', end: 'top 30%', scrub: 1 },
    });

    // Feature cards slide in from alternating sides
    document.querySelectorAll('.note-card').forEach((card, i) => {
      const fromLeft = i % 2 === 0;
      gsap.fromTo(card, { x: fromLeft ? -80 : 80, opacity: 0 }, {
        x: 0, opacity: 1, ease: 'none',
        scrollTrigger: { trigger: card, start: 'top 80%', end: 'top 45%', scrub: 0.8 },
      });
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef}>
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border-card text-xs text-text-secondary mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            {t('pages.notes.badge')}
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6 whitespace-pre-line">
            {t('pages.notes.title')}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
            {t('pages.notes.subtitle')}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-lime text-bg-primary font-semibold text-sm hover:-translate-y-0.5 hover:shadow-lg hover:shadow-lime/20 transition-all duration-200">
              {t('nav.download')}
            </a>
            <Link to="/" className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-white/10 text-white font-medium text-sm hover:border-white/25 transition-all duration-200">
              {t('feature_pages.back_home')}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Editor Canvas — scales up on scroll */}
      <section className="pb-24 md:pb-32 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="notes-editor section-surface rounded-[3rem] p-6 md:p-10 overflow-hidden">
            {/* Window chrome */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-error/60" />
              <div className="w-3 h-3 rounded-full bg-lime/40" />
              <div className="w-3 h-3 rounded-full bg-accent/40" />
              <div className="flex-1" />
              <span className="text-[10px] text-text-muted uppercase tracking-widest">Editor</span>
            </div>
            {/* Tag bar */}
            <div className="flex gap-2 mb-6">
              <span className="px-3 py-1 rounded-full bg-accent/15 text-accent text-xs">{t('pages.notes.editor_tag')}</span>
              <span className="px-3 py-1 rounded-full bg-white/[0.04] text-text-muted text-xs">Ideas</span>
            </div>
            {/* Note skeleton lines */}
            <div className="space-y-4">
              {[85, 70, 92, 55, 78, 60, 45].map((w, i) => (
                <div key={i} className="h-3 rounded-full" style={{
                  width: `${w}%`,
                  background: i < 2 ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.06)',
                }} />
              ))}
            </div>
            {/* Bookmark icon */}
            <div className="absolute top-6 right-6 md:top-10 md:right-10">
              <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 24 24"><path d="M5 2h14a1 1 0 0 1 1 1v19.143a.5.5 0 0 1-.766.424L12 18.03l-7.234 4.536A.5.5 0 0 1 4 22.143V3a1 1 0 0 1 1-1z" /></svg>
            </div>
          </div>
        </div>
      </section>

      {/* Feature cards — alternating sides with center line */}
      <section className="pb-24 md:pb-40 px-6">
        <div className="mx-auto max-w-4xl relative">
          {/* Center line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border-card -translate-x-1/2" />

          <div className="flex flex-col gap-16 md:gap-24">
            {cards.map((card, i) => (
              <div key={card.title} className={`note-card md:w-[45%] ${i % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}>
                <div className="section-surface rounded-3xl p-8">
                  <h3 className="text-xl font-semibold mb-3">{card.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 md:pb-40 px-6">
        <div className="mx-auto max-w-4xl section-surface rounded-3xl p-12 md:p-20 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-5">{t('feature_pages.cta_title')}</h2>
          <p className="text-text-secondary text-lg mb-10">{t('feature_pages.cta_desc')}</p>
          <a href="#" className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-lime text-bg-primary font-semibold hover:-translate-y-0.5 hover:shadow-lg hover:shadow-lime/20 transition-all duration-200">
            {t('feature_pages.cta_button')}
          </a>
        </div>
      </section>
    </div>
  );
}
