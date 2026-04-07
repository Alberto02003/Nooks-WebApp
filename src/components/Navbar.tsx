import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface NavDropdown {
  label: string;
  sections: {
    title: string;
    links: { label: string; desc: string; to: string }[];
  }[];
}

function DropdownMenu({ dropdown, onClose }: { dropdown: NavDropdown; onClose: () => void }) {
  return (
    <div className="absolute top-full left-0 right-0 bg-bg-primary border-t border-border-card animate-in">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {dropdown.sections.map((section) => (
            <div key={section.title}>
              <h4 className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-4">
                {section.title}
              </h4>
              <div className="flex flex-col gap-1">
                {section.links.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={onClose}
                    className="group rounded-xl px-3 py-2.5 -mx-3 hover:bg-white/[0.04] transition-colors duration-200"
                  >
                    <div className="text-sm font-medium text-white group-hover:text-accent transition-colors duration-200">
                      {link.label}
                    </div>
                    <div className="text-xs text-text-muted mt-0.5">{link.desc}</div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en');
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const dropdowns: NavDropdown[] = [
    {
      label: t('nav.product'),
      sections: [
        {
          title: t('nav.core_tools'),
          links: [
            { label: t('nav.notes'), desc: t('nav.notes_desc'), to: '/features/notes' },
            { label: t('nav.tasks'), desc: t('nav.tasks_desc'), to: '/features/tasks' },
            { label: t('nav.projects'), desc: t('nav.projects_desc'), to: '/features/projects' },
          ],
        },
        {
          title: t('nav.planning'),
          links: [
            { label: t('nav.calendar'), desc: t('nav.calendar_desc'), to: '/features/calendar' },
          ],
        },
        {
          title: t('nav.intelligence'),
          links: [
            { label: t('nav.ai'), desc: t('nav.ai_desc'), to: '/features/ai' },
            { label: t('nav.ollama'), desc: t('nav.ollama_desc'), to: '/ollama' },
          ],
        },
        {
          title: t('nav.more'),
          links: [
            { label: t('nav.beta'), desc: t('nav.beta_desc'), to: '/beta' },
          ],
        },
      ],
    },
  ];

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenDropdown(null), 200);
  };

  return (
    <nav ref={navRef} className={`glass-navbar fixed top-0 left-0 right-0 z-50 ${openDropdown || menuOpen || hovered ? 'nav-solid' : ''}`}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 h-16">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-white tracking-tight">
          Nooks
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {dropdowns.map((dd) => (
            <div
              key={dd.label}
              onMouseEnter={() => handleMouseEnter(dd.label)}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={`text-sm px-4 py-2 rounded-full transition-colors duration-200 flex items-center gap-1 ${
                  openDropdown === dd.label
                    ? 'text-white bg-white/[0.06]'
                    : 'text-text-secondary hover:text-white'
                }`}
              >
                {dd.label}
                <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === dd.label ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </button>
            </div>
          ))}

          <Link to="/pricing" className="text-sm px-4 py-2 text-text-secondary hover:text-white transition-colors duration-200">
            {t('nav.pricing_link')}
          </Link>
          <Link to="/#faq" className="text-sm px-4 py-2 text-text-secondary hover:text-white transition-colors duration-200">
            {t('nav.faq')}
          </Link>
          <Link to="/beta" className="text-sm px-4 py-2 text-text-secondary hover:text-white transition-colors duration-200">
            Beta
          </Link>
          <Link to="/about" className="text-sm px-4 py-2 text-text-secondary hover:text-white transition-colors duration-200">
            {t('nav.about')}
          </Link>
        </div>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleLang}
            className="text-xs font-medium px-3 py-1.5 rounded-full border border-border-card text-text-secondary hover:text-white hover:border-white/20 transition-all duration-200"
          >
            {i18n.language === 'en' ? 'ES' : 'EN'}
          </button>
          <Link
            to="/login"
            className="text-sm font-medium px-5 py-2 rounded-full border border-border-card text-text-secondary hover:text-white hover:border-white/20 transition-all duration-200"
          >
            {t('nav.login')}
          </Link>
          <Link
            to="/register"
            className="text-sm font-medium px-5 py-2 rounded-full bg-accent text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/20 transition-all duration-200"
          >
            {t('nav.register')}
          </Link>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={toggleLang}
            className="text-xs font-medium px-3 py-1.5 rounded-full border border-border-card text-text-secondary"
          >
            {i18n.language === 'en' ? 'ES' : 'EN'}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white p-1"
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {menuOpen ? (
                <><line x1="6" y1="6" x2="18" y2="18" /><line x1="6" y1="18" x2="18" y2="6" /></>
              ) : (
                <><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="17" x2="20" y2="17" /></>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mega dropdown */}
      {openDropdown && (
        <div onMouseEnter={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }} onMouseLeave={handleMouseLeave}>
          {dropdowns.filter((d) => d.label === openDropdown).map((dd) => (
            <DropdownMenu key={dd.label} dropdown={dd} onClose={() => setOpenDropdown(null)} />
          ))}
        </div>
      )}

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-6 flex flex-col gap-2 border-t border-border-card pt-4">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-1">{t('nav.product')}</p>
          {dropdowns[0].sections.flatMap((s) => s.links).map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className="text-sm text-text-secondary hover:text-white transition-colors py-1"
            >
              {link.label}
            </Link>
          ))}
          <div className="border-t border-border-card my-2" />
          <Link to="/pricing" onClick={() => setMenuOpen(false)} className="text-sm text-text-secondary hover:text-white py-1">
            {t('nav.pricing_link')}
          </Link>
          <Link to="/#faq" onClick={() => setMenuOpen(false)} className="text-sm text-text-secondary hover:text-white py-1">
            {t('nav.faq')}
          </Link>
          <Link to="/beta" onClick={() => setMenuOpen(false)} className="text-sm text-text-secondary hover:text-white py-1">
            Beta
          </Link>
          <Link to="/about" onClick={() => setMenuOpen(false)} className="text-sm text-text-secondary hover:text-white py-1">
            {t('nav.about')}
          </Link>
          <Link to="/login" onClick={() => setMenuOpen(false)} className="mt-2 text-sm font-medium px-5 py-2.5 rounded-full border border-border-card text-text-secondary text-center hover:text-white hover:border-white/20 transition-all duration-200">
            {t('nav.login')}
          </Link>
          <Link to="/register" onClick={() => setMenuOpen(false)} className="text-sm font-medium px-5 py-2.5 rounded-full bg-accent text-white text-center">
            {t('nav.register')}
          </Link>
        </div>
      )}
    </nav>
  );
}
