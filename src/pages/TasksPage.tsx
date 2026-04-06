import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap';

interface MockTask {
  title: string;
  priority: 'high' | 'medium' | 'low';
  due: string;
  project: string;
  time: string;
  completed: boolean;
}

const priorityConfig = {
  high: { color: '#FF6B6B', label: 'Alta', bg: 'rgba(255,107,107,0.12)' },
  medium: { color: '#FFA500', label: 'Media', bg: 'rgba(255,165,0,0.12)' },
  low: { color: '#5E8BFF', label: 'Baja', bg: 'rgba(94,139,255,0.12)' },
};

const featureColors = ['#5E8BFF', '#C9FD4D', '#FF8C42', '#A78BFA'];

export default function TasksPage() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const filters = t('pages.tasks.filters', { returnObjects: true }) as string[];
  const mockTasks = t('pages.tasks.mock_tasks', { returnObjects: true }) as MockTask[];
  const detailFields = t('pages.tasks.detail_fields', { returnObjects: true }) as string[];
  const featureCards = t('pages.tasks.feature_cards', { returnObjects: true }) as { title: string; desc: string }[];

  const pendingTasks = mockTasks.filter((t) => !t.completed);
  const completedTasks = mockTasks.filter((t) => t.completed);

  useGSAP(() => {
    // Task list app mockup — pinned, tasks appear one by one
    ScrollTrigger.matchMedia({
      '(min-width: 768px)': () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: '.tasklist-section',
            pin: true,
            anticipatePin: 1,
            start: 'top top',
            end: '+=250%',
            scrub: 1,
          },
        });

        // Filter bar slides in
        tl.fromTo('.filter-bar', { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3 });

        // Each task card appears with stagger
        pendingTasks.forEach((_, i) => {
          tl.fromTo(`.task-row-${i}`, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.25 }, `-=0.1`);
        });

        // Separator fades in
        tl.fromTo('.completed-divider', { scaleX: 0, transformOrigin: 'left' }, { scaleX: 1, duration: 0.2 }, '+=0.05');

        // Completed tasks fade in dimmed
        completedTasks.forEach((_, i) => {
          tl.fromTo(`.task-done-${i}`, { x: -30, opacity: 0 }, { x: 0, opacity: 0.5, duration: 0.2 }, '-=0.05');
        });

        // Timer pulse on first task
        tl.fromTo('.timer-active', { scale: 1 }, { scale: 1.15, duration: 0.15, yoyo: true, repeat: 1 });
      },
      '(max-width: 767px)': () => {
        gsap.fromTo('.task-row', { y: 20, opacity: 0 }, {
          y: 0, opacity: 1, stagger: 0.08,
          scrollTrigger: { trigger: '.tasklist-section', start: 'top 80%', end: 'bottom 50%', scrub: 1 },
        });
      },
    });

    // Detail card — scale up
    gsap.fromTo('.detail-mockup', { scale: 0.85, opacity: 0 }, {
      scale: 1, opacity: 1,
      scrollTrigger: { trigger: '.detail-section', start: 'top 75%', end: 'top 30%', scrub: 1 },
    });

    // Detail fields stagger in
    gsap.fromTo('.detail-field', { x: 30, opacity: 0 }, {
      x: 0, opacity: 1, stagger: 0.1,
      scrollTrigger: { trigger: '.detail-section', start: 'top 60%', end: 'top 20%', scrub: 1 },
    });

    // Feature cards from alternating sides
    document.querySelectorAll('.feat-card').forEach((card, i) => {
      const fromLeft = i % 2 === 0;
      gsap.fromTo(card, { x: fromLeft ? -60 : 60, opacity: 0 }, {
        x: 0, opacity: 1,
        scrollTrigger: { trigger: card, start: 'top 85%', end: 'top 50%', scrub: 1 },
      });
    });

    // Connected section
    gsap.fromTo('.connected-card', { y: 40, opacity: 0 }, {
      y: 0, opacity: 1,
      scrollTrigger: { trigger: '.connected-card', start: 'top 85%', end: 'top 55%', scrub: 1 },
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
            {t('pages.tasks.badge')}
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6">
            {t('pages.tasks.title')}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            {t('pages.tasks.subtitle')}
          </motion.p>
          {/* Priority legend */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="flex gap-5 justify-center mt-10">
            {(['high', 'medium', 'low'] as const).map((p) => (
              <div key={p} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: priorityConfig[p].color }} />
                <span className="text-xs text-text-muted font-medium">{priorityConfig[p].label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Task list app mockup — pinned on desktop */}
      <section className="tasklist-section min-h-screen flex items-center justify-center px-6 py-20">
        <div className="mx-auto max-w-2xl w-full">
          <div className="section-surface rounded-3xl overflow-hidden">
            {/* App header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-accent/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </div>
                <h3 className="text-base font-semibold">My Tasks</h3>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-white/[0.04] flex items-center justify-center">
                  <svg className="w-4 h-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Filter chips */}
            <div className="filter-bar flex gap-2 px-6 pb-4 overflow-x-auto">
              {filters.map((f, i) => (
                <span key={f} className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap shrink-0 ${
                  i === 0
                    ? 'bg-accent/15 text-accent border border-accent/30'
                    : 'bg-white/[0.04] text-text-muted border border-transparent'
                }`}>{f}</span>
              ))}
            </div>

            {/* Pending tasks */}
            <div className="px-4 pb-2">
              {pendingTasks.map((task, i) => (
                <div key={task.title} className={`task-row task-row-${i} flex items-center gap-3 px-3 py-3.5 rounded-xl hover:bg-white/[0.02] transition-colors group`}>
                  {/* Checkbox */}
                  <div className="w-5 h-5 rounded-md border-2 shrink-0 flex items-center justify-center"
                    style={{ borderColor: `${priorityConfig[task.priority].color}60` }} />

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{task.title}</p>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      {task.due && (
                        <span className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md ${
                          task.due === 'Today' || task.due === 'Hoy'
                            ? 'bg-[#FF6B6B20] text-[#FF6B6B]'
                            : 'bg-white/[0.04] text-text-muted'
                        }`}>
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                          </svg>
                          {task.due}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md"
                        style={{ background: priorityConfig[task.priority].bg, color: priorityConfig[task.priority].color }}>
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5" />
                        </svg>
                        {priorityConfig[task.priority].label}
                      </span>
                      {task.project && (
                        <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md bg-white/[0.04] text-text-muted">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                          </svg>
                          {task.project}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Timer */}
                  <div className="shrink-0 flex items-center gap-2">
                    {task.time && (
                      <span className="text-[11px] text-text-muted font-mono">{task.time}</span>
                    )}
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                      i === 0 ? 'timer-active bg-lime/15' : 'bg-white/[0.04]'
                    }`}>
                      {i === 0 ? (
                        <svg className="w-3.5 h-3.5 text-lime" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z" />
                        </svg>
                      ) : (
                        <svg className="w-3.5 h-3.5 text-text-muted" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Completed divider */}
            <div className="completed-divider mx-6 my-2 flex items-center gap-3">
              <div className="h-px flex-1 bg-white/[0.06]" />
              <span className="text-[10px] text-text-muted uppercase tracking-widest">Completed</span>
              <div className="h-px flex-1 bg-white/[0.06]" />
            </div>

            {/* Completed tasks */}
            <div className="px-4 pb-5">
              {completedTasks.map((task, i) => (
                <div key={task.title} className={`task-row task-done-${i} flex items-center gap-3 px-3 py-3 rounded-xl`}>
                  <div className="w-5 h-5 rounded-md border-2 border-lime/40 bg-lime/10 shrink-0 flex items-center justify-center">
                    <svg className="w-3 h-3 text-lime" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-text-muted line-through truncate">{task.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {task.project && (
                        <span className="text-[11px] text-text-muted/60">{task.project}</span>
                      )}
                      {task.time && (
                        <span className="text-[11px] text-text-muted/60 font-mono">{task.time}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Task detail + timer split */}
      <section className="detail-section py-24 md:py-40 px-6">
        <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Detail mockup card */}
          <div className="detail-mockup section-surface rounded-3xl overflow-hidden">
            {/* Detail header */}
            <div className="px-6 pt-6 pb-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full border-2 border-[#FF6B6B]/50 bg-[#FF6B6B]/10 flex items-center justify-center" />
                <h4 className="text-base font-semibold flex-1">{pendingTasks[0]?.title}</h4>
                <div className="w-7 h-7 rounded-lg bg-white/[0.04] flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Detail body */}
            <div className="px-6 py-5 space-y-4">
              {/* Priority chip */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-text-muted w-20">Priority</span>
                <span className="px-3 py-1 rounded-lg text-xs font-medium" style={{
                  background: priorityConfig.high.bg, color: priorityConfig.high.color
                }}>High</span>
              </div>
              {/* Due date */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-text-muted w-20">Due</span>
                <span className="px-3 py-1 rounded-lg text-xs font-medium bg-[#FF6B6B20] text-[#FF6B6B]">
                  Today
                </span>
              </div>
              {/* Project */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-text-muted w-20">Project</span>
                <span className="px-3 py-1 rounded-lg text-xs font-medium bg-white/[0.04] text-text-secondary">Acme Corp</span>
              </div>
              {/* Events */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-text-muted w-20">Events</span>
                <span className="px-3 py-1 rounded-lg text-xs font-medium bg-accent/10 text-accent">2 events</span>
              </div>
              {/* Time tracked */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-text-muted w-20">Time</span>
                <span className="px-3 py-1 rounded-lg text-xs font-medium bg-lime/10 text-lime font-mono">1h 25m</span>
              </div>
              {/* Visibility */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-text-muted w-20">Visibility</span>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-accent/10">
                  <svg className="w-3 h-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                  <span className="text-xs text-accent font-medium">Visible</span>
                </div>
              </div>

              {/* Timer button */}
              <div className="pt-2">
                <div className="flex items-center justify-center gap-2 py-3 rounded-xl bg-lime/10 border border-lime/20">
                  <svg className="w-4 h-4 text-lime" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z" />
                  </svg>
                  <span className="text-sm text-lime font-medium">Stop timer — 1:25:33</span>
                </div>
              </div>

              <p className="text-[11px] text-text-muted pt-1">Created Apr 2, 2026</p>
            </div>
          </div>

          {/* Right: description text + field list */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">{t('pages.tasks.detail_title')}</h3>
            <p className="text-text-secondary leading-relaxed mb-8">{t('pages.tasks.detail_desc')}</p>
            <div className="space-y-3">
              {detailFields.map((field, i) => (
                <div key={field} className="detail-field flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold"
                    style={{ background: `${featureColors[i % featureColors.length]}15`, color: featureColors[i % featureColors.length] }}>
                    {i + 1}
                  </div>
                  <span className="text-sm text-text-secondary">{field}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Feature cards — 2x2 grid, alternating entrance */}
      <section className="py-24 md:py-32 px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">{t('pages.tasks.features_title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featureCards.map((card, i) => (
              <div key={card.title} className="feat-card section-surface rounded-3xl p-8">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: `${featureColors[i]}15` }}>
                  {i === 0 && <svg className="w-5 h-5" style={{ color: featureColors[i] }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" /></svg>}
                  {i === 1 && <svg className="w-5 h-5" style={{ color: featureColors[i] }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5-4.5L16.5 21m0 0L12 16.5m4.5 4.5V7.5" /></svg>}
                  {i === 2 && <svg className="w-5 h-5" style={{ color: featureColors[i] }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m9.86-2.556a4.5 4.5 0 0 0-1.242-7.244l-4.5-4.5a4.5 4.5 0 0 0-6.364 6.364L5.882 9.182" /></svg>}
                  {i === 3 && <svg className="w-5 h-5" style={{ color: featureColors[i] }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>}
                </div>
                <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Connected */}
      <section className="pb-24 md:pb-32 px-6">
        <div className="connected-card mx-auto max-w-3xl section-surface rounded-3xl p-10 md:p-14 text-center">
          <div className="flex justify-center gap-3 mb-6">
            {['#5E8BFF', '#C9FD4D', '#FF8C42'].map((c) => (
              <div key={c} className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: `${c}15` }}>
                <div className="w-3 h-3 rounded-full" style={{ background: c }} />
              </div>
            ))}
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-4">{t('pages.tasks.connected_title')}</h3>
          <p className="text-text-secondary text-lg leading-relaxed max-w-xl mx-auto">{t('pages.tasks.connected_desc')}</p>
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
