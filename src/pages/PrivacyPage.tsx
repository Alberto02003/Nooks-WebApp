import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function PrivacyPage() {
  const { t } = useTranslation();
  const sections = t('legal.privacy.sections', { returnObjects: true }) as { title: string; content: string }[];

  return (
    <div>
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-6">
        <div className="mx-auto max-w-3xl">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
            {t('legal.privacy.title')}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-text-muted text-sm">
            {t('legal.privacy.last_updated')}
          </motion.p>
        </div>
      </section>

      <section className="px-6 pb-24 md:pb-40">
        <div className="mx-auto max-w-3xl space-y-10">
          {sections.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.03 }}>
              <h2 className="text-lg font-semibold mb-3">{s.title}</h2>
              <p className="text-text-secondary leading-relaxed">{s.content}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
