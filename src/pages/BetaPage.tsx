import { useRef, useState } from 'react';
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
  const formRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', role: '', message: '' });

  const sections = t('pages.beta.sections', { returnObjects: true }) as { title: string; items: StatusItem[] }[];
  const roadmap = t('pages.beta.roadmap', { returnObjects: true }) as { phase: string; title: string; items: string[] }[];
  const roles = t('pages.beta.form_roles', { returnObjects: true }) as string[];

  useGSAP(() => {
    gsap.fromTo('.status-card', { scale: 0.85, opacity: 0 }, {
      scale: 1, opacity: 1, stagger: 0.08,
      scrollTrigger: { trigger: '.status-grid', start: 'top 80%', end: 'top 30%', scrub: 1 },
    });

    gsap.fromTo('.roadmap-line', { scaleY: 0, transformOrigin: 'top' }, {
      scaleY: 1,
      scrollTrigger: { trigger: '.roadmap-section', start: 'top 65%', end: 'bottom 40%', scrub: 1 },
    });

    gsap.fromTo('.roadmap-item', { x: -30, opacity: 0 }, {
      x: 0, opacity: 1, stagger: 0.15,
      scrollTrigger: { trigger: '.roadmap-section', start: 'top 60%', end: 'bottom 50%', scrub: 1 },
    });
  }, { scope: containerRef });

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to your backend API to store the beta signup
    console.log('Beta signup:', formData);
    setSubmitted(true);
  };

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
            className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed mb-10">
            {t('pages.beta.subtitle')}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
            <button
              onClick={scrollToForm}
              className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-lime text-bg-primary font-semibold hover:-translate-y-0.5 hover:shadow-lg hover:shadow-lime/20 transition-all duration-200"
            >
              {t('pages.beta.cta_button')}
            </button>
          </motion.div>
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

      {/* Beta signup form */}
      <section ref={formRef} id="beta-form" className="pb-24 md:pb-40 px-6">
        <div className="mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{t('pages.beta.form_title')}</h2>
            <p className="text-text-secondary text-lg max-w-md mx-auto">{t('pages.beta.form_subtitle')}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="section-surface rounded-3xl p-8 md:p-12"
          >
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-lime/10 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-lime" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">{t('pages.beta.form_success_title')}</h3>
                <p className="text-text-secondary">{t('pages.beta.form_success_desc')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="beta-name" className="block text-sm font-medium text-text-secondary mb-2">
                    {t('pages.beta.form_name')} *
                  </label>
                  <input
                    id="beta-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t('pages.beta.form_name_placeholder')}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-text-muted text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all duration-200"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="beta-email" className="block text-sm font-medium text-text-secondary mb-2">
                    {t('pages.beta.form_email')} *
                  </label>
                  <input
                    id="beta-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t('pages.beta.form_email_placeholder')}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-text-muted text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all duration-200"
                  />
                </div>

                {/* Role */}
                <div>
                  <label htmlFor="beta-role" className="block text-sm font-medium text-text-secondary mb-2">
                    {t('pages.beta.form_role')} *
                  </label>
                  <select
                    id="beta-role"
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all duration-200 appearance-none"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '16px' }}
                  >
                    <option value="" disabled hidden>—</option>
                    {roles.map((role) => (
                      <option key={role} value={role} className="bg-bg-card text-white">{role}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="beta-message" className="block text-sm font-medium text-text-secondary mb-2">
                    {t('pages.beta.form_message')}
                  </label>
                  <textarea
                    id="beta-message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t('pages.beta.form_message_placeholder')}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-text-muted text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all duration-200 resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-lime text-bg-primary font-semibold text-sm hover:-translate-y-0.5 hover:shadow-lg hover:shadow-lime/20 transition-all duration-200"
                >
                  {t('pages.beta.form_submit')}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
