import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const icons = [
  // Notes
  <svg key="n" width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>,
  // Tasks
  <svg key="t" width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>,
  // Calendar
  <svg key="c" width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" /></svg>,
  // Projects
  <svg key="p" width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" /></svg>,
];

const featureKeys = ['notes', 'tasks', 'calendar', 'projects'] as const;

// Placeholder visual for feature sections — a styled box representing app UI
function FeatureVisual({ accent }: { accent: string }) {
  return (
    <div className="relative w-full aspect-[4/3] rounded-3xl section-surface overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent" />
      <div className="relative flex flex-col gap-3 w-3/4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div
              className="w-3 h-3 rounded-full shrink-0"
              style={{ background: i === 0 ? accent : 'rgba(255,255,255,0.08)' }}
            />
            <div
              className="h-3 rounded-full"
              style={{
                width: `${60 + Math.random() * 35}%`,
                background: i === 0 ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.06)',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

const accents = ['#5E8BFF', '#C9FD4D', '#5E8BFF', '#C9FD4D'];

export default function Features() {
  const { t } = useTranslation();

  return (
    <section id="features" className="py-24 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24 md:mb-32"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-5">{t('features.title')}</h2>
          <p className="text-text-secondary text-lg md:text-xl max-w-xl mx-auto">
            {t('features.subtitle')}
          </p>
        </motion.div>

        {/* Feature rows — alternating layout */}
        <div className="flex flex-col gap-32 md:gap-40">
          {featureKeys.map((key, i) => {
            const reversed = i % 2 !== 0;
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6 }}
                className={`flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-20`}
              >
                {/* Text side */}
                <div className="flex-1 max-w-lg">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                    style={{ background: `${accents[i]}15`, color: accents[i] }}
                  >
                    {icons[i]}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-4">
                    {t(`features.${key}_title`)}
                  </h3>
                  <p className="text-text-secondary text-lg leading-relaxed">
                    {t(`features.${key}_desc`)}
                  </p>
                </div>

                {/* Visual side */}
                <div className="flex-1 w-full">
                  <FeatureVisual accent={accents[i]} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
