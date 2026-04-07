import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="min-h-screen flex flex-col items-center justify-center pt-16 pb-8 px-6">
      <div className="max-w-5xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border-card text-xs text-text-secondary mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-lime" />
          {t('hero.badge')}
        </motion.div>

        {/* Main headline — Revolut X style: massive, bold */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-8"
        >
          {t('hero.title_line1')}
          <br />
          <span className="text-accent">{t('hero.title_line2')}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          {t('hero.subtitle')}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/beta"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-lime text-bg-primary font-semibold text-sm hover:-translate-y-0.5 hover:shadow-lg hover:shadow-lime/20 transition-all duration-200"
          >
            {t('hero.cta_download')}
          </Link>
          <a
            href="#features"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-white/10 text-white font-medium text-sm hover:border-white/25 hover:-translate-y-0.5 transition-all duration-200"
          >
            {t('hero.cta_learn')}
            <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
