import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap';

interface MockEvent {
  title: string;
  time: string;
  category: string;
  color: string;
}

interface Category {
  name: string;
  color: string;
}

const viewColors = ['#C9FD4D', '#5E8BFF', '#FF8C42'];
const featureIcons = [
  'M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99',
  'M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0',
  'M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418',
  'M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z',
];
const featureColors = ['#A78BFA', '#FF8C42', '#5E8BFF', '#4CAF50'];

// Hours for the day timeline
const timelineHours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];

function hourToY(hour: number, minute = 0): number {
  return ((hour - 8 + minute / 60) / (21 - 8)) * 100;
}

function parseTime(time: string): { startH: number; startM: number; endH: number; endM: number } {
  const [start, end] = time.split(' — ');
  const [sH, sM] = start.split(':').map(Number);
  const [eH, eM] = end.split(':').map(Number);
  return { startH: sH, startM: sM, endH: eH, endM: eM };
}

export default function CalendarPage() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const events = t('pages.calendar.mock_events', { returnObjects: true }) as MockEvent[];
  const categories = t('pages.calendar.categories', { returnObjects: true }) as Category[];
  const featureCards = t('pages.calendar.feature_cards', { returnObjects: true }) as { title: string; desc: string }[];

  useGSAP(() => {
    // Day timeline — pinned, events appear one by one
    ScrollTrigger.matchMedia({
      '(min-width: 768px)': () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: '.timeline-section',
            pin: true,
            anticipatePin: 1,
            start: 'top top',
            end: '+=200%',
            scrub: 1,
          },
        });

        // View tabs appear
        tl.fromTo('.view-tabs', { y: -15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.2 });

        // Hour lines fade in
        tl.fromTo('.hour-line', { opacity: 0 }, { opacity: 1, stagger: 0.02, duration: 0.3 });

        // Now indicator
        tl.fromTo('.now-indicator', { scaleX: 0, transformOrigin: 'left' }, { scaleX: 1, duration: 0.2 });

        // Events appear one by one with scale
        events.forEach((_, i) => {
          tl.fromTo(`.timeline-event-${i}`,
            { scaleY: 0, opacity: 0, transformOrigin: 'top' },
            { scaleY: 1, opacity: 1, duration: 0.25, ease: 'back.out(1.5)' },
            '-=0.08');
        });
      },
      '(max-width: 767px)': () => {
        gsap.fromTo('.timeline-event', { x: -30, opacity: 0 }, {
          x: 0, opacity: 1, stagger: 0.1,
          scrollTrigger: { trigger: '.timeline-section', start: 'top 75%', end: 'bottom 50%', scrub: 1 },
        });
      },
    });

    // Category palette — stagger pop
    gsap.fromTo('.cat-chip', { scale: 0, opacity: 0 }, {
      scale: 1, opacity: 1, stagger: 0.08, ease: 'back.out(2)',
      scrollTrigger: { trigger: '.categories-section', start: 'top 75%', end: 'top 40%', scrub: 1 },
    });

    // Google sync — split slide
    gsap.fromTo('.gcal-left', { x: -50, opacity: 0 }, {
      x: 0, opacity: 1,
      scrollTrigger: { trigger: '.gcal-section', start: 'top 75%', end: 'top 35%', scrub: 1 },
    });
    gsap.fromTo('.gcal-right', { x: 50, opacity: 0 }, {
      x: 0, opacity: 1,
      scrollTrigger: { trigger: '.gcal-section', start: 'top 75%', end: 'top 35%', scrub: 1 },
    });

    // Feature cards rise
    gsap.fromTo('.cal-feat', { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, stagger: 0.12,
      scrollTrigger: { trigger: '.cal-features-section', start: 'top 75%', end: 'top 30%', scrub: 1 },
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef}>
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border-card text-xs text-text-secondary mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-lime" />
            {t('pages.calendar.badge')}
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6 whitespace-pre-line">
            {t('pages.calendar.title')}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            {t('pages.calendar.subtitle')}
          </motion.p>
          {/* Category dots */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="flex gap-2 justify-center mt-10">
            {categories.map((cat) => (
              <span key={cat.name} className="w-3 h-3 rounded-full" style={{ background: cat.color }} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Day Timeline — pinned on desktop */}
      <section className="timeline-section min-h-screen flex items-center justify-center px-6 py-20">
        <div className="mx-auto max-w-2xl w-full">
          <div className="section-surface rounded-3xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-lime/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-lime" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-semibold">Monday, Apr 7</h3>
                  <p className="text-[11px] text-text-muted">5 events</p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-xl bg-white/[0.04] flex items-center justify-center">
                <svg className="w-4 h-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </div>
            </div>

            {/* View tabs */}
            <div className="view-tabs flex gap-2 px-6 pb-4">
              {[t('pages.calendar.view_month'), t('pages.calendar.view_week'), t('pages.calendar.view_day')].map((v, i) => (
                <span key={v} className={`px-4 py-1.5 rounded-full text-xs font-semibold ${
                  i === 2
                    ? 'text-bg-primary'
                    : 'bg-white/[0.04] text-text-muted'
                }`} style={i === 2 ? { background: viewColors[0] } : undefined}>{v}</span>
              ))}
            </div>

            {/* Timeline body */}
            <div className="relative px-6 pb-6" style={{ height: '420px' }}>
              {/* Hour grid lines */}
              {timelineHours.map((h) => {
                const top = hourToY(h);
                return (
                  <div key={h} className="hour-line absolute left-0 right-0 flex items-center" style={{ top: `${top}%` }}>
                    <span className="text-[10px] text-text-muted w-12 text-right pr-3 font-mono">{h}:00</span>
                    <div className="flex-1 h-px bg-white/[0.04]" />
                  </div>
                );
              })}

              {/* Now indicator at 10:30 */}
              <div className="now-indicator absolute left-12 right-0 flex items-center z-10" style={{ top: `${hourToY(10, 30)}%` }}>
                <div className="w-2 h-2 rounded-full bg-[#FF6B6B]" />
                <div className="flex-1 h-[2px] bg-[#FF6B6B]/60" />
              </div>

              {/* Event blocks */}
              {events.map((evt, i) => {
                const { startH, startM, endH, endM } = parseTime(evt.time);
                const top = hourToY(startH, startM);
                const height = hourToY(endH, endM) - top;
                return (
                  <div key={evt.title}
                    className={`timeline-event timeline-event-${i} absolute left-14 right-4 rounded-xl border-l-[3px] px-3 py-2 cursor-pointer`}
                    style={{
                      top: `${top}%`,
                      height: `${height}%`,
                      borderColor: evt.color,
                      background: `${evt.color}12`,
                    }}>
                    <p className="text-xs font-semibold truncate" style={{ color: evt.color }}>{evt.title}</p>
                    <p className="text-[10px] text-text-muted">{evt.time}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Category palette */}
      <section className="categories-section py-24 md:py-32 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-16">{t('pages.calendar.categories_title')}</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((cat) => (
              <div key={cat.name} className="cat-chip flex items-center gap-3 px-6 py-3.5 rounded-2xl section-surface">
                <div className="w-4 h-4 rounded-full" style={{ background: cat.color }} />
                <span className="text-sm font-medium">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Google Calendar Sync — split */}
      <section className="gcal-section py-24 md:py-40 px-6">
        <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left — mockup of synced calendars */}
          <div className="gcal-left section-surface rounded-3xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.94 10.94 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span className="text-sm font-semibold">Google Calendar</span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#4CAF5018] text-[#4CAF50] ml-auto">Synced</span>
            </div>
            {/* Calendar list */}
            <div className="space-y-2.5">
              {[
                { name: 'Work', color: '#5E8BFF', events: 12 },
                { name: 'Personal', color: '#F472B6', events: 8 },
                { name: 'Shared — Team', color: '#4CAF50', events: 5 },
                { name: 'Holidays', color: '#FF8C42', events: 3 },
              ].map((cal) => (
                <div key={cal.name} className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/[0.02]">
                  <div className="w-3 h-3 rounded-sm" style={{ background: cal.color }} />
                  <span className="text-sm flex-1">{cal.name}</span>
                  <span className="text-[11px] text-text-muted">{cal.events} events</span>
                  <div className="w-5 h-5 rounded bg-white/[0.06] flex items-center justify-center">
                    <svg className="w-3 h-3 text-lime" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — description */}
          <div className="gcal-right">
            <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.94 10.94 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">{t('pages.calendar.google_title')}</h3>
            <p className="text-text-secondary leading-relaxed text-lg">{t('pages.calendar.google_desc')}</p>
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="cal-features-section py-24 md:py-32 px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">{t('pages.calendar.features_title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featureCards.map((card, i) => (
              <div key={card.title} className="cal-feat section-surface rounded-3xl p-8">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: `${featureColors[i]}15` }}>
                  <svg className="w-5 h-5" style={{ color: featureColors[i] }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d={featureIcons[i]} />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{card.desc}</p>
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/beta" className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-lime text-bg-primary font-semibold hover:-translate-y-0.5 transition-all duration-200">
              {t('feature_pages.cta_button')}
            </Link>
            <Link to="/" className="inline-flex items-center justify-center px-10 py-4 rounded-full border border-white/10 text-white font-medium hover:border-white/25 transition-all duration-200">
              {t('feature_pages.back_home')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
