import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function StatsBar() {
  const { t } = useTranslation();

  const stats = [
    { value: '4', label: t('stats.tools') },
    { value: '100%', label: t('stats.encrypted') },
    { value: '24/7', label: t('stats.available') },
    { value: '0€', label: t('stats.free_start') },
  ];

  return (
    <section className="py-16 border-y border-border-card">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-text-muted uppercase tracking-widest">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
