import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function CallToAction() {
  const { t } = useTranslation();

  return (
    <section className="py-24 md:py-40 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-4xl section-surface rounded-3xl p-12 md:p-20 text-center"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-5">{t('cta.title')}</h2>
        <p className="text-text-secondary text-lg mb-10 max-w-lg mx-auto">{t('cta.subtitle')}</p>
        <a
          href="#"
          className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-lime text-bg-primary font-semibold hover:-translate-y-0.5 hover:shadow-lg hover:shadow-lime/20 transition-all duration-200"
        >
          {t('cta.button')}
        </a>
      </motion.div>
    </section>
  );
}
