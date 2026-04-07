import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Check({ color }: { color: string }) {
  return (
    <svg className="w-5 h-5 shrink-0 mt-0.5" style={{ color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

function CellValue({ value }: { value: string }) {
  if (value === 'Si' || value === 'Yes') {
    return <Check color="#4CAF50" />;
  }
  if (value === 'No') {
    return <span className="text-text-muted">—</span>;
  }
  return <span className="text-sm text-text-secondary">{value}</span>;
}

function ArrowRight() {
  return (
    <svg className="w-5 h-5 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}

interface ComparisonRow {
  category: string;
  feature: string;
  free: string;
  free_web: string;
  pro: string;
  business: string;
}

interface Upgrade {
  from: string;
  to: string;
  price: string;
  motivation: string;
  gate: string;
  bonus: string;
}

const planKeys = ['free', 'free_web', 'pro', 'business'] as const;
const checkColors = ['#5E8BFF', '#5E8BFF', '#C9FD4D', '#C9FD4D'];
const categoryOrder = ['platform', 'projects', 'time_tracking', 'billing', 'ai_features', 'ai_engine', 'marketplace', 'addon'];

export default function PricingPage() {
  const { t } = useTranslation();

  const comparison = t('pricing.comparison', { returnObjects: true }) as ComparisonRow[];
  const categories = t('pricing.categories', { returnObjects: true }) as Record<string, string>;
  const upgrades = t('pricing.upgrades', { returnObjects: true }) as Upgrade[];

  const grouped = categoryOrder
    .map((cat) => ({
      key: cat,
      label: categories[cat],
      rows: comparison.filter((r) => r.category === cat),
    }))
    .filter((g) => g.rows.length > 0);

  return (
    <div>
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-lime/30 bg-lime/5 text-xs text-lime font-medium mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
            {t('pricing.beta_banner')}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6 whitespace-pre-line"
          >
            {t('pricing.page_title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            {t('pricing.page_subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Plan cards */}
      <section className="px-6 pb-24 md:pb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {planKeys.map((key, i) => {
            const name = t(`pricing.plans.${key}.name`);
            const price = t(`pricing.plans.${key}.price`);
            const desc = t(`pricing.plans.${key}.desc`);
            const cta = t(`pricing.plans.${key}.cta`);
            const features = t(`pricing.plans.${key}.features`, { returnObjects: true }) as string[];
            const isPopular = key === 'pro';
            const isBest = key === 'business';
            const isPaid = key !== 'free';

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`relative section-surface rounded-3xl p-7 md:p-8 flex flex-col ${
                  isPopular ? 'ring-1 ring-accent/30' : ''
                } ${isBest ? 'ring-1 ring-lime/30' : ''}`}
              >
                {isPopular && (
                  <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-accent text-xs font-semibold text-white">
                    {t('pricing.popular')}
                  </div>
                )}
                {isBest && (
                  <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-lime text-xs font-semibold text-bg-primary">
                    {t('pricing.best_value')}
                  </div>
                )}

                <h3 className={`text-lg font-semibold mb-2 ${
                  isPopular ? 'text-accent' : isBest ? 'text-lime' : 'text-text-secondary'
                }`}>
                  {name}
                </h3>
                <p className="text-xs text-text-muted mb-5 leading-relaxed">{desc}</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold">{price === '0' ? '€0' : `€${price}`}</span>
                  {isPaid && <span className="text-text-muted text-sm">{t('pricing.per_month')}</span>}
                </div>
                <ul className="flex-1 space-y-3 mb-8">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-text-secondary">
                      <Check color={checkColors[i]} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/beta"
                  className={`block text-center py-3 rounded-full font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 ${
                    isPopular
                      ? 'bg-accent text-white hover:shadow-lg hover:shadow-accent/20'
                      : isBest
                        ? 'bg-lime text-bg-primary hover:shadow-lg hover:shadow-lime/20'
                        : 'border border-white/10 text-white hover:border-white/25'
                  }`}
                >
                  {cta}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Upgrade path */}
      <section className="px-6 pb-24 md:pb-32">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{t('pricing.upgrade_title')}</h2>
            <p className="text-text-secondary text-lg max-w-xl mx-auto">{t('pricing.upgrade_subtitle')}</p>
          </motion.div>

          <div className="flex flex-col gap-6">
            {upgrades.map((u, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="section-surface rounded-3xl p-8 md:p-10"
              >
                {/* Header row */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="text-sm font-semibold text-text-secondary">{u.from}</span>
                  <ArrowRight />
                  <span className="text-sm font-semibold text-white">{u.to}</span>
                  <span className="ml-auto px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold">
                    {u.price}
                  </span>
                </div>

                {/* Motivation quote */}
                <p className="text-lg md:text-xl text-white font-medium mb-6 italic">
                  "{u.motivation}"
                </p>

                {/* Details grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Gate</span>
                      <p className="text-sm text-text-secondary mt-1">{u.gate}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-lime/10 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-lime" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Bonus</span>
                      <p className="text-sm text-text-secondary mt-1">{u.bonus}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ollama + Addon */}
      <section className="px-6 pb-24 md:pb-32">
        <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Ollama */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="section-surface rounded-3xl p-8 md:p-10"
          >
            <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">{t('pricing.ollama_title')}</h3>
            <p className="text-text-secondary leading-relaxed">{t('pricing.ollama_desc')}</p>
          </motion.div>

          {/* Addon */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="section-surface rounded-3xl p-8 md:p-10"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-lime/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-lime" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                </svg>
              </div>
              <span className="px-3 py-1 rounded-full bg-lime/10 text-lime text-xs font-bold">
                {t('pricing.addon_price')}
              </span>
            </div>
            <h3 className="text-xl font-semibold mb-3">{t('pricing.addon_title')}</h3>
            <p className="text-text-secondary leading-relaxed">{t('pricing.addon_desc')}</p>
          </motion.div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="px-6 pb-24 md:pb-32">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{t('pricing.comparison_title')}</h2>
            <p className="text-text-secondary text-lg max-w-xl mx-auto">{t('pricing.comparison_subtitle')}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="section-surface rounded-3xl overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="text-left text-sm font-medium text-text-muted px-6 py-5 w-[30%]" />
                    {planKeys.map((key) => {
                      const name = t(`pricing.plans.${key}.name`);
                      const price = t(`pricing.plans.${key}.price`);
                      return (
                        <th key={key} className="text-center px-4 py-5 w-[17.5%]">
                          <div className="text-sm font-semibold text-white">{name}</div>
                          <div className="text-xs text-text-muted mt-1">
                            {price === '0' ? '€0' : `€${price}${t('pricing.per_month')}`}
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {grouped.map((group) => (
                    <>
                      <tr key={`cat-${group.key}`}>
                        <td colSpan={5} className="px-6 pt-8 pb-3">
                          <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                            {group.label}
                          </span>
                        </td>
                      </tr>
                      {group.rows.map((row, ri) => (
                        <tr
                          key={`${group.key}-${ri}`}
                          className="border-t border-white/[0.04] hover:bg-white/[0.02] transition-colors"
                        >
                          <td className="px-6 py-4 text-sm text-text-secondary">{row.feature}</td>
                          <td className="px-4 py-4 text-center"><CellValue value={row.free} /></td>
                          <td className="px-4 py-4 text-center"><CellValue value={row.free_web} /></td>
                          <td className="px-4 py-4 text-center"><CellValue value={row.pro} /></td>
                          <td className="px-4 py-4 text-center"><CellValue value={row.business} /></td>
                        </tr>
                      ))}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24 md:pb-40">
        <div className="mx-auto max-w-4xl section-surface rounded-3xl p-12 md:p-20 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-5">{t('about.cta_title')}</h2>
          <p className="text-text-secondary text-lg mb-10 max-w-lg mx-auto">{t('about.cta_subtitle')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/beta" className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-lime text-bg-primary font-semibold hover:-translate-y-0.5 hover:shadow-lg hover:shadow-lime/20 transition-all duration-200">
              {t('about.cta_button')}
            </Link>
            <Link to="/" className="inline-flex items-center justify-center px-10 py-4 rounded-full border border-white/10 text-white font-medium hover:border-white/25 hover:-translate-y-0.5 transition-all duration-200">
              {t('feature_pages.back_home')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
