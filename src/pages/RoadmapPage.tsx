import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Group { title: string; items: string[] }
interface Phase { id: string; phase: string; status: string; title: string; desc: string; groups: Group[] }
interface Role { feature: string; freelancer: string; client: string }

const statusConfig: Record<string, { color: string; bg: string; ring: string; icon: JSX.Element }> = {
  active: {
    color: 'text-lime', bg: 'bg-lime/10', ring: 'ring-lime/30',
    icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>,
  },
  planned: {
    color: 'text-accent', bg: 'bg-accent/10', ring: 'ring-accent/30',
    icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  },
  future: {
    color: 'text-text-muted', bg: 'bg-white/[0.04]', ring: 'ring-white/10',
    icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>,
  },
};

function CellValue({ value }: { value: string }) {
  if (value === 'Si' || value === 'Yes') return <span className="text-lime font-medium">{value}</span>;
  if (value === 'No') return <span className="text-text-muted">{value}</span>;
  return <span className="text-text-secondary">{value}</span>;
}

export default function RoadmapPage() {
  const { t } = useTranslation();
  const phases = t('roadmap.phases', { returnObjects: true }) as Phase[];
  const roles = t('roadmap.roles', { returnObjects: true }) as Role[];
  const rolesHeaders = t('roadmap.roles_headers', { returnObjects: true }) as string[];
  const [activePhase, setActivePhase] = useState(phases[0]?.id || 'today');
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  const currentPhase = phases.find((p) => p.id === activePhase) || phases[0];
  const config = statusConfig[currentPhase.status] || statusConfig.future;

  const toggleGroup = (key: string) => {
    setExpandedGroups((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div>
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border-card text-xs text-text-secondary mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-lime" />
            {t('roadmap.badge')}
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6 whitespace-pre-line">
            {t('roadmap.title')}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {t('roadmap.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Phase tabs */}
      <section className="px-6 pb-6">
        <div className="mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-2 justify-center">
            {phases.map((phase) => {
              const pc = statusConfig[phase.status] || statusConfig.future;
              const isActive = phase.id === activePhase;
              return (
                <button key={phase.id} onClick={() => setActivePhase(phase.id)}
                  className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? `${pc.bg} ${pc.color} ring-1 ${pc.ring}`
                      : 'text-text-muted hover:text-white hover:bg-white/[0.04]'
                  }`}>
                  <span className="flex items-center gap-2">
                    {isActive && <span className={`w-1.5 h-1.5 rounded-full ${phase.status === 'active' ? 'bg-lime' : phase.status === 'planned' ? 'bg-accent' : 'bg-text-muted'}`} />}
                    {phase.phase}
                  </span>
                </button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Active phase content */}
      <section className="px-6 pb-24 md:pb-32">
        <div className="mx-auto max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePhase}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >
              {/* Phase header */}
              <div className="text-center mb-12">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 ${config.bg} ${config.color}`}>
                  {config.icon}
                  {currentPhase.status === 'active' ? 'Live' : currentPhase.status === 'planned' ? 'In progress' : 'Planned'}
                </div>
                <h2 className="text-3xl md:text-5xl font-bold mb-3">{currentPhase.title}</h2>
                <p className="text-text-secondary text-lg">{currentPhase.desc}</p>
              </div>

              {/* Groups — expandable */}
              <div className="space-y-4">
                {currentPhase.groups.map((group, gi) => {
                  const groupKey = `${activePhase}-${gi}`;
                  const isExpanded = expandedGroups[groupKey] !== false; // default open
                  return (
                    <div key={groupKey} className={`section-surface rounded-2xl overflow-hidden transition-all duration-200 ${
                      currentPhase.status === 'active' && gi === 0 ? 'ring-1 ring-lime/15' : ''
                    }`}>
                      <button onClick={() => toggleGroup(groupKey)}
                        className="w-full flex items-center justify-between px-6 md:px-8 py-5 text-left hover:bg-white/[0.02] transition-colors">
                        <h3 className="text-base font-semibold">{group.title}</h3>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-text-muted">{group.items.length}</span>
                          <svg className={`w-4 h-4 text-text-muted transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </button>
                      <div className={`transition-all duration-300 ${isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                        <ul className="px-6 md:px-8 pb-6 space-y-3">
                          {group.items.map((item, ii) => (
                            <li key={ii} className="flex items-start gap-3 text-sm text-text-secondary">
                              <span className={`mt-1 shrink-0 ${config.color}`}>
                                {currentPhase.status === 'active' ? config.icon : (
                                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                )}
                              </span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Progress bar */}
      <section className="px-6 pb-24 md:pb-32">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-1">
            {phases.map((phase, i) => {
              const pc = statusConfig[phase.status] || statusConfig.future;
              return (
                <button key={phase.id} onClick={() => setActivePhase(phase.id)}
                  className="group flex-1 relative">
                  <div className={`h-2 rounded-full transition-all duration-300 ${
                    phase.status === 'active' ? 'bg-lime' :
                    phase.status === 'planned' ? 'bg-accent/40' :
                    'bg-white/[0.08]'
                  } ${phase.id === activePhase ? 'ring-2 ring-offset-2 ring-offset-bg-primary ' + pc.ring : ''}`} />
                  <span className={`absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-medium whitespace-nowrap ${
                    phase.id === activePhase ? pc.color : 'text-text-muted'
                  }`}>
                    {phase.phase}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Roles comparison table */}
      <section className="px-6 pb-24 md:pb-32 pt-8">
        <div className="mx-auto max-w-3xl">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold text-center mb-6">{t('roadmap.roles_title')}</motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-text-secondary text-center mb-12 max-w-lg mx-auto text-sm">{t('roadmap.roles_note')}</motion.p>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            className="section-surface rounded-3xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  {rolesHeaders.map((h, i) => (
                    <th key={h} className={`px-6 py-4 text-xs font-semibold uppercase tracking-wider ${
                      i === 0 ? 'text-left text-text-muted' : 'text-center text-white'
                    }`}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {roles.map((role) => (
                  <tr key={role.feature} className="border-t border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-3.5 text-sm text-text-secondary">{role.feature}</td>
                    <td className="px-6 py-3.5 text-sm text-center"><CellValue value={role.freelancer} /></td>
                    <td className="px-6 py-3.5 text-sm text-center"><CellValue value={role.client} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* Suggest */}
      <section className="px-6 pb-24 md:pb-40">
        <div className="mx-auto max-w-3xl section-surface rounded-3xl p-12 md:p-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('roadmap.suggest_title')}</h2>
          <p className="text-text-secondary mb-8">{t('roadmap.suggest_desc')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-accent text-white font-semibold text-sm hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/20 transition-all duration-200">
              {t('contact.form_submit')}
            </Link>
            <Link to="/beta" className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-white/10 text-white font-medium text-sm hover:border-white/25 hover:-translate-y-0.5 transition-all duration-200">
              {t('pages.beta.cta_button')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
