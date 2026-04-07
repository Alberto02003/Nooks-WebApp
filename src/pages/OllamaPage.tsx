import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Step { title: string; desc: string; detail: string }
interface Model { name: string; size: string; use: string; recommended: boolean }
interface Requirement { label: string; value: string }
interface Service { name: string; port: string; desc: string }
interface Endpoint { method: string; path: string; desc: string }

export default function OllamaPage() {
  const { t } = useTranslation();

  const whyCards = t('pages.ollama.why_cards', { returnObjects: true }) as { title: string; desc: string }[];
  const steps = t('pages.ollama.steps', { returnObjects: true }) as Step[];
  const models = t('pages.ollama.models', { returnObjects: true }) as Model[];
  const requirements = t('pages.ollama.requirements', { returnObjects: true }) as Requirement[];
  const services = t('pages.ollama.services', { returnObjects: true }) as Service[];
  const endpoints = t('pages.ollama.endpoints', { returnObjects: true }) as Endpoint[];

  const whyIcons = [
    <svg className="w-6 h-6 text-lime" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>,
    <svg className="w-6 h-6 text-lime" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" /></svg>,
    <svg className="w-6 h-6 text-lime" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" /></svg>,
    <svg className="w-6 h-6 text-lime" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>,
  ];

  return (
    <div>
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/5 text-xs text-accent font-medium mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            {t('pages.ollama.badge')}
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6">
            {t('pages.ollama.title_line1')}<br />
            <span className="text-accent">{t('pages.ollama.title_line2')}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {t('pages.ollama.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* What is Ollama */}
      <section className="px-6 pb-24 md:pb-32">
        <div className="mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="section-surface rounded-3xl p-10 md:p-16">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0">
                <svg className="w-7 h-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('pages.ollama.what_title')}</h2>
                <p className="text-text-secondary text-lg leading-relaxed">{t('pages.ollama.what_desc')}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Ollama — 4 cards */}
      <section className="px-6 pb-24 md:pb-32">
        <div className="mx-auto max-w-5xl">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold text-center mb-16">
            {t('pages.ollama.why_title')}
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {whyCards.map((card, i) => (
              <motion.div key={card.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }} className="section-surface rounded-3xl p-8">
                <div className="w-12 h-12 rounded-2xl bg-lime/10 flex items-center justify-center mb-5">{whyIcons[i]}</div>
                <h3 className="text-xl font-semibold mb-3">{card.title}</h3>
                <p className="text-text-secondary leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Docker Services architecture */}
      <section className="px-6 pb-24 md:pb-32">
        <div className="mx-auto max-w-4xl">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold text-center mb-6">
            {t('pages.ollama.services_title')}
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-text-secondary text-center mb-12 max-w-lg mx-auto">
            docker compose up -d
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            className="section-surface rounded-3xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px]">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="text-left text-xs font-semibold text-text-muted uppercase tracking-wider px-6 py-4">Servicio</th>
                    <th className="text-left text-xs font-semibold text-text-muted uppercase tracking-wider px-6 py-4">Puerto</th>
                    <th className="text-left text-xs font-semibold text-text-muted uppercase tracking-wider px-6 py-4">Funcion</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((svc) => (
                    <tr key={svc.name} className="border-t border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4">
                        <code className="text-sm text-accent font-mono">{svc.name}</code>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-text-secondary font-mono">{svc.port}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-text-secondary">{svc.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Flow diagram */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 px-6 py-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center">
            <code className="text-sm text-text-secondary">
              <span className="text-white">Landing</span>
              <span className="text-text-muted"> → </span>
              <span className="text-accent">:5000/generate</span>
              <span className="text-text-muted"> → </span>
              <span className="text-lime">ollama:11434/api/generate</span>
            </code>
          </motion.div>
        </div>
      </section>

      {/* Setup Steps */}
      <section className="px-6 pb-24 md:pb-32">
        <div className="mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{t('pages.ollama.how_title')}</h2>
            <p className="text-text-secondary text-lg max-w-xl mx-auto">{t('pages.ollama.how_subtitle')}</p>
          </motion.div>
          <div className="relative">
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-accent/20" />
            <div className="flex flex-col gap-10">
              {steps.map((step, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }} className="relative pl-16 md:pl-20">
                  <div className="absolute left-2 md:left-4 top-0 w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white text-sm font-bold">
                    {i + 1}
                  </div>
                  <div className="section-surface rounded-2xl p-6 md:p-8">
                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                    <p className="text-text-secondary mb-4">{step.desc}</p>
                    <div className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                      <code className="text-sm text-accent font-mono break-all">{step.detail}</code>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Backend AI Endpoints */}
      <section className="px-6 pb-24 md:pb-32">
        <div className="mx-auto max-w-4xl">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold text-center mb-16">
            {t('pages.ollama.endpoints_title')}
          </motion.h2>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            className="section-surface rounded-3xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px]">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="text-left text-xs font-semibold text-text-muted uppercase tracking-wider px-6 py-4">Method</th>
                    <th className="text-left text-xs font-semibold text-text-muted uppercase tracking-wider px-6 py-4">Endpoint</th>
                    <th className="text-left text-xs font-semibold text-text-muted uppercase tracking-wider px-6 py-4">Descripcion</th>
                  </tr>
                </thead>
                <tbody>
                  {endpoints.map((ep) => (
                    <tr key={ep.path} className="border-t border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-3.5">
                        <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${
                          ep.method === 'POST' ? 'bg-lime/10 text-lime' : 'bg-accent/10 text-accent'
                        }`}>
                          {ep.method}
                        </span>
                      </td>
                      <td className="px-6 py-3.5">
                        <code className="text-sm text-white font-mono">{ep.path}</code>
                      </td>
                      <td className="px-6 py-3.5 text-sm text-text-secondary">{ep.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Models + Requirements */}
      <section className="px-6 pb-24 md:pb-32">
        <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="md:col-span-2 section-surface rounded-3xl p-8 md:p-10">
            <h3 className="text-xl font-semibold mb-2">{t('pages.ollama.models_title')}</h3>
            <p className="text-text-muted text-sm mb-8">{t('pages.ollama.models_subtitle')}</p>
            <div className="space-y-4">
              {models.map((model) => (
                <div key={model.name}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 rounded-2xl ${
                    model.recommended ? 'bg-accent/[0.08] ring-1 ring-accent/20' : 'bg-white/[0.02]'
                  }`}>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-white">{model.name}</span>
                      {model.recommended && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-accent/15 text-accent">Default</span>
                      )}
                    </div>
                    <p className="text-xs text-text-muted">{model.use}</p>
                  </div>
                  <span className="text-xs text-text-secondary font-mono bg-white/[0.04] px-3 py-1.5 rounded-lg shrink-0">{model.size}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }} className="section-surface rounded-3xl p-8 md:p-10">
            <h3 className="text-xl font-semibold mb-6">{t('pages.ollama.requirements_title')}</h3>
            <div className="space-y-5">
              {requirements.map((req) => (
                <div key={req.label}>
                  <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">{req.label}</span>
                  <p className="text-sm text-text-secondary mt-1">{req.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cloud fallback + Repo */}
      <section className="px-6 pb-24 md:pb-32">
        <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="section-surface rounded-3xl p-8 md:p-10">
            <div className="w-12 h-12 rounded-2xl bg-white/[0.06] flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">{t('pages.ollama.cloud_title')}</h3>
            <p className="text-text-secondary leading-relaxed mb-4">{t('pages.ollama.cloud_desc')}</p>
            <div className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <p className="text-xs text-text-muted font-mono">{t('pages.ollama.cloud_note')}</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }} className="section-surface rounded-3xl p-8 md:p-10 flex flex-col">
            <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">{t('pages.ollama.repo_title')}</h3>
            <p className="text-text-secondary leading-relaxed flex-1 mb-6">{t('pages.ollama.repo_desc')}</p>
            <Link to="/beta"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-full border border-accent/30 text-accent text-sm font-semibold hover:bg-accent/5 hover:-translate-y-0.5 transition-all duration-200">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" /></svg>
              {t('pages.ollama.repo_button')}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24 md:pb-40">
        <div className="mx-auto max-w-4xl section-surface rounded-3xl p-12 md:p-20 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-5">{t('pages.ollama.cta_title')}</h2>
          <p className="text-text-secondary text-lg mb-10 max-w-lg mx-auto">{t('pages.ollama.cta_subtitle')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/beta" className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-lime text-bg-primary font-semibold hover:-translate-y-0.5 hover:shadow-lg hover:shadow-lime/20 transition-all duration-200">
              {t('pages.beta.cta_button')}
            </Link>
            <Link to="/features/ai" className="inline-flex items-center justify-center px-10 py-4 rounded-full border border-white/10 text-white font-medium hover:border-white/25 hover:-translate-y-0.5 transition-all duration-200">
              {t('nav.ai')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
