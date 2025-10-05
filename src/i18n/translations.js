export const translations = {
  en: {
    nav: {
      perspectives: 'Perspectives',
      portfolio: 'Portfolio',
      speaking: 'Speaking',
      research: 'Research',
      media: 'Media',
      about: 'About'
    },
    footer: {
      explore: 'Explore',
      topics: 'Topics',
      legal: 'Legal',
      sustainableTech: 'Sustainable Technology',
      sustainableTechDesc: 'Committed to green cloud practices and energy-efficient architectures',
      inclusiveTech: 'Inclusive Technology',
      inclusiveTechDesc: 'Building accessible solutions for diverse global communities',
      ethicalAI: 'Ethical AI',
      ethicalAIDesc: 'Advocating for responsible and transparent AI implementation',
      carbonNeutral: 'Carbon-neutral hosting',
      builtWith: 'Built with Astro, React & Tailwind CSS',
      hostedOn: 'Hosted on Cloudflare Pages',
      location: 'Based in Düsseldorf, Germany 🇩🇪 • Originally from Morocco 🇲🇦',
      description: 'Enterprise Architect exploring digital transformation, cloud architecture, and technology adoption across Europe and MENA.',
      allRightsReserved: 'All rights reserved.'
    },
    common: {
      readMore: 'Read More',
      learnMore: 'Learn More',
      viewAll: 'View All',
      contact: 'Contact',
      subscribe: 'Subscribe'
    }
  },
  fr: {
    nav: {
      perspectives: 'Perspectives',
      portfolio: 'Portfolio',
      speaking: 'Conférences',
      research: 'Recherche',
      media: 'Médiathèque',
      about: 'À propos'
    },
    footer: {
      explore: 'Explorer',
      topics: 'Sujets',
      legal: 'Légal',
      sustainableTech: 'Technologie Durable',
      sustainableTechDesc: 'Engagé dans les pratiques cloud vertes et les architectures éco-énergétiques',
      inclusiveTech: 'Technologie Inclusive',
      inclusiveTechDesc: 'Créer des solutions accessibles pour des communautés mondiales diverses',
      ethicalAI: 'IA Éthique',
      ethicalAIDesc: 'Défendre une mise en œuvre responsable et transparente de l\'IA',
      carbonNeutral: 'Hébergement neutre en carbone',
      builtWith: 'Construit avec Astro, React & Tailwind CSS',
      hostedOn: 'Hébergé sur Cloudflare Pages',
      location: 'Basé à Düsseldorf, Allemagne 🇩🇪 • Originaire du Maroc 🇲🇦',
      description: 'Architecte d\'entreprise explorant la transformation numérique, l\'architecture cloud et l\'adoption technologique en Europe et au MENA.',
      allRightsReserved: 'Tous droits réservés.'
    },
    common: {
      readMore: 'Lire la suite',
      learnMore: 'En savoir plus',
      viewAll: 'Voir tout',
      contact: 'Contact',
      subscribe: 'S\'abonner'
    }
  },
  ar: {
    nav: {
      perspectives: 'وجهات نظر',
      portfolio: 'الأعمال',
      speaking: 'المحاضرات',
      research: 'البحث',
      media: 'المكتبة',
      about: 'عن'
    },
    footer: {
      explore: 'استكشف',
      topics: 'المواضيع',
      legal: 'قانوني',
      sustainableTech: 'التكنولوجيا المستدامة',
      sustainableTechDesc: 'ملتزمون بممارسات السحابة الخضراء والبنى الموفرة للطاقة',
      inclusiveTech: 'التكنولوجيا الشاملة',
      inclusiveTechDesc: 'بناء حلول يمكن الوصول إليها لمجتمعات عالمية متنوعة',
      ethicalAI: 'الذكاء الاصطناعي الأخلاقي',
      ethicalAIDesc: 'الدعوة إلى تطبيق مسؤول وشفاف للذكاء الاصطناعي',
      carbonNeutral: 'استضافة محايدة للكربون',
      builtWith: 'مبني باستخدام Astro و React و Tailwind CSS',
      hostedOn: 'مستضاف على Cloudflare Pages',
      location: 'مقره في دوسلدورف، ألمانيا 🇩🇪 • من المغرب 🇲🇦',
      description: 'مهندس معماري للمؤسسات يستكشف التحول الرقمي وهندسة السحابة واعتماد التكنولوجيا عبر أوروبا ومنطقة الشرق الأوسط وشمال أفريقيا.',
      allRightsReserved: 'كل الحقوق محفوظة.'
    },
    common: {
      readMore: 'اقرأ المزيد',
      learnMore: 'تعلم المزيد',
      viewAll: 'عرض الكل',
      contact: 'اتصل',
      subscribe: 'اشترك'
    }
  },
  de: {
    nav: {
      perspectives: 'Perspektiven',
      portfolio: 'Portfolio',
      speaking: 'Vorträge',
      research: 'Forschung',
      media: 'Mediathek',
      about: 'Über'
    },
    footer: {
      explore: 'Erkunden',
      topics: 'Themen',
      legal: 'Rechtliches',
      sustainableTech: 'Nachhaltige Technologie',
      sustainableTechDesc: 'Verpflichtet zu grünen Cloud-Praktiken und energieeffizienten Architekturen',
      inclusiveTech: 'Inklusive Technologie',
      inclusiveTechDesc: 'Aufbau zugänglicher Lösungen für vielfältige globale Gemeinschaften',
      ethicalAI: 'Ethische KI',
      ethicalAIDesc: 'Einsatz für verantwortungsvolle und transparente KI-Implementierung',
      carbonNeutral: 'CO2-neutrales Hosting',
      builtWith: 'Erstellt mit Astro, React & Tailwind CSS',
      hostedOn: 'Gehostet auf Cloudflare Pages',
      location: 'Ansässig in Düsseldorf, Deutschland 🇩🇪 • Ursprünglich aus Marokko 🇲🇦',
      description: 'Enterprise Architect, der digitale Transformation, Cloud-Architektur und Technologieakzeptanz in Europa und MENA erforscht.',
      allRightsReserved: 'Alle Rechte vorbehalten.'
    },
    common: {
      readMore: 'Weiterlesen',
      learnMore: 'Mehr erfahren',
      viewAll: 'Alle anzeigen',
      contact: 'Kontakt',
      subscribe: 'Abonnieren'
    }
  }
};

export function getTranslation(locale, key) {
  const keys = key.split('.');
  let value = translations[locale] || translations.en;
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
}

export const languages = {
  en: { code: 'en', name: 'English', flag: '🇬🇧' },
  fr: { code: 'fr', name: 'Français', flag: '🇫🇷' },
  ar: { code: 'ar', name: 'العربية', flag: '🇲🇦', dir: 'rtl' },
  de: { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
};
