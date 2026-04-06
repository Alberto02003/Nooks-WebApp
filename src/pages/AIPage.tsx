import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap';

const entityColors: Record<string, string> = {
  person: '#5E8BFF',
  date: '#C9FD4D',
  task: '#FF8C42',
  topic: '#A78BFA',
};

const proposalIcons: Record<string, string> = {
  task: '✓',
  event: '◉',
  note: '✎',
};

const proposalColors: Record<string, string> = {
  task: '#C9FD4D',
  event: '#5E8BFF',
  note: '#FF8C42',
};

export default function AIPage() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const entities = t('pages.ai.waveform_entities', { returnObjects: true }) as { label: string; type: string }[];
  const proposals = t('pages.ai.proposals', { returnObjects: true }) as { type: string; title: string; desc: string }[];
  const chatSections = t('pages.ai.chat_ai_sections', { returnObjects: true }) as { heading: string; items: string[] }[];

  useGSAP(() => {
    ScrollTrigger.matchMedia({
      '(min-width: 768px)': () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: '.waveform-section',
            pin: true,
            anticipatePin: 1,
            start: 'top top',
            end: '+=200%',
            scrub: 1,
          },
        });

        // Playhead moves across
        tl.fromTo('.waveform-playhead', { left: '0%' }, { left: '100%', duration: 2, ease: 'none' });

        // Bars change color progressively
        document.querySelectorAll('.wave-bar').forEach((bar, i, all) => {
          const pos = i / all.length;
          tl.fromTo(bar, { backgroundColor: 'rgba(255,255,255,0.08)' },
            { backgroundColor: '#5E8BFF', duration: 0.05 }, pos * 2);
        });

        // Entity tags pop up at specific points
        entities.forEach((_, i) => {
          const pos = (i + 1) / (entities.length + 1);
          tl.fromTo(`.entity-tag-${i}`, { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.15, ease: 'back.out(2)' }, pos * 2);
        });
      },
      '(max-width: 767px)': () => {
        gsap.fromTo('.wave-bar', { scaleY: 0.3 }, {
          scaleY: 1, stagger: 0.02,
          scrollTrigger: { trigger: '.waveform-section', start: 'top 80%', end: 'top 30%', scrub: 1 },
        });
        gsap.fromTo('.entity-tag', { scale: 0, opacity: 0 }, {
          scale: 1, opacity: 1, stagger: 0.1,
          scrollTrigger: { trigger: '.waveform-section', start: 'top 60%', end: 'top 20%', scrub: 1 },
        });
      },
    });

    // Proposal cards cascade
    gsap.fromTo('.proposal-card', { y: -60, rotation: -5, scale: 0.7, opacity: 0 }, {
      y: 0, rotation: 0, scale: 1, opacity: 1, stagger: 0.2,
      scrollTrigger: { trigger: '.proposals-section', start: 'top 75%', end: 'top 30%', scrub: 1 },
    });

    // Chat simulation — GSAP scroll-driven timeline
    const chatTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.chat-section',
        start: 'top 70%',
        end: 'top 10%',
        scrub: 1,
      },
    });

    // 1. Chat window scales up
    chatTl.fromTo('.chat-window', { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3 });

    // 2. User message slides in from right
    chatTl.fromTo('.chat-user-bubble', { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3 }, '+=0.05');

    // 3. Typing indicator appears
    chatTl.fromTo('.chat-typing', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.15 }, '+=0.05');

    // 4. Typing indicator disappears, AI bubble appears
    chatTl.to('.chat-typing', { scale: 0, opacity: 0, duration: 0.1 });
    chatTl.fromTo('.chat-ai-bubble', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3 }, '-=0.05');

    // 5. Each section reveals staggered
    chatSections.forEach((_, i) => {
      chatTl.fromTo(`.chat-section-block-${i}`, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.2 }, '-=0.05');
    });

    // 6. Summary line
    chatTl.fromTo('.chat-summary', { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.2 }, '-=0.05');

    // 7. Copy button
    chatTl.fromTo('.chat-copy-btn', { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.15 }, '+=0.02');

    // Privacy card entrance
    gsap.fromTo('.privacy-card', { y: 40, opacity: 0 }, {
      y: 0, opacity: 1,
      scrollTrigger: { trigger: '.privacy-card', start: 'top 85%', end: 'top 55%', scrub: 1 },
    });
  }, { scope: containerRef });

  // Generate wave bars
  const barCount = 60;
  const bars = Array.from({ length: barCount }, (_, i) => {
    const h = 20 + Math.sin(i * 0.4) * 30 + Math.random() * 25;
    return h;
  });

  return (
    <div ref={containerRef}>
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-6 relative">
        <div className="mx-auto max-w-4xl text-center relative">
          {/* Pulsing rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {[1, 2, 3].map((ring) => (
              <motion.div key={ring} className="absolute rounded-full border border-accent/10"
                style={{ width: `${ring * 200}px`, height: `${ring * 200}px` }}
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.1, 0.3] }}
                transition={{ duration: 3, delay: ring * 0.5, repeat: Infinity }} />
            ))}
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/5 text-xs text-accent font-medium mb-8 relative">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            {t('pages.ai.badge')}
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6 whitespace-pre-line relative">
            {t('pages.ai.title')}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed relative">
            {t('pages.ai.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Waveform — pinned on desktop */}
      <section className="waveform-section min-h-screen flex items-center justify-center px-6 py-20">
        <div className="mx-auto max-w-4xl w-full">
          <div className="section-surface rounded-3xl p-8 md:p-12 relative overflow-hidden">
            {/* Window chrome */}
            <div className="flex items-center gap-2 mb-8">
              <div className="w-3 h-3 rounded-full bg-error/60" />
              <div className="w-3 h-3 rounded-full bg-lime/40" />
              <div className="w-3 h-3 rounded-full bg-accent/40" />
              <span className="text-[10px] text-text-muted uppercase tracking-widest ml-auto">Meeting Recording</span>
            </div>

            {/* Waveform bars */}
            <div className="relative h-32 md:h-40 flex items-end gap-[2px] md:gap-1">
              {/* Playhead */}
              <div className="waveform-playhead absolute top-0 bottom-0 w-0.5 bg-accent z-10" style={{ left: '0%' }} />

              {bars.map((h, i) => (
                <div key={i} className="wave-bar flex-1 rounded-t-sm" style={{
                  height: `${h}%`,
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  transformOrigin: 'bottom',
                }} />
              ))}
            </div>

            {/* Entity tags floating above waveform */}
            <div className="relative h-16 mt-4">
              {entities.map((entity, i) => {
                const leftPercent = ((i + 1) / (entities.length + 1)) * 100;
                return (
                  <span key={entity.label}
                    className={`entity-tag entity-tag-${i} absolute px-3 py-1.5 rounded-full text-xs font-semibold`}
                    style={{
                      left: `${leftPercent}%`,
                      transform: 'translateX(-50%)',
                      background: `${entityColors[entity.type]}20`,
                      color: entityColors[entity.type],
                      border: `1px solid ${entityColors[entity.type]}40`,
                    }}>
                    {entity.label}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Action Proposals — cascade */}
      <section className="proposals-section py-24 md:py-40 px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">Smart Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {proposals.map((proposal) => (
              <div key={proposal.title} className="proposal-card section-surface rounded-3xl p-8 text-center">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl mx-auto mb-5"
                  style={{ background: `${proposalColors[proposal.type]}15`, color: proposalColors[proposal.type] }}>
                  {proposalIcons[proposal.type]}
                </div>
                <h3 className="text-lg font-semibold mb-2">{proposal.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{proposal.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Chat Simulation */}
      <section className="chat-section py-24 md:py-40 px-6">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">{t('pages.ai.chat_title')}</h2>

          {/* Chat window */}
          <div className="chat-window section-surface rounded-3xl overflow-hidden">
            {/* Chat header */}
            <div className="flex items-center gap-3 px-6 py-4 border-b border-white/[0.06]">
              <div className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #C9FD4D, rgba(201,253,77,0.3))' }}>
                <svg className="w-5 h-5 text-bg-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Nooks AI</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime" />
                  <span className="text-[11px] text-text-muted">Online</span>
                </div>
              </div>
              <div className="ml-auto w-8 h-8 rounded-full flex items-center justify-center bg-white/[0.04]">
                <svg className="w-4 h-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </div>
            </div>

            {/* Chat body */}
            <div className="px-6 py-6 space-y-5 min-h-[420px]">
              {/* User message — right aligned */}
              <div className="chat-user-bubble flex justify-end">
                <div className="max-w-[75%]">
                  <div className="bg-accent rounded-2xl rounded-tr-md px-4 py-3">
                    <p className="text-sm text-white font-medium">{t('pages.ai.chat_user_msg')}</p>
                  </div>
                  <p className="text-[10px] text-text-muted text-right mt-1.5">10:32 AM</p>
                </div>
              </div>

              {/* Typing indicator */}
              <div className="chat-typing flex items-end gap-2">
                <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: 'linear-gradient(135deg, #C9FD4D, rgba(201,253,77,0.3))' }}>
                  <svg className="w-3.5 h-3.5 text-bg-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
                  </svg>
                </div>
                <div className="bg-[#2A2A3D] rounded-2xl rounded-bl-md px-4 py-3 flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-text-muted animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-text-muted animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-text-muted animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>

              {/* AI response — left aligned */}
              <div className="chat-ai-bubble flex items-start gap-2">
                <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-1"
                  style={{ background: 'linear-gradient(135deg, #C9FD4D, rgba(201,253,77,0.3))' }}>
                  <svg className="w-3.5 h-3.5 text-bg-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
                  </svg>
                </div>
                <div className="max-w-[85%]">
                  <div className="bg-[#2A2A3D] border border-white/[0.06] rounded-2xl rounded-bl-md px-5 py-4 space-y-4">
                    {/* Sections with accent bars */}
                    {chatSections.map((section, i) => (
                      <div key={section.heading} className={`chat-section-block-${i}`}>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-0.5 h-4 rounded-full bg-lime" />
                          <h4 className="text-xs font-bold text-lime uppercase tracking-wider">{section.heading}</h4>
                        </div>
                        <ul className="space-y-1.5 pl-3">
                          {section.items.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-sm text-text-secondary leading-relaxed">
                              <span className="w-1.5 h-1.5 rounded-full bg-text-muted mt-1.5 shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}

                    {/* Summary */}
                    <div className="chat-summary border-t border-white/[0.06] pt-3">
                      <p className="text-sm text-white/85 leading-relaxed">{t('pages.ai.chat_ai_summary')}</p>
                    </div>
                  </div>
                  <p className="text-[10px] text-text-muted mt-1.5">10:33 AM</p>
                </div>
              </div>
            </div>

            {/* Bottom copy button */}
            <div className="chat-copy-btn px-6 pb-5">
              <div className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] cursor-pointer hover:bg-white/[0.06] transition-colors">
                <svg className="w-4 h-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9.75a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                </svg>
                <span className="text-sm text-text-muted font-medium">{t('pages.ai.chat_copy')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy callout */}
      <section className="pb-24 md:pb-32 px-6">
        <div className="privacy-card mx-auto max-w-3xl section-surface rounded-3xl p-10 md:p-14 text-center relative overflow-hidden">
          {/* Shield icon */}
          <div className="mx-auto w-14 h-14 rounded-2xl bg-lime/10 flex items-center justify-center mb-6">
            <svg className="w-7 h-7 text-lime" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
            </svg>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-4">{t('pages.ai.privacy_title')}</h3>
          <p className="text-text-secondary text-lg leading-relaxed max-w-xl mx-auto">{t('pages.ai.privacy_desc')}</p>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 md:pb-40 px-6">
        <div className="mx-auto max-w-4xl section-surface rounded-3xl p-12 md:p-20 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-5">{t('feature_pages.cta_title')}</h2>
          <p className="text-text-secondary text-lg mb-10">{t('feature_pages.cta_desc')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#" className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-lime text-bg-primary font-semibold hover:-translate-y-0.5 transition-all duration-200">
              {t('feature_pages.cta_button')}
            </a>
            <Link to="/" className="inline-flex items-center justify-center px-10 py-4 rounded-full border border-white/10 text-white font-medium hover:border-white/25 transition-all duration-200">
              {t('feature_pages.back_home')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
