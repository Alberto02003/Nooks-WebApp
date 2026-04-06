import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

function Check({ color }: { color: string }) {
  return (
    <svg className="w-5 h-5 shrink-0 mt-0.5" style={{ color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

export default function Pricing() {
  const { t } = useTranslation();

  const freeFeatures = t('pricing.free_features', { returnObjects: true }) as string[];
  const proFeatures = t('pricing.pro_features', { returnObjects: true }) as string[];

  return (
    <section id="pricing" className="py-24 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-5">{t('pricing.title')}</h2>
          <p className="text-text-secondary text-lg md:text-xl max-w-xl mx-auto">
            {t('pricing.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Free */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="section-surface rounded-3xl p-8 md:p-10 flex flex-col"
          >
            <h3 className="text-lg font-semibold text-text-secondary mb-4">{t('pricing.free')}</h3>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-5xl font-bold">$0</span>
            </div>
            <ul className="flex-1 space-y-4 mb-10">
              {freeFeatures.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-text-secondary">
                  <Check color="#5E8BFF" />
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="#"
              className="block text-center py-3.5 rounded-full border border-white/10 text-white font-semibold text-sm hover:border-white/25 hover:-translate-y-0.5 transition-all duration-200"
            >
              {t('pricing.current_plan')}
            </a>
          </motion.div>

          {/* Pro */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative section-surface rounded-3xl p-8 md:p-10 flex flex-col"
            style={{ borderColor: 'rgba(94,139,255,0.3)' }}
          >
            {/* Popular badge */}
            <div className="absolute -top-3 right-8 px-3 py-1 rounded-full bg-accent text-xs font-semibold text-white">
              Popular
            </div>

            <h3 className="text-lg font-semibold text-accent mb-4">{t('pricing.pro')}</h3>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-5xl font-bold">$4.99</span>
              <span className="text-text-muted text-sm">{t('pricing.per_month')}</span>
            </div>
            <ul className="flex-1 space-y-4 mb-10">
              {proFeatures.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-text-secondary">
                  <Check color="#C9FD4D" />
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="#"
              className="block text-center py-3.5 rounded-full bg-accent text-white font-semibold text-sm hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/20 transition-all duration-200"
            >
              {t('pricing.get_pro')}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
