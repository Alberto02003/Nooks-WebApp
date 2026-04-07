import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="text-center">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
          className="text-[8rem] md:text-[12rem] font-bold leading-none text-white/[0.04] select-none">
          {t('not_found.title')}
        </motion.div>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
          className="text-text-secondary text-lg md:text-xl -mt-12 md:-mt-16 mb-10">
          {t('not_found.subtitle')}
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
          <Link to="/"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-accent text-white font-semibold text-sm hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/20 transition-all duration-200">
            {t('not_found.button')}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
