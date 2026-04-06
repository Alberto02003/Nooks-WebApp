import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { gsap, useGSAP } from '../lib/gsap';

interface StatusItem { label: string; status: 'ready' | 'beta' | 'soon' }

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    ready: 'bg-lime/15 text-lime',
    beta: 'bg-accent/15 text-accent',
    soon: 'bg-white/[0.06] text-text-muted',
  };
  const labels: Record<string, string> = { ready: 'Ready', beta: 'Beta', soon: 'Soon' };
  return (
    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${colors[status]}`}>
      {labels[status]}
    </span>
  );
}

export default function BetaPage() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);

  const sections = t('pages.beta.sections', { returnObjects: true }) as { title: string; items: StatusItem[] }[];
  const roadmap = t('pages.beta.roadmap', { returnObjects: true }) as { phase: string; title: string; items: string[] }[];

  useGSAP(() => {
    // Status cards scale up on scroll
    gsap.fromTo('.status-card', { scale: 0.85, opacity: 0 }, {
      scale: 1, opacity: 1, stagger: 0.08,
      scrollTrigger: { trigger: '.status-grid', start: 'top 80%', end: 'top 30%', scrub: 1 },
    });

    // Roadmap line grows
    gsap.fromTo('.roadmap-line', { scaleY: 0, transformOrigin: 'top' }, {
      scaleY: 1,
      scrollTrigger: { trigger: '.roadmap-section', start: 'top 65%', end: 'bottom 40%', scrub: 1 },
    });

    // Roadmap items slide in
    gsap.fromTo('.roadmap-item', { x: -30, opacity: 0 }, {
      x: 0, opacity: 1, stagger: 0.15,
      scrollTrigger: { trigger: '.roadmap-section', start: 'top 60%', end: 'bottom 50%', scrub: 1 },
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef}>
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/5 text-xs text-accent font-medium mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            {t('pages.beta.badge')}
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6">
            {t('pages.beta.title_line1')}<br /><span className="text-accent">{t('pages.beta.title_line2')}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            {t('pages.beta.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Status grid */}
      <section className="pb-24 md:pb-32 px-6">
        <div className="status-grid mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section) => (
            <div key={section.title} className="status-card section-surface rounded-3xl p-8">
              <h3 className="text-lg font-semibold mb-6">{section.title}</h3>
              <div className="space-y-4">
                {section.items.map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">{item.label}</span>
                    <StatusBadge status={item.status} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Roadmap */}
      <section className="roadmap-section pb-24 md:pb-40 px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">{t('pages.beta.roadmap_title')}</h2>
          <div className="relative">
            <div className="roadmap-line absolute left-6 md:left-8 top-0 bottom-0 w-px bg-accent/40" />
            <div className="flex flex-col gap-12">
              {roadmap.map((phase, i) => (
                <div key={phase.phase} className="roadmap-item relative pl-16 md:pl-20">
                  <div className={`absolute left-4 md:left-6 top-1 w-4 h-4 rounded-full border-2 ${i === 0 ? 'bg-accent border-accent' : 'bg-bg-primary border-border-card'}`} />
                  <span className="text-xs font-bold text-accent uppercase tracking-[0.2em]">{phase.phase}</span>
                  <h3 className="text-xl font-semibold mt-1 mb-3">{phase.title}</h3>
                  <ul className="space-y-2">
                    {phase.items.map((item) => (
                      <li key={item} className="text-sm text-text-secondary flex items-start gap-2">
                        <span className="text-text-muted mt-1">-</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 md:pb-40 px-6">
        <div className="mx-auto max-w-4xl section-surface rounded-3xl p-12 md:p-20 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-5">{t('pages.beta.cta_title')}</h2>
          <p className="text-text-secondary text-lg mb-10 max-w-lg mx-auto">{t('pages.beta.cta_subtitle')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#" className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-lime text-bg-primary font-semibold hover:-translate-y-0.5 hover:shadow-lg hover:shadow-lime/20 transition-all duration-200">
              {t('pages.beta.cta_button')}
            </a>
            <Link to="/" className="inline-flex items-center justify-center px-10 py-4 rounded-full border border-white/10 text-white font-medium hover:border-white/25 hover:-translate-y-0.5 transition-all duration-200">
              {t('feature_pages.back_home')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
