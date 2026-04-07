import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="border-b border-white/[0.06] last:border-0"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-6 text-left"
      >
        <span className="text-base font-medium text-white">{q}</span>
        <svg
          className={`w-5 h-5 text-text-muted shrink-0 transition-transform duration-200 ${open ? 'rotate-45' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-96 pb-6' : 'max-h-0'}`}>
        <p className="text-text-secondary leading-relaxed pr-10">{a}</p>
      </div>
    </motion.div>
  );
}

export default function FAQPage() {
  const { t } = useTranslation();
  const items = t('faq.items', { returnObjects: true }) as { q: string; a: string }[];

  return (
    <div>
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6">
            {t('faq.title')}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
            className="text-text-secondary text-lg md:text-xl max-w-xl mx-auto">
            {t('faq.subtitle')}
          </motion.p>
        </div>
      </section>

      <section className="px-6 pb-24 md:pb-32">
        <div className="mx-auto max-w-3xl section-surface rounded-3xl px-8 md:px-12">
          {items.map((item, i) => (
            <FAQItem key={i} q={item.q} a={item.a} index={i} />
          ))}
        </div>
      </section>

      <section className="px-6 pb-24 md:pb-40">
        <div className="mx-auto max-w-3xl section-surface rounded-3xl p-12 md:p-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('contact.title')}</h2>
          <p className="text-text-secondary mb-8">{t('contact.subtitle')}</p>
          <Link to="/contact"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-accent text-white font-semibold text-sm hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/20 transition-all duration-200">
            {t('contact.form_submit')}
          </Link>
        </div>
      </section>
    </div>
  );
}
