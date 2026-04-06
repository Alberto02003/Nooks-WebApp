import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  const links = [
    { label: t('footer.privacy'), href: '#' },
    { label: t('footer.terms'), href: '#' },
    { label: t('footer.contact'), href: '#' },
  ];

  return (
    <footer className="border-t border-border-card">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <span className="text-lg font-bold text-white">Nooks</span>
            <p className="text-text-muted text-sm mt-1">{t('footer.tagline')}</p>
          </div>

          <div className="flex gap-8">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm text-text-muted hover:text-white transition-colors duration-200"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-border-card flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-text-muted">
          <span>{t('footer.made_with')} &hearts;</span>
          <span>&copy; 2026 Nooks. {t('footer.rights')}</span>
        </div>
      </div>
    </footer>
  );
}
