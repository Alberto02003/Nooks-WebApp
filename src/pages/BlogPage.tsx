import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Post { title: string; excerpt: string; date: string; tag: string }

const tagColors: Record<string, string> = {
  Lanzamiento: '#C9FD4D', Launch: '#C9FD4D',
  Tecnologia: '#5E8BFF', Technology: '#5E8BFF',
  Producto: '#A78BFA', Product: '#A78BFA',
};

export default function BlogPage() {
  const { t } = useTranslation();
  const posts = t('blog.posts', { returnObjects: true }) as Post[];

  return (
    <div>
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border-card text-xs text-text-secondary mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            {t('blog.badge')}
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6 whitespace-pre-line">
            {t('blog.title')}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {t('blog.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Posts grid */}
      <section className="px-6 pb-16 md:pb-24">
        <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, i) => {
            const color = tagColors[post.tag] || '#5E8BFF';
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="section-surface rounded-3xl p-8 flex flex-col group hover:bg-white/[0.03] transition-colors duration-200">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                    style={{ background: `${color}15`, color }}>
                    {post.tag}
                  </span>
                  <span className="text-xs text-text-muted">{post.date}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-accent transition-colors duration-200">{post.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed flex-1">{post.excerpt}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Coming soon notice */}
      <section className="px-6 pb-24 md:pb-40">
        <div className="mx-auto max-w-3xl section-surface rounded-3xl p-12 md:p-16 text-center">
          <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
            <svg className="w-7 h-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-3">{t('blog.coming_soon')}</h3>
          <p className="text-text-secondary mb-8">{t('blog.coming_soon_desc')}</p>
          <Link to="/beta" className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-accent text-white font-semibold text-sm hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/20 transition-all duration-200">
            {t('pages.beta.cta_button')}
          </Link>
        </div>
      </section>
    </div>
  );
}
