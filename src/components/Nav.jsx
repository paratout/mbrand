import { useState, useEffect } from 'react';
import DarkModeToggle from './DarkModeToggle';

export default function Nav({ currentPath = '/' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activePath, setActivePath] = useState(currentPath);

  useEffect(() => {
    // Update active path when client-side navigation occurs
    setActivePath(window.location.pathname);
  }, []);

  const navLinks = [
    { href: '/perspectives', label: 'Perspectives' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/speaking', label: 'Speaking' },
    { href: '/publications', label: 'Publications' },
    { href: '/media', label: 'Media' },
    { href: '/about', label: 'About' },
  ];

  const isActive = (href) => {
    return activePath === href || activePath.startsWith(href + '/');
  };

  return (
    <nav className="bg-white dark:bg-slate-900 shadow-md sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800">
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <a href="/" className="group" aria-label="Mehdi Bamou - Home">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-700 rounded-lg flex items-center justify-center text-white font-bold text-lg group-hover:scale-105 transition-transform shadow-md">
              MB
            </div>
          </a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive(link.href)
                    ? 'text-primary dark:text-primary-400 backdrop-blur-sm bg-white/60 dark:bg-slate-800/60 shadow-lg border border-primary/20 dark:border-primary/30'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 hover:text-primary dark:hover:text-primary-400'
                }`}
              >
                {link.label}
              </a>
            ))}
            <div className="w-px h-6 bg-slate-300 dark:bg-slate-700 mx-2"></div>
            <DarkModeToggle />
          </div>
            
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-slate-700 dark:text-slate-300 focus:outline-none"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden pb-4 border-t border-slate-200 dark:border-slate-800 mt-2 pt-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                  isActive(link.href)
                    ? 'text-primary dark:text-primary-400 backdrop-blur-sm bg-white/60 dark:bg-slate-800/60 shadow-lg border border-primary/20 dark:border-primary/30'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 hover:text-primary dark:hover:text-primary-400'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="h-px bg-slate-200 dark:bg-slate-800 my-2"></div>
            <div className="flex items-center justify-center px-4 py-2">
              <DarkModeToggle />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
