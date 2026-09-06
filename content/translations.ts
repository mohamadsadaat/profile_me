export type Lang = "ar" | "en";

export interface NavItem {
  label: string;
  href: string;
}

export interface JourneyMilestone {
  year: string;
  date: string;
  type: "education" | "skills" | "job" | "project";
  title: string;
  org?: string;
  desc?: string;
  items?: string[];
  img?: string;
  link?: string;
  linkLabel?: string;
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
  journeyTag: string;
  journeyTitle: string;
  journeyLead: string[];
  journey: JourneyMilestone[];
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
      { label: "مسيرتي", href: "#journey" },
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
    photoHint: "",
    photo: "/profile-portrait.jpg",
    journeyTag: "مسيرتي",
    journeyTitle: "مسيرتي",
    journeyLead: [
      "مهندس برمجيات متكامل (Full-Stack) أعمل حالياً في Connect Digital Agency، حيث أبني منتجات ويب من الألف إلى الياء — من واجهات React/Next.js عالية الأداء إلى أنظمة خلفية إنتاجية بـ Laravel/PHP ونشرها.",
      "أتولّى مشاريع بشكل كامل: تصميم REST APIs، بناء معماريات خدمات متعددة الطبقات، ونشر حاويات مع CI/CD، إضافة إلى تحويل تصاميم UI/UX إلى مكوّنات واجهة نظيفة وقابلة لإعادة الاستخدام.",
      "أؤمن بالكود النظيف ومبادئ SOLID، مع خبرة مباشرة عبر كامل الطبقات — من تصميم قواعد البيانات إلى المصادقة متعددة العملاء عبر JWT وحتى البنية التحتية الإنتاجية.",
    ],
    journey: [
      {
        year: "٢٠٢٣",
        date: "٢٠٢٣",
        type: "education",
        title: "بداية الدبلوم",
        org: "المعهد التقني لهندسة الحاسوب — جامعة دمشق",
        desc: "أول خطوة بالمسيرة: الالتحاق بدبلوم هندسة البرمجيات، والانطلاق بتعلّم أساسيات البرمجة.",
        items: ["C#", "HTML", "CSS", "JavaScript", "OOP"],
      },
      {
        year: "٢٠٢٤",
        date: "٢٠٢٤",
        type: "skills",
        title: "الانتقال لتطوير الواجهة الخلفية",
        desc: "التعمّق بـ PHP وLaravel، وبناء أول مشاريع خلفية حقيقية بقاعدة بيانات وهيكلية MVC.",
        items: ["Laravel", "PHP 8.x", "MySQL", "Blade", "Repository Pattern"],
      },
      {
        year: "٢٠٢٥",
        date: "كانون الثاني – أيار ٢٠٢٥",
        type: "project",
        title: "ev-power — مشروع التخرج",
        desc: "نظام حجز آلي بالكامل لمحطات شحن السيارات الكهربائية بـ Laravel، مع أتمتة معقّدة للجدولة، التحقق من الزيارات، ومنع تعارض الأوقات، ولوحة إدارة بصلاحيات Spatie.",
        items: ["Laravel", "Service Classes", "Spatie"],
        img: "/ev-power-card.jpeg",
      },
      {
        year: "٢٠٢٥",
        date: "تموز ٢٠٢٥",
        type: "education",
        title: "التخرّج",
        org: "هندسة برمجيات — جامعة دمشق (٢٠٢٣–٢٠٢٥)",
        desc: "إنهاء دبلوم هندسة البرمجيات رسمياً.",
      },
      {
        year: "٢٠٢٥",
        date: "أيلول ٢٠٢٥ — آب ٢٠٢٦",
        type: "job",
        title: "مطوّر واجهات أمامية (Front-End Developer)",
        org: "Tkram Ride",
        items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      },
      {
        year: "٢٠٢٥–٢٠٢٦",
        date: "كانون الأول ٢٠٢٥ — آذار ٢٠٢٦",
        type: "job",
        title: "مطوّر متكامل (Full-Stack Developer)",
        org: "MSA DataX — برلين، عن بعد",
        items: ["WebSockets", "RAG", "Faster-Whisper", "Hugging Face"],
      },
      {
        year: "٢٠٢٦",
        date: "نيسان – أيار ٢٠٢٦",
        type: "project",
        title: "متجر ملابس أطفال إلكتروني",
        desc: "متجر إلكتروني لملابس الأطفال بـ Next.js وLaravel، مُهيّأ لحركة زوار عالية مع استعلامات قاعدة بيانات وتحميل صور محسّنة لقابلية التوسّع.",
        items: ["Next.js", "Laravel", "e-commerce"],
        img: "/kidsstore_categories.png",
        link: "http://82.165.109.111",
        linkLabel: "زيارة الموقع",
      },
      {
        year: "٢٠٢٦",
        date: "أيار ٢٠٢٦ — حتى الآن",
        type: "job",
        title: "مطوّر متكامل (Full-Stack Developer)",
        org: "Connect Digital Agency",
        items: ["Docker", "CI/CD", "JWT", "Spatie", "OpenAPI/Swagger", "Pest"],
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
        img: "/kidsstore_categories.png",
        link: "http://82.165.109.111",
        linkLabel: "زيارة الموقع",
      },
      {
        status: "منشور",
        name: "نظام حجز محطات شحن السيارات الكهربائية (ev-power)",
        desc: "نظام حجز آلي بالكامل لمحطات شحن السيارات الكهربائية بـ Laravel، مع أتمتة معقّدة للجدولة، التحقق من الزيارات، ومنع تعارض الأوقات، ولوحة إدارة بصلاحيات Spatie.",
        tags: ["Laravel", "Service Classes", "Spatie"],
        img: "/ev-power-card.jpeg",
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
      { label: "Journey", href: "#journey" },
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
    journeyTag: "MY JOURNEY",
    journeyTitle: "My Journey",
    journeyLead: [
      "Full-Stack Software Engineer currently building end-to-end web products at Connect Digital Agency — from high-performance React/Next.js interfaces to production Laravel/PHP backends and their deployment.",
      "Comfortable owning a project fully: architecting REST APIs, designing layered service architectures, and shipping containerized deployments with CI/CD, as well as translating UI/UX designs into clean, reusable front-end components.",
      "Advocate for clean code and SOLID principles, with direct experience across the full stack — from database schema to JWT-based multi-client authentication to production infrastructure.",
    ],
    journey: [
      {
        year: "2023",
        date: "2023",
        type: "education",
        title: "Started the Diploma",
        org: "Technical Institute of Computer Engineering — Damascus University",
        desc: "The first step of the journey: enrolling in a Software Engineering diploma and starting with programming fundamentals.",
        items: ["C#", "HTML", "CSS", "JavaScript", "OOP"],
      },
      {
        year: "2024",
        date: "2024",
        type: "skills",
        title: "Moving into Backend Development",
        desc: "Diving into PHP and Laravel, and building the first real backend projects with a database and MVC structure.",
        items: ["Laravel", "PHP 8.x", "MySQL", "Blade", "Repository Pattern"],
      },
      {
        year: "2025",
        date: "Jan – May 2025",
        type: "project",
        title: "ev-power — Graduation Project",
        desc: "A fully automated booking system for EV charging stations using Laravel, with complex backend automation for scheduling, visit verification, and real-time conflict checking, plus an admin panel with Spatie role-based access control.",
        items: ["Laravel", "Service Classes", "Spatie"],
        img: "/ev-power-card.jpeg",
      },
      {
        year: "2025",
        date: "July 2025",
        type: "education",
        title: "Graduated",
        org: "Software Engineering — Damascus University (2023–2025)",
        desc: "Officially completed the Software Engineering diploma.",
      },
      {
        year: "2025",
        date: "Sep 2025 — Aug 2026",
        type: "job",
        title: "Front-End Developer",
        org: "Tkram Ride",
        items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      },
      {
        year: "2025–2026",
        date: "Dec 2025 — Mar 2026",
        type: "job",
        title: "Full-Stack Developer",
        org: "MSA DataX — Berlin, remote",
        items: ["WebSockets", "RAG", "Faster-Whisper", "Hugging Face"],
      },
      {
        year: "2026",
        date: "Apr – May 2026",
        type: "project",
        title: "Children's Clothing E-Commerce Platform",
        desc: "A children's clothing e-commerce storefront using Next.js and Laravel, engineered for high visitor traffic with optimized database queries and image loading for scalability.",
        items: ["Next.js", "Laravel", "e-commerce"],
        img: "/kidsstore_categories.png",
        link: "http://82.165.109.111",
        linkLabel: "Visit site",
      },
      {
        year: "2026",
        date: "May 2026 — present",
        type: "job",
        title: "Full-Stack Developer",
        org: "Connect Digital Agency",
        items: ["Docker", "CI/CD", "JWT", "Spatie", "OpenAPI/Swagger", "Pest"],
      },
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
        img: "/kidsstore_categories.png",
        link: "http://82.165.109.111",
        linkLabel: "Visit site",
      },
      {
        status: "SHIPPED",
        name: "Power Station Charging Booking System (ev-power)",
        desc: "A fully automated booking system for EV charging stations using Laravel, with complex backend automation for scheduling, visit verification, and real-time conflict checking, plus an admin panel with Spatie role-based access control.",
        tags: ["Laravel", "Service Classes", "Spatie"],
        img: "/ev-power-card.jpeg",
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
