export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = {
    explore: [
      { label: 'Perspectives', href: '/perspectives' },
      { label: 'Portfolio', href: '/portfolio' },
      { label: 'Speaking', href: '/speaking' },
      { label: 'Research', href: '/research' },
      { label: 'Media Library', href: '/media' },
      { label: 'About', href: '/about' },
    ],
    topics: [
      { label: 'Enterprise Architecture', href: '/perspectives?topic=enterprise-architecture' },
      { label: 'Digital Transformation', href: '/perspectives?topic=digital-transformation' },
      { label: 'Cloud Architecture', href: '/perspectives?topic=cloud' },
      { label: 'TOGAF Implementation', href: '/perspectives?topic=togaf' },
      { label: 'Morocco Digital 2030', href: '/perspectives?topic=morocco' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Use', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'Accessibility', href: '/accessibility' },
    ],
  };

  const socialLinks = [
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/mehdibamou',
      icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
    },
    {
      name: 'GitHub',
      href: 'https://github.com/mehdibamou',
      icon: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z',
    },
    {
      name: 'Medium',
      href: 'https://medium.com/@mehdibamou',
      icon: 'M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z',
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/mehdibamou',
      icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
    },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-700 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md">
                  MB
                </div>
                <h3 className="text-xl font-heading font-bold text-white">
                  Mehdi Bamou
                </h3>
              </div>
              <p className="text-slate-400 mb-4 leading-relaxed">
                Enterprise Architect exploring digital transformation, cloud architecture, and technology adoption across Europe and MENA.
              </p>
              <p className="text-sm text-slate-500 mb-6">
                Based in Germany 🇩🇪 • Originally from Morocco 🇲🇦
              </p>
              
              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center transition-colors group"
                    aria-label={social.name}
                  >
                    <svg className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Explore Column */}
            <div>
              <h4 className="text-white font-heading font-bold mb-4">Explore</h4>
              <ul className="space-y-3">
                {footerSections.explore.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Topics Column */}
            <div>
              <h4 className="text-white font-heading font-bold mb-4">Topics</h4>
              <ul className="space-y-3">
                {footerSections.topics.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h4 className="text-white font-heading font-bold mb-4">Legal</h4>
              <ul className="space-y-3">
                {footerSections.legal.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Sustainability & Values */}
        <div className="py-8 border-t border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
              <svg className="w-6 h-6 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h5 className="text-white font-semibold text-sm mb-1">Sustainable Technology</h5>
                <p className="text-slate-500 text-xs">Committed to green cloud practices and energy-efficient architectures</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
              <svg className="w-6 h-6 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <div>
                <h5 className="text-white font-semibold text-sm mb-1">Inclusive Technology</h5>
                <p className="text-slate-500 text-xs">Building accessible solutions for diverse global communities</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
              <svg className="w-6 h-6 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <div>
                <h5 className="text-white font-semibold text-sm mb-1">Ethical AI</h5>
                <p className="text-slate-500 text-xs">Advocating for responsible and transparent AI implementation</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs text-slate-500">
              <span>&copy; {currentYear} Mehdi Bamou. All rights reserved.</span>
              <span className="hidden md:inline">•</span>
              <span>Built with Astro, React & Tailwind CSS</span>
              <span className="hidden md:inline">•</span>
              <span>Hosted on Cloudflare Pages</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Carbon-neutral hosting</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
