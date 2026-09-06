import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, IBM_Plex_Sans_Arabic, JetBrains_Mono, Rakkas } from "next/font/google";
import "./globals.css";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-mono",
});

const sansAr = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  variable: "--font-sans-ar",
});

const sansEn = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  variable: "--font-sans-en",
});

const display = Rakkas({
  subsets: ["arabic"],
  weight: "400",
  display: "swap",
  variable: "--font-display",
});

const SITE_URL = "https://mohamadsadaat.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "محمد جميل سعادات — مطوّر ويب متكامل (Full-Stack)",
    template: "%s | محمد جميل سعادات",
  },
  description:
    "بورتفوليو محمد جميل سعادات، مهندس برمجيات متكامل (Full-Stack) — React و Next.js و TypeScript للواجهات، و Laravel و PHP و MySQL للأنظمة الخلفية، مع Docker و CI/CD للنشر. Full-stack developer portfolio: React, Next.js, Laravel, Docker.",
  keywords: [
    "محمد جميل سعادات",
    "مطور ويب",
    "مبرمج",
    "Full-Stack Developer",
    "Mohammed Jamil Saadat",
    "React",
    "Next.js",
    "Laravel",
    "PHP",
    "TypeScript",
    "Docker",
    "Damascus",
    "Syria",
  ],
  authors: [{ name: "Mohammed Jamil Saadat", url: SITE_URL }],
  creator: "Mohammed Jamil Saadat",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ar_SY",
    alternateLocale: ["en_US"],
    url: SITE_URL,
    siteName: "Mohammed Jamil Saadat",
    title: "محمد جميل سعادات — مطوّر ويب متكامل (Full-Stack)",
    description:
      "بورتفوليو مهندس برمجيات متكامل — React / Next.js للواجهات، Laravel / PHP للأنظمة الخلفية، Docker و CI/CD للنشر.",
    images: [{ url: "/profile-portrait.jpg", width: 1200, height: 630, alt: "Mohammed Jamil Saadat" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "محمد جميل سعادات — مطوّر ويب متكامل (Full-Stack)",
    description: "بورتفوليو مهندس برمجيات متكامل — React / Next.js / Laravel / Docker.",
    images: ["/profile-portrait.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export const viewport: Viewport = {
  themeColor: "#040D18",
  colorScheme: "dark",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mohammed Jamil Saadat",
  alternateName: "محمد جميل سعادات",
  jobTitle: "Full-Stack Developer",
  email: "mailto:androo2050@gmail.com",
  telephone: "+963958389235",
  url: SITE_URL,
  image: `${SITE_URL}/profile-portrait.jpg`,
  sameAs: [
    "https://github.com/mohamadsadaat",
    "https://gitlab.com/mohamadsadaat",
    "https://linkedin.com/in/mohamad-saadat-7b293333a",
  ],
  worksFor: { "@type": "Organization", name: "Connect Digital Agency" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Damascus University" },
  knowsAbout: ["React", "Next.js", "TypeScript", "Laravel", "PHP", "MySQL", "Docker", "CI/CD", "REST APIs"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${mono.variable} ${sansAr.variable} ${sansEn.variable} ${display.variable}`}
    >
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
