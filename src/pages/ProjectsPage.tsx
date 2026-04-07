import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap';

interface MockProject {
  name: string;
  color: string;
  status: string;
  client: string;
  tasks: number;
  notes: number;
  events: number;
  deadline: string;
  deadlineDays: number;
}

interface KanbanTask {
  title: string;
  priority: 'high' | 'medium' | 'low';
  due: string;
}

interface Template {
  name: string;
  tasks: number;
  rate: string;
}

const statusConfig: Record<string, { color: string; label: string }> = {
  active: { color: '#4CAF50', label: 'Active' },
  paused: { color: '#FFA500', label: 'Paused' },
  completed: { color: '#5E8BFF', label: 'Completed' },
  archived: { color: 'rgba(255,255,255,0.38)', label: 'Archived' },
};

const priorityConfig: Record<string, { color: string }> = {
  high: { color: '#FF6B6B' },
  medium: { color: '#FFA500' },
  low: { color: '#5E8BFF' },
};

const kanbanTabColors = ['#C9FD4D', '#FFA500', '#5E8BFF', '#4CAF50'];
const featureColors = ['#C9FD4D', '#5E8BFF', '#FF8C42', '#A78BFA'];

export default function ProjectsPage() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const projects = t('pages.projects.mock_projects', { returnObjects: true }) as MockProject[];
  const kanbanTabs = t('pages.projects.kanban_tabs', { returnObjects: true }) as string[];
  const kanbanTasks = t('pages.projects.kanban_tasks', { returnObjects: true }) as KanbanTask[];

  const templates = t('pages.projects.templates', { returnObjects: true }) as Template[];
  const statuses = t('pages.projects.statuses', { returnObjects: true }) as string[];
  const featureCards = t('pages.projects.feature_cards', { returnObjects: true }) as { title: string; desc: string }[];

  useGSAP(() => {
    // Project list — pinned, cards appear one by one
    ScrollTrigger.matchMedia({
      '(min-width: 768px)': () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: '.projectlist-section',
            pin: true,
            anticipatePin: 1,
            start: 'top top',
            end: '+=200%',
            scrub: 1,
          },
        });

        // Filter bar
        tl.fromTo('.proj-filter-bar', { y: -15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.25 });

        // Project cards stagger
        projects.forEach((_, i) => {
          tl.fromTo(`.proj-card-${i}`, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3 }, '-=0.1');
        });

        // Progress bars animate width
        tl.fromTo('.progress-fill', { scaleX: 0, transformOrigin: 'left' }, { scaleX: 1, duration: 0.4, stagger: 0.08 }, '-=0.2');
      },
      '(max-width: 767px)': () => {
        gsap.fromTo('.proj-card', { y: 20, opacity: 0 }, {
          y: 0, opacity: 1, stagger: 0.1,
          scrollTrigger: { trigger: '.projectlist-section', start: 'top 80%', end: 'bottom 50%', scrub: 1 },
        });
      },
    });

    // Kanban board — scale up
    gsap.fromTo('.kanban-mockup', { scale: 0.85, opacity: 0 }, {
      scale: 1, opacity: 1,
      scrollTrigger: { trigger: '.kanban-section', start: 'top 75%', end: 'top 30%', scrub: 1 },
    });

    // Kanban cards stagger
    gsap.fromTo('.kanban-item', { y: 15, opacity: 0 }, {
      y: 0, opacity: 1, stagger: 0.06,
      scrollTrigger: { trigger: '.kanban-section', start: 'top 55%', end: 'top 15%', scrub: 1 },
    });

    // Client + billing split
    gsap.fromTo('.split-left', { x: -50, opacity: 0 }, {
      x: 0, opacity: 1,
      scrollTrigger: { trigger: '.split-section', start: 'top 75%', end: 'top 35%', scrub: 1 },
    });
    gsap.fromTo('.split-right', { x: 50, opacity: 0 }, {
      x: 0, opacity: 1,
      scrollTrigger: { trigger: '.split-section', start: 'top 75%', end: 'top 35%', scrub: 1 },
    });

    // Templates — stagger scale
    gsap.fromTo('.template-card', { scale: 0.8, opacity: 0 }, {
      scale: 1, opacity: 1, stagger: 0.08,
      scrollTrigger: { trigger: '.templates-section', start: 'top 75%', end: 'top 30%', scrub: 1 },
    });

    // Share card
    gsap.fromTo('.share-mockup', { y: 40, opacity: 0 }, {
      y: 0, opacity: 1,
      scrollTrigger: { trigger: '.share-mockup', start: 'top 85%', end: 'top 50%', scrub: 1 },
    });

    // Feature cards alternating
    document.querySelectorAll('.feat-card').forEach((card, i) => {
      gsap.fromTo(card, { x: i % 2 === 0 ? -50 : 50, opacity: 0 }, {
        x: 0, opacity: 1,
        scrollTrigger: { trigger: card, start: 'top 85%', end: 'top 50%', scrub: 1 },
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
            {t('pages.projects.badge')}
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6 whitespace-pre-line">
            {t('pages.projects.title')}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            {t('pages.projects.subtitle')}
          </motion.p>
          {/* Status legend */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="flex gap-5 justify-center mt-10 flex-wrap">
            {statuses.map((s, i) => {
              const key = ['active', 'paused', 'completed', 'archived'][i];
              return (
                <div key={s} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: statusConfig[key].color }} />
                  <span className="text-xs text-text-muted font-medium">{s}</span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Project list mockup — pinned on desktop */}
      <section className="projectlist-section min-h-screen flex items-center justify-center px-6 py-20">
        <div className="mx-auto max-w-2xl w-full">
          <div className="section-surface rounded-3xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-accent/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                  </svg>
                </div>
                <h3 className="text-base font-semibold">My Projects</h3>
              </div>
              <div className="w-8 h-8 rounded-xl bg-white/[0.04] flex items-center justify-center">
                <svg className="w-4 h-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </div>
            </div>

            {/* Filter chips */}
            <div className="proj-filter-bar flex gap-2 px-6 pb-4">
              {statuses.map((s, i) => (
                <span key={s} className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${
                  i === 0
                    ? 'bg-accent/15 text-accent border border-accent/30'
                    : 'bg-white/[0.04] text-text-muted border border-transparent'
                }`}>{s}</span>
              ))}
            </div>

            {/* Project cards */}
            <div className="px-4 pb-5 space-y-2">
              {projects.map((proj, i) => {
                const status = statusConfig[proj.status] || statusConfig.active;
                return (
                  <div key={proj.name} className={`proj-card proj-card-${i} rounded-xl bg-white/[0.02] border-l-[3px] p-4`}
                    style={{ borderColor: proj.color }}>
                    {/* Top row: name + status */}
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: proj.color }} />
                      <span className="text-sm font-semibold flex-1 truncate">{proj.name}</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                        style={{ background: `${status.color}18`, color: status.color }}>
                        {status.label}
                      </span>
                    </div>

                    {/* Client */}
                    {proj.client && (
                      <p className="text-[11px] text-text-muted mb-2 pl-[18px]">{proj.client}</p>
                    )}

                    {/* Bottom row: counts + deadline */}
                    <div className="flex items-center gap-2 pl-[18px] flex-wrap">
                      <span className="inline-flex items-center gap-1 text-[10px] text-text-muted">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                        {proj.tasks}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] text-text-muted">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>
                        {proj.notes}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] text-text-muted">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" /></svg>
                        {proj.events}
                      </span>
                      {proj.deadline && (
                        <span className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-md ml-auto ${
                          proj.deadlineDays <= 7 ? 'bg-[#FF6B6B20] text-[#FF6B6B]' : 'bg-[#4CAF5018] text-[#4CAF50]'
                        }`}>
                          {proj.deadline}
                        </span>
                      )}
                    </div>

                    {/* Progress bar */}
                    <div className="mt-3 pl-[18px] flex gap-1 h-1.5">
                      <div className="progress-fill rounded-full" style={{ width: `${(proj.tasks / 30) * 100}%`, background: proj.color }} />
                      <div className="progress-fill rounded-full" style={{ width: `${(proj.notes / 30) * 100}%`, background: `${proj.color}60` }} />
                      <div className="progress-fill rounded-full" style={{ width: `${(proj.events / 30) * 100}%`, background: `${proj.color}30` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Kanban board mockup */}
      <section className="kanban-section py-24 md:py-40 px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">{t('pages.projects.detail_title')}</h2>
          <p className="text-text-secondary text-center mb-16 max-w-xl mx-auto">{t('pages.projects.detail_desc')}</p>

          <div className="kanban-mockup section-surface rounded-3xl overflow-hidden">
            {/* Project header bar */}
            <div className="flex items-center gap-3 px-6 py-4 border-b border-white/[0.06]">
              <div className="w-3.5 h-3.5 rounded-full" style={{ background: '#5E8BFF' }} />
              <span className="text-sm font-semibold">Website Redesign</span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#4CAF5018] text-[#4CAF50] ml-1">Active</span>
              <span className="text-[11px] text-text-muted ml-auto">Acme Corp</span>
              <div className="w-7 h-7 rounded-lg bg-white/[0.04] flex items-center justify-center ml-2">
                <svg className="w-3.5 h-3.5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
              </div>
            </div>

            {/* Kanban tab bar */}
            <div className="flex gap-2 px-6 py-3 border-b border-white/[0.06]">
              {kanbanTabs.map((tab, i) => (
                <button key={tab} className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  i === 0
                    ? 'text-bg-primary'
                    : 'bg-white/[0.04] text-text-muted'
                }`} style={i === 0 ? { background: kanbanTabColors[i] } : undefined}>
                  {tab}
                </button>
              ))}
            </div>

            {/* Kanban content — showing "To Do" column */}
            <div className="px-5 py-4 space-y-2 min-h-[280px]">
              {kanbanTasks.map((task) => (
                <div key={task.title} className="kanban-item flex items-center gap-3 px-3 py-3 rounded-xl bg-white/[0.02]">
                  <div className="w-5 h-5 rounded-md border-2 shrink-0" style={{ borderColor: `${priorityConfig[task.priority].color}50` }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{task.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {task.due && (
                        <span className={`text-[10px] px-2 py-0.5 rounded-md ${
                          task.due === 'Today' || task.due === 'Hoy' ? 'bg-[#FF6B6B20] text-[#FF6B6B]' : 'bg-white/[0.04] text-text-muted'
                        }`}>{task.due}</span>
                      )}
                      <span className="text-[10px] px-2 py-0.5 rounded-md"
                        style={{ background: `${priorityConfig[task.priority].color}15`, color: priorityConfig[task.priority].color }}>
                        {task.priority}
                      </span>
                    </div>
                  </div>
                  {/* Drag handle */}
                  <svg className="w-4 h-4 text-text-muted/40 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                  </svg>
                </div>
              ))}

              {/* Add task button */}
              <div className="kanban-item flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-white/[0.08] text-text-muted">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <span className="text-xs font-medium">Add task</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client / Billing split */}
      <section className="split-section py-24 md:py-40 px-6">
        <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Client card */}
          <div className="split-left section-surface rounded-3xl p-8 md:p-10">
            <div className="w-10 h-10 rounded-2xl bg-accent/10 flex items-center justify-center mb-5">
              <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3">{t('pages.projects.client_title')}</h3>
            <p className="text-text-secondary mb-6 leading-relaxed">{t('pages.projects.client_desc')}</p>

            {/* Client info mockup */}
            <div className="space-y-3 bg-white/[0.02] rounded-2xl p-4">
              {[
                { icon: 'M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z', value: 'Sarah Johnson' },
                { icon: 'M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75', value: 'sarah@acme.com' },
                { icon: 'M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z', value: '+1 555 012 3456' },
                { icon: 'M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21', value: 'Acme Corporation' },
              ].map(({ icon, value }) => (
                <div key={value} className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-text-muted shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d={icon} /></svg>
                  <span className="text-sm text-text-secondary">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Billing card */}
          <div className="split-right section-surface rounded-3xl p-8 md:p-10">
            <div className="w-10 h-10 rounded-2xl bg-lime/10 flex items-center justify-center mb-5">
              <svg className="w-5 h-5 text-lime" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3">{t('pages.projects.billing_title')}</h3>
            <p className="text-text-secondary mb-6 leading-relaxed">{t('pages.projects.billing_desc')}</p>

            {/* Billing mockup */}
            <div className="space-y-3 bg-white/[0.02] rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-muted">Hourly rate</span>
                <span className="text-sm font-semibold text-lime font-mono">$45.00 / hr</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-muted">Est. hours</span>
                <span className="text-sm font-medium font-mono">120 h</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-muted">Budget</span>
                <span className="text-sm font-medium font-mono">$5,400.00</span>
              </div>
              <div className="h-px bg-white/[0.06] my-1" />
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-muted">Deadline</span>
                <span className="text-xs px-2.5 py-1 rounded-md bg-[#4CAF5018] text-[#4CAF50] font-medium">Apr 28 — 22 days</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-muted">Tracked</span>
                <span className="text-sm font-medium font-mono text-accent">43h 15m</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Templates */}
      <section className="templates-section py-24 md:py-32 px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">{t('pages.projects.templates_title')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {templates.map((tpl) => (
              <div key={tpl.name} className="template-card section-surface rounded-2xl p-5 hover:bg-white/[0.04] transition-colors cursor-pointer">
                <h4 className="text-sm font-semibold mb-2">{tpl.name}</h4>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-text-muted">{tpl.tasks} tasks</span>
                  <span className="text-[11px] text-lime font-medium">{tpl.rate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Share with clients */}
      <section className="pb-24 md:pb-32 px-6">
        <div className="share-mockup mx-auto max-w-3xl section-surface rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* QR code mockup */}
            <div className="flex justify-center">
              <div className="bg-white rounded-2xl p-5 w-48 h-48 flex items-center justify-center">
                <div className="grid grid-cols-7 gap-[3px] w-full h-full">
                  {Array.from({ length: 49 }).map((_, i) => {
                    const isCorner = (i < 3 || (i > 3 && i < 7)) && (Math.floor(i / 7) < 3) ||
                      (i % 7 >= 4 && Math.floor(i / 7) < 3) ||
                      (i % 7 < 3 && Math.floor(i / 7) >= 4);
                    const filled = isCorner || Math.random() > 0.45;
                    return (
                      <div key={i} className={`rounded-[2px] ${filled ? 'bg-[#0D1117]' : 'bg-gray-200'}`} />
                    );
                  })}
                </div>
              </div>
            </div>
            {/* Description */}
            <div>
              <div className="w-10 h-10 rounded-2xl bg-accent/10 flex items-center justify-center mb-5">
                <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">{t('pages.projects.share_title')}</h3>
              <p className="text-text-secondary leading-relaxed mb-5">{t('pages.projects.share_desc')}</p>
              {/* Mock URL */}
              <div className="flex items-center gap-2 bg-white/[0.03] rounded-xl px-4 py-2.5 border border-white/[0.06]">
                <span className="text-xs text-text-muted truncate flex-1 font-mono">nooks.app/shared/a8f2k...</span>
                <div className="w-7 h-7 rounded-lg bg-accent/15 flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9.75a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature cards 2x2 */}
      <section className="py-24 md:py-32 px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">{t('pages.projects.features_title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featureCards.map((card, i) => (
              <div key={card.title} className="feat-card section-surface rounded-3xl p-8">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: `${featureColors[i]}15` }}>
                  {i === 0 && <svg className="w-5 h-5" style={{ color: featureColors[i] }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125Z" /></svg>}
                  {i === 1 && <svg className="w-5 h-5" style={{ color: featureColors[i] }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>}
                  {i === 2 && <svg className="w-5 h-5" style={{ color: featureColors[i] }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" /></svg>}
                  {i === 3 && <svg className="w-5 h-5" style={{ color: featureColors[i] }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" /></svg>}
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
