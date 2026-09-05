export type Lang = "ar" | "en";

export interface NavItem {
  label: string;
  href: string;
}

export interface Fact {
  label: string;
  value: string;
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface Job {
  role: string;
  org: string;
  period: string;
}

export interface Project {
  status: string;
  name: string;
  desc: string;
  tags: string[];
  img?: string;
  noImg?: boolean;
  buildLabel?: string;
  link?: string;
  linkLabel?: string;
}

export interface Contact {
  label: string;
  value: string;
  href: string;
}

export interface Content {
  brand: string;
  langToggle: string;
  nav: NavItem[];
  heroKicker: string;
  heroName: string;
  heroTagline: string;
  heroStack: string[];
  ctaWork: string;
  ctaContact: string;
  scroll: string;
  loadingLabel: string;
  photoHint: string;
  photo: string;
  aboutTag: string;
  aboutTitle: string;
  aboutBody: string[];
  aboutFacts: Fact[];
  skillsTag: string;
  skillsTitle: string;
  skillGroups: SkillGroup[];
  expTag: string;
  expTitle: string;
  experience: Job[];
  projTag: string;
  projTitle: string;
  projects: Project[];
  contactTag: string;
  contactTitle: string;
  contactLead: string;
  contacts: Contact[];
  footer: string;
}

export const CONTENT: Record<Lang, Content> = {
  ar: {
    brand: "م. سعادات",
    langToggle: "EN",
    nav: [
      { label: "نبذة", href: "#about" },
      { label: "المهارات", href: "#skills" },
      { label: "الخبرة", href: "#experience" },
      { label: "مشاريع", href: "#projects" },
      { label: "تواصل", href: "#contact" },
    ],
    heroKicker: "مطوّر متكامل (Full-Stack)",
    heroName: "محمد جميل سعادات",
    heroTagline:
      "أبني منتجات ويب متكاملة من الألف إلى الياء — واجهات React/Next.js عالية الأداء، وأنظمة خلفية إنتاجية بـ Laravel/PHP، ونشرها.",
    heroStack: ["React", "Next.js", "Laravel", "Docker"],
    ctaWork: "شاهد المشاريع",
    ctaContact: "تواصل معي",
    scroll: "انزل للأسفل",
    loadingLabel: "جاري التحميل",
    photoHint: "صورتك هنا",
    photo: "/profile-portrait.jpg",
    aboutTag: "نبذة",
    aboutTitle: "من أنا",
    aboutBody: [
      "دبلوم هندسة برمجيات من المعهد التقني لهندسة الحاسوب، جامعة دمشق (٢٠٢٣–٢٠٢٥).",
      "مهندس برمجيات متكامل (Full-Stack) أعمل حالياً في Connect Digital Agency، حيث أبني منتجات ويب من الألف إلى الياء — من واجهات React/Next.js عالية الأداء إلى أنظمة خلفية إنتاجية بـ Laravel/PHP ونشرها.",
      "أتولّى مشاريع بشكل كامل: تصميم REST APIs، بناء معماريات خدمات متعددة الطبقات، ونشر حاويات مع CI/CD، إضافة إلى تحويل تصاميم UI/UX إلى مكوّنات واجهة نظيفة وقابلة لإعادة الاستخدام.",
      "أؤمن بالكود النظيف ومبادئ SOLID، مع خبرة مباشرة عبر كامل الطبقات — من تصميم قواعد البيانات إلى المصادقة متعددة العملاء عبر JWT وحتى البنية التحتية الإنتاجية.",
    ],
    aboutFacts: [
      { label: "التعليم", value: "هندسة برمجيات — جامعة دمشق (٢٠٢٣–٢٠٢٥)" },
      { label: "الحالياً", value: "مطوّر متكامل (Full-Stack) — Connect Digital Agency" },
    ],
    skillsTag: "المهارات",
    skillsTitle: "المهارات",
    skillGroups: [
      {
        title: "الواجهة الأمامية",
        items: [
          "React",
          "Next.js",
          "TypeScript",
          "Tailwind CSS",
          "Sass",
          "Zustand",
          "React Query (TanStack)",
          "Framer Motion",
          "Three.js",
          "Express.js",
          "Blade",
        ],
      },
      {
        title: "الواجهة الخلفية والمعمارية",
        items: [
          "Laravel (9/10/11/12)",
          "Symfony",
          "PHP 8.x",
          "OOP / MVC / SOLID",
          "Repository Pattern",
          "معمارية طبقات الخدمات (Service Layer)",
          "PHPUnit & Pest",
        ],
      },
      {
        title: "تطوير الـ APIs",
        items: [
          "RESTful APIs (بناء API بـ 249 نقطة نهاية)",
          "Laravel API Resources",
          "Form Requests",
          "Laravel Sanctum",
          "tymon/jwt-auth (متعدد Guards)",
          "Spatie Roles & Permissions",
          "تحديد معدّل الطلبات المتدرّج",
          "توثيق OpenAPI/Swagger",
        ],
      },
      { title: "قواعد البيانات", items: ["MySQL (استعلامات معقّدة، فهرسة، تحسين أداء)", "PostgreSQL"] },
      {
        title: "DevOps والنشر",
        items: [
          "Docker & Docker Compose",
          "Nginx",
          "إدارة خوادم Ubuntu VPS",
          "GitLab CI/CD",
          "Laravel Cloud",
          "Vercel",
        ],
      },
      { title: "الاختبارات (الواجهة الأمامية)", items: ["Jest", "React Testing Library", "Playwright"] },
      {
        title: "الأداء وإتاحة الوصول",
        items: ["Core Web Vitals", "إتاحة الوصول (a11y)", "تصميم RTL أولاً"],
      },
      {
        title: "الذكاء الاصطناعي ومعالجة الصوت",
        items: ["Speech-to-Text", "Faster-Whisper", "Silero VAD", "نماذج Hugging Face", "معمارية RAG", "WebSockets"],
      },
      { title: "التتبّع والتحليلات", items: ["Google Analytics (GA4)", "تتبّع الأحداث"] },
    ],
    expTag: "الخبرة",
    expTitle: "الخبرة",
    experience: [
      {
        role: "مطوّر متكامل (Full-Stack Developer)",
        org: "Connect Digital Agency",
        period: "أيار ٢٠٢٦ — حتى الآن",
      },
      {
        role: "مطوّر متكامل (Full-Stack Developer)",
        org: "MSA DataX — برلين، عن بعد",
        period: "كانون الأول ٢٠٢٥ — آذار ٢٠٢٦",
      },
      {
        role: "مطوّر واجهات أمامية (Front-End Developer)",
        org: "Tkram Ride",
        period: "أيلول ٢٠٢٥ — آب ٢٠٢٦",
      },
    ],
    projTag: "مشاريع",
    projTitle: "مشاريع",
    projects: [
      {
        status: "قيد التطوير",
        name: "Studio",
        desc: "منصّة SaaS لبناء المواقع بالعربية، RTL أولاً، بأسلوب Wix / Webflow وموجّهة للأعمال الصغيرة الناطقة بالعربية.",
        tags: ["Next.js", "TypeScript", "RTL"],
        noImg: true,
        buildLabel: "قيد البناء",
      },
      {
        status: "منشور",
        name: "Raumstudio BenTo'o",
        desc: "صفحة هبوط احترافية لشركة أرضيات وباركيه في برلين — تصميم أنيق ودافئ يركّز على الحرفية والثقة.",
        tags: ["React", "Next.js", "Responsive"],
        img: "/raumstudio-card.jpg",
        link: "https://raumstudio-bentoo-website.vercel.app/",
        linkLabel: "زيارة الموقع",
      },
      {
        status: "منشور",
        name: "SK Restaurant",
        desc: "موقع مطعم فاخر في برلين مع نظام حجوزات وقائمة طعام وتبديل لغة — أجواء داكنة وذهبية أنيقة.",
        tags: ["React", "Next.js", "i18n"],
        img: "/skrestaurant-card.jpg",
        link: "https://skresturant.vercel.app/",
        linkLabel: "زيارة الموقع",
      },
      {
        status: "منشور",
        name: "Laqta Store",
        desc: "منصّة تجارة إلكترونية وتوصيل متعددة البائعين (Laravel + Next.js) لأربعة عملاء: تطبيق الزبون، تطبيق السائق، بوابة البائع، ولوحة الإدارة. صممت API بـ 249 نقطة نهاية، مع 4 JWT guards مستقلة، صلاحيات Spatie، ودورة حياة طلب من 6 حالات ونظام تتبّع توصيل من 9 حالات. أدير النشر بالكامل عبر Docker Compose وGitLab CI/CD على خادم Ubuntu VPS.",
        tags: ["Laravel 12", "Next.js", "JWT", "Docker", "CI/CD"],
        noImg: true,
        buildLabel: "خلفية + نشر",
      },
      {
        status: "منشور",
        name: "متجر ملابس أطفال إلكتروني",
        desc: "متجر إلكتروني لملابس الأطفال بـ Next.js وLaravel، مُهيّأ لحركة زوار عالية مع استعلامات قاعدة بيانات وتحميل صور محسّنة لقابلية التوسّع.",
        tags: ["Next.js", "Laravel", "e-commerce"],
        noImg: true,
        buildLabel: "متجر إلكتروني",
      },
      {
        status: "منشور",
        name: "نظام حجز محطات شحن السيارات الكهربائية (ev-power)",
        desc: "نظام حجز آلي بالكامل لمحطات شحن السيارات الكهربائية بـ Laravel، مع أتمتة معقّدة للجدولة، التحقق من الزيارات، ومنع تعارض الأوقات، ولوحة إدارة بصلاحيات Spatie.",
        tags: ["Laravel", "Service Classes", "Spatie"],
        noImg: true,
        buildLabel: "أتمتة وحجز",
      },
      {
        status: "منشور",
        name: "متجر باركود / مخزون ونقاط بيع",
        desc: "نظام مخزون ونقاط بيع (POS) شامل بـ Laravel وBlade، مع REST APIs محسّنة يستهلكها تطبيق Flutter لمسح الباركود الفوري وخصم المخزون تلقائياً.",
        tags: ["Laravel", "Blade", "REST API", "Flutter"],
        noImg: true,
        buildLabel: "POS ومخزون",
      },
      {
        status: "منشور",
        name: "FollowerSpeed",
        desc: "منصّة خدمات رقمية شاملة (followerspeed.de).",
        tags: ["Laravel"],
        noImg: true,
        buildLabel: "منصّة خدمات",
      },
    ],
    contactTag: "تواصل",
    contactTitle: "تواصل",
    contactLead: "مفتوح للفرص والتعاون، دواماً كاملاً (حضورياً أو عن بعد). أسرع طريقة للوصول إليّ هي البريد الإلكتروني.",
    contacts: [
      { label: "البريد الإلكتروني", value: "androo2050@gmail.com", href: "mailto:androo2050@gmail.com" },
      { label: "الهاتف", value: "958 389 235 963+", href: "tel:+963958389235" },
      {
        label: "LinkedIn",
        value: "in/mohamad-saadat-7b293333a",
        href: "https://linkedin.com/in/mohamad-saadat-7b293333a",
      },
      { label: "GitHub", value: "github.com/mohamadsadaat", href: "https://github.com/mohamadsadaat" },
      { label: "GitLab", value: "gitlab.com/mohamadsadaat", href: "https://gitlab.com/mohamadsadaat" },
    ],
    footer: "محمد جميل سعادات — ٢٠٢٦",
  },
  en: {
    brand: "M. Saadat",
    langToggle: "عربي",
    nav: [
      { label: "About", href: "#about" },
      { label: "Skills", href: "#skills" },
      { label: "Experience", href: "#experience" },
      { label: "Projects", href: "#projects" },
      { label: "Contact", href: "#contact" },
    ],
    heroKicker: "Full-Stack Developer",
    heroName: "Mohammed Jamil Saadat",
    heroTagline:
      "I build end-to-end web products — high-performance React/Next.js interfaces, production Laravel/PHP backends, and everything in between, including deployment.",
    heroStack: ["React", "Next.js", "Laravel", "Docker"],
    ctaWork: "View projects",
    ctaContact: "Get in touch",
    scroll: "SCROLL DOWN",
    loadingLabel: "LOADING",
    photoHint: "Your photo",
    photo: "/profile-portrait.jpg",
    aboutTag: "ABOUT",
    aboutTitle: "About",
    aboutBody: [
      "Software Engineering Diploma, Technical Institute of Computer Engineering, Damascus University (2023–2025).",
      "Full-Stack Software Engineer with professional experience since 2025, currently building end-to-end web products at Connect Digital Agency — from high-performance React/Next.js interfaces to production Laravel/PHP backends and their deployment.",
      "Comfortable owning a project fully: architecting REST APIs, designing layered service architectures, and shipping containerized deployments with CI/CD, as well as translating UI/UX designs into clean, reusable front-end components.",
      "Advocate for clean code and SOLID principles, with direct experience across the full stack — from database schema to JWT-based multi-client authentication to production infrastructure.",
    ],
    aboutFacts: [
      { label: "EDUCATION", value: "Software Engineering — Damascus University (2023–2025)" },
      { label: "CURRENTLY", value: "Full-Stack Developer — Connect Digital Agency" },
    ],
    skillsTag: "SKILLS",
    skillsTitle: "Skills",
    skillGroups: [
      {
        title: "Frontend",
        items: [
          "React",
          "Next.js",
          "TypeScript",
          "Tailwind CSS",
          "Sass",
          "Zustand",
          "React Query (TanStack)",
          "Framer Motion",
          "Three.js",
          "Express.js",
          "Blade",
        ],
      },
      {
        title: "Backend & Architecture",
        items: [
          "Laravel (9/10/11/12)",
          "Symfony",
          "PHP 8.x",
          "OOP / MVC / SOLID",
          "Repository Pattern",
          "Layered Service-Class architecture",
          "PHPUnit & Pest",
        ],
      },
      {
        title: "API Development",
        items: [
          "RESTful APIs at scale (249-endpoint production API)",
          "Laravel API Resources",
          "Form Requests validation",
          "Laravel Sanctum",
          "tymon/jwt-auth (multi-guard)",
          "Spatie Roles & Permissions",
          "Tiered rate limiting",
          "OpenAPI/Swagger documentation",
        ],
      },
      { title: "Databases", items: ["MySQL (complex queries, indexing, optimization)", "PostgreSQL"] },
      {
        title: "DevOps & Deployment",
        items: ["Docker & Docker Compose", "Nginx", "Ubuntu VPS administration", "GitLab CI/CD", "Laravel Cloud", "Vercel"],
      },
      { title: "Front-End Testing", items: ["Jest", "React Testing Library", "Playwright"] },
      {
        title: "Accessibility & Performance",
        items: ["Core Web Vitals", "Accessibility (a11y)", "RTL-first design"],
      },
      {
        title: "AI & Audio Processing",
        items: ["Speech-to-Text", "Faster-Whisper", "Silero VAD", "Hugging Face models", "RAG architecture", "WebSockets"],
      },
      { title: "Tracking & Analytics", items: ["Google Analytics (GA4)", "Event tracking"] },
    ],
    expTag: "EXPERIENCE",
    expTitle: "Experience",
    experience: [
      { role: "Full-Stack Developer", org: "Connect Digital Agency", period: "May 2026 — present" },
      { role: "Full-Stack Developer", org: "MSA DataX — Berlin, remote", period: "Dec 2025 — Mar 2026" },
      { role: "Front-End Developer", org: "Tkram Ride", period: "Sep 2025 — Aug 2026" },
    ],
    projTag: "PROJECTS",
    projTitle: "Projects",
    projects: [
      {
        status: "IN PROGRESS",
        name: "Studio",
        desc: "An RTL-first Arabic website-builder SaaS in the spirit of Wix and Webflow, aimed at Arabic-speaking small businesses.",
        tags: ["Next.js", "TypeScript", "RTL"],
        noImg: true,
        buildLabel: "BUILDING",
      },
      {
        status: "SHIPPED",
        name: "Raumstudio BenTo'o",
        desc: "A polished landing page for a Berlin flooring & parquet craftsman studio — warm, elegant design focused on craftsmanship and trust.",
        tags: ["React", "Next.js", "Responsive"],
        img: "/raumstudio-card.jpg",
        link: "https://raumstudio-bentoo-website.vercel.app/",
        linkLabel: "Visit site",
      },
      {
        status: "SHIPPED",
        name: "SK Restaurant",
        desc: "A fine-dining restaurant website in Berlin with reservations, a menu, and language switching — an elegant dark-and-gold atmosphere.",
        tags: ["React", "Next.js", "i18n"],
        img: "/skrestaurant-card.jpg",
        link: "https://skresturant.vercel.app/",
        linkLabel: "Visit site",
      },
      {
        status: "SHIPPED",
        name: "Laqta Store",
        desc: "A multi-vendor e-commerce and delivery platform (Laravel + Next.js) serving four clients: customer app, driver app, vendor portal, and admin dashboard. Architected a 249-endpoint REST API with 4 independent JWT guards, Spatie role/permission authorization, a 6-state order lifecycle, and a 9-state delivery-tracking system. Owned production deployment end to end with Docker Compose and a GitLab CI/CD pipeline on a self-managed Ubuntu VPS.",
        tags: ["Laravel 12", "Next.js", "JWT", "Docker", "CI/CD"],
        noImg: true,
        buildLabel: "BACKEND + DEPLOY",
      },
      {
        status: "SHIPPED",
        name: "Children's Clothing E-Commerce Platform",
        desc: "A children's clothing e-commerce storefront using Next.js and Laravel, engineered for high visitor traffic with optimized database queries and image loading for scalability.",
        tags: ["Next.js", "Laravel", "e-commerce"],
        noImg: true,
        buildLabel: "E-COMMERCE",
      },
      {
        status: "SHIPPED",
        name: "Power Station Charging Booking System (ev-power)",
        desc: "A fully automated booking system for EV charging stations using Laravel, with complex backend automation for scheduling, visit verification, and real-time conflict checking, plus an admin panel with Spatie role-based access control.",
        tags: ["Laravel", "Service Classes", "Spatie"],
        noImg: true,
        buildLabel: "BOOKING SYSTEM",
      },
      {
        status: "SHIPPED",
        name: "Barcode Store / Inventory & POS",
        desc: "A comprehensive inventory and POS system using Laravel and Blade, with optimized REST APIs consumed by a Flutter client for real-time barcode scanning and automated warehouse stock decrementation.",
        tags: ["Laravel", "Blade", "REST API", "Flutter"],
        noImg: true,
        buildLabel: "POS & INVENTORY",
      },
      {
        status: "SHIPPED",
        name: "FollowerSpeed",
        desc: "A comprehensive digital services platform (followerspeed.de).",
        tags: ["Laravel"],
        noImg: true,
        buildLabel: "SERVICES PLATFORM",
      },
    ],
    contactTag: "CONTACT",
    contactTitle: "Contact",
    contactLead: "Open to opportunities and collaboration, full-time (on-site or remote). Email is the fastest way to reach me.",
    contacts: [
      { label: "EMAIL", value: "androo2050@gmail.com", href: "mailto:androo2050@gmail.com" },
      { label: "PHONE", value: "+963 958 389 235", href: "tel:+963958389235" },
      {
        label: "LINKEDIN",
        value: "in/mohamad-saadat-7b293333a",
        href: "https://linkedin.com/in/mohamad-saadat-7b293333a",
      },
      { label: "GITHUB", value: "github.com/mohamadsadaat", href: "https://github.com/mohamadsadaat" },
      { label: "GITLAB", value: "gitlab.com/mohamadsadaat", href: "https://gitlab.com/mohamadsadaat" },
    ],
    footer: "Mohammed Jamil Saadat — 2026",
  },
};

export const TERM_LINES: string[] = [
  "$ npm install --save-dev @saadat/portfolio",
  "> resolving dependencies...",
  "> compiling components (react, next, laravel)...",
  "> optimizing for RTL and a11y...",
  "root@saadat:~$ starting server",
];

export const FLY_WORDS: string[] = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Laravel",
  "FastAPI",
  "Zustand",
  "React Query",
  "Framer Motion",
  "Three.js",
  "Jest",
  "Playwright",
  "a11y",
  "RTL-first",
  "PHP",
  "Python",
];
