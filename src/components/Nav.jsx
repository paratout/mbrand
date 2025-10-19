import { useState, useEffect } from 'react';

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
    <nav className="bg-white/80 backdrop-blur-xl sticky top-0 z-50 border-b border-slate-200/50 shadow-sm">
      <div className="container-custom">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <a href="/" className="group flex items-center" aria-label="Mehdi Bamou - Home">
            <div>
              <div className="font-heading font-bold text-slate-900 text-xl leading-none group-hover:text-primary transition-colors">
                Mehdi Bamou
              </div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">
                  Business & Technology
              </div>
            </div>
          </a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                  isActive(link.href)
                    ? 'text-primary'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-primary rounded-full"></span>
                )}
              </a>
            ))}
          </div>
            
          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none transition-colors"
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
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden pb-4 pt-2 space-y-1 animate-in slide-in-from-top duration-200">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative block px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200 ${
                  isActive(link.href)
                    ? 'text-primary bg-primary/5'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center justify-between">
                  <span>{link.label}</span>
                  {isActive(link.href) && (
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  )}
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
