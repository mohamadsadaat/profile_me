# # Black Hole Portfolio Journey

_Started 2026-08-31 12:08 UTC_

---

## User

Build me a dramatic, cinematic personal portfolio website for a full-stack web developer, themed around a deep-space black hole. This is the hero of the whole design — everything orbits it.

Bilingual (important): The site must support both Arabic and English, with a clear language toggle in the navigation. Switching language must also switch layout direction automatically — RTL for Arabic, LTR for English — and swap all text content. Default to Arabic on first load. Use a strong Arabic font pairing (display serif like "Aref Ruqaa" for headings, "IBM Plex Sans Arabic" for body) and a matching clean pairing for English.

Loading page (critical): Start with a full-screen loading sequence where scattered particles gradually converge to form a black hole as the load percentage climbs from 0 to 100. When complete, the black hole gently expands/dissolves into the hero. Make this feel premium, not a plain spinner.

Hero: A central 3D black hole with a glowing accretion disk, surrounded by a deep starfield. The whole scene reacts to mouse movement with deep parallax. Use Three.js / React Three Fiber.

Profile photo (important): Include a dedicated placeholder for a personal profile photo, styled to fit the cosmic theme — for example a circular framed portrait that sits like a planet in orbit near the hero or About section, with a soft glowing ring around it. Leave it as an easily-replaceable image placeholder so I can upload my own photo.

3D throughout (I want LOTS of motion): Mix multiple 3D elements in one coherent universe — the black hole, orbiting abstract geometric shapes, drifting particle fields, and a star mesh. As the user scrolls, make it feel like flying deeper into space; sections emerge from depth. Keep all motion tied to this single cosmic logic so it stays professional and cohesive, never chaotic.

Color palette (fully coordinated): Deep space black background, galactic violet/indigo mid-tones, and a warm gold-orange glow from the accretion disk as the accent. Everything harmonized.

Priorities: Maximum 3D + motion, but balanced with performance and a professional, cohesive feel. Respect reduced-motion preferences.

Sections & real content (provide both Arabic and English for each):

Hero: محمد جميل سعادات / Mohammed Jamil Saadat — Full-Stack Developer (React · Next.js · Laravel). Tagline about building fast, accessible, RTL-first Arabic web experiences.
About (نبذة / About): Software Engineering Diploma, Damascus University (2023–2025). Currently a Front-End Developer trainee at Connect Digital Agency. Passionate about the intersection of performance, accessibility, and correct RTL support. Include the circular profile-photo placeholder here or in the hero.
Skills (المهارات / Skills): Frontend — React, Next.js, TypeScript, Tailwind CSS, Sass, Zustand, React Query, Framer Motion, Three.js. Backend — Laravel/PHP, FastAPI (Python). Testing — Jest, React Testing Library, Playwright. Performance — Core Web Vitals, accessibility (a11y), RTL-first design.
Experience (الخبرة / Experience): Front-End Developer Trainee at Connect Digital Agency (May 2026–present) · QA/Testing Trainee at Snam, Saudi Arabia (Mar–Apr 2026) · Junior Developer at MSA DataX, Berlin-remote (Dec 2025–Mar 2026) · Front-End Developer at Tkram Ride (Sep 2025–Aug 2026).
Projects (مشاريع / Projects): Studio — an RTL-first Arabic website-builder SaaS (Wix/Webflow-style, for Arabic-speaking small businesses), currently building. Laqta Store — a full-stack Laravel + Next.js e-commerce platform with order delivery and tracking. Children's clothing store — a freelance e-commerce build from scratch.
Contact (تواصل / Contact): Email — androo2050@gmail.com · Phone — 0958389235 · LinkedIn — linkedin.com/in/mohamad-saadat-7b293333a

Do not include a home address or city. Make the black-hole loading page and hero the signature, memorable moments.

## Assistant

_[tool: list_files]_

Design system project is empty, so I'll build a cohesive cosmic direction from scratch.

_[tool: dc_write]_

_[tool: ready_for_verification]_

Built as one Design Component: black-hole loading sequence (particles spiral into an accretion ring as 0→100 climbs, then expands into the hero), a Three.js universe with event horizon, three counter-rotating accretion disks, photon ring, starfield/violet/gold-dust layers, and nine orbiting wireframe solids — camera flies deeper as you scroll, with mouse parallax and reduced-motion respected.

Bilingual with Arabic default; the EN/عربي toggle swaps content and direction. Profile photo placeholder is the orbiting circular frame in About — drop a `profile.jpg` into the project root to fill it.

## User

Found issues — fixing…

## Assistant

_[tool: dc_html_str_replace]_

Now a load guard so the scene initializes whenever THREE arrives.

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: ready_for_verification]_

Switched three.js to jsDelivr with a unpkg fallback injection, plus a polling guard so the scene starts as soon as THREE resolves.

## User

Found issues — fixing…

## Assistant

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

Adding a localized scrim behind the hero copy.

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: ready_for_verification]_

Raised the black hole above the hero text band (it settles back as you scroll), pushed orbiting solids out of the central column, added a soft scrim behind the hero copy, and delayed the fallback CDN so three.js only loads once.

## User

Found issues — fixing…

## Assistant

Root cause: the loader's progress and dismissal are both chained off requestAnimationFrame, so in any environment where rAF is throttled the overlay never clears.

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: ready_for_verification]_

The loader now runs on timers (interval for the count, timeout for the dissolve) with rAF only painting the canvas, so the site can never stay gated behind the overlay.

## User

Found issues — fixing…

## Assistant

Root cause: my brace-removal edit left a stray `}` in `tick`, so the class fails to eval.

_[tool: dc_js_str_replace]_

_[tool: ready_for_verification]_

Removed the stray brace; the logic class parses again.

## User

Fix this design so it publishes cleanly: `Saadat Portfolio.dc.html`

## Assistant

_[tool: dc_js_str_replace]_

_[tool: run_script]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_js_str_replace]_

Now the bundler thumbnail.

_[tool: dc_html_str_replace]_

_[tool: ready_for_verification]_

Fixed for publishing: created a real `profile.png` placeholder (the unresolved asset — replace that file with your photo), removed the JS-injected fallback CDN script the bundler couldn't see, and added a bundler thumbnail splash.

Click **Publish as artifact** in the Share menu again to re-check.

## User

I'm uploading three images with this message: (1) a screenshot of the Raumstudio project, (2) a screenshot of the SK Restaurant project, and (3) my personal profile photo. Use them as described below.

1) Add my profile photo:
Place my uploaded personal photo into the circular profile placeholder in the hero/About section. Keep the cosmic styling — a circular frame with a soft glowing ring around it, sitting like a planet in orbit. Make sure it looks sharp and centered on all screen sizes.

2) Add two new front-end projects to the Projects section. Each project card needs its screenshot image, a short description in both Arabic and English, stack tags, and a "زيارة الموقع / Visit site" button that opens the live link in a new tab.

Project 1 — Raumstudio BenTo'o

Image: the Raumstudio screenshot I uploaded
Type: Front-End · Landing Page
AR: صفحة هبوط احترافية لشركة أرضيات وباركيه في برلين — تصميم أنيق ودافئ يركّز على الحرفية والثقة.
EN: A polished landing page for a Berlin flooring & parquet craftsman studio — warm, elegant design focused on craftsmanship and trust.
Stack tags: React · Next.js · Responsive
Live link: https://raumstudio-bentoo-website.vercel.app/

Project 2 — SK Restaurant

Image: the SK Restaurant screenshot I uploaded
Type: Front-End · Fine Dining
AR: موقع مطعم فاخر في برلين مع نظام حجوزات وقائمة طعام وتبديل لغة — أجواء داكنة وذهبية أنيقة.
EN: A fine-dining restaurant website in Berlin with reservations, a menu, and language switching — an elegant dark-and-gold atmosphere.
Stack tags: React · Next.js · i18n
Live link: https://skresturant.vercel.app/

Styling: Match the existing cosmic black-hole theme (glowing borders, gold accent). Each project card shows the screenshot with a subtle hover effect. Keep both Arabic and English versions consistent with the site's existing language toggle, and keep everything working in both RTL and LTR.

## User

I'm uploading three images with this message: (1) a screenshot of the Raumstudio project, (2) a screenshot of the SK Restaurant project, and (3) my personal profile photo. Use them as described below.

1) Add my profile photo:
Place my uploaded personal photo into the circular profile placeholder in the hero/About section. Keep the cosmic styling — a circular frame with a soft glowing ring around it, sitting like a planet in orbit. Make sure it looks sharp and centered on all screen sizes.

2) Add two new front-end projects to the Projects section. Each project card needs its screenshot image, a short description in both Arabic and English, stack tags, and a "زيارة الموقع / Visit site" button that opens the live link in a new tab.

Project 1 — Raumstudio BenTo'o

Image: the Raumstudio screenshot I uploaded
Type: Front-End · Landing Page
AR: صفحة هبوط احترافية لشركة أرضيات وباركيه في برلين — تصميم أنيق ودافئ يركّز على الحرفية والثقة.
EN: A polished landing page for a Berlin flooring & parquet craftsman studio — warm, elegant design focused on craftsmanship and trust.
Stack tags: React · Next.js · Responsive
Live link: https://raumstudio-bentoo-website.vercel.app/

Project 2 — SK Restaurant

Image: the SK Restaurant screenshot I uploaded
Type: Front-End · Fine Dining
AR: موقع مطعم فاخر في برلين مع نظام حجوزات وقائمة طعام وتبديل لغة — أجواء داكنة وذهبية أنيقة.
EN: A fine-dining restaurant website in Berlin with reservations, a menu, and language switching — an elegant dark-and-gold atmosphere.
Stack tags: React · Next.js · i18n
Live link: https://skresturant.vercel.app/

Styling: Match the existing cosmic black-hole theme (glowing borders, gold accent). Each project card shows the screenshot with a subtle hover effect. Keep both Arabic and English versions consistent with the site's existing language toggle, and keep everything working in both RTL and LTR.

## User

Fix this design so it publishes cleanly: `Saadat Portfolio.dc.html`

## Assistant

_[tool: dc_html_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: ready_for_verification]_

The two project screenshots were only reachable as strings in code, so I registered them as declared resource dependencies and the cards now resolve them through `window.__resources` (falling back to the local path in preview).

Click **Publish as artifact** in the Share menu again to re-check.

## User

Found issues — fixing…

## User

Found issues — fixing…

## Assistant

_[tool: run_script]_

_[tool: run_script]_

_[tool: run_script]_

Now point the source at the optimized files and drop the originals.

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: delete_file]_

_[tool: ready_for_verification]_

Recompressed all three images (cards 1100px ≈90/62 KB, portrait 700px ≈50 KB) and repointed the source and dependency metas at them; originals removed.

Click **Publish as artifact** in the Share menu again to re-check.

## User

Found issues — fixing…

## Assistant

_[tool: dc_html_str_replace]_

_[tool: ready_for_verification]_

The hole itself is fetched at parse time; switching the src to be assigned imperatively.

_[tool: dc_html_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: ready_for_verification]_

The card screenshots now carry `data-src` and get their real `src` assigned once values resolve, so no request is ever made for the unresolved placeholder.

Click **Publish as artifact** in the Share menu again to re-check.

## User

Found issues — fixing…

## Assistant

Root cause: the renderer's buffer size is set once from `window.innerWidth/Height`, so a zero-size measurement at init is never corrected. Making it measure the canvas per frame.

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: ready_for_verification]_

The renderer now measures the canvas itself every frame (plus a ResizeObserver) and re-sizes whenever the buffer differs, so a zero-size init can no longer leave the scene blank.

## User

<system-info comment="Only acknowledge these if relevant">
Project title is now "Black Hole Portfolio Cosmic"
Project currently has 6 file(s)
User is viewing file: Saadat Portfolio.dc.html
Current date is now September 4, 2026
</system-info>

<pasted_text name="Pasted text (28 lines)">
Build me a professional personal portfolio website for a full-stack web developer, with a Matrix-style digital/code aesthetic as the overall theme — a subtle animated grid, faint falling code characters, and a dark tech atmosphere throughout the site (not just the hero).

Bilingual (important): Support both Arabic and English with a language toggle in the navigation. Switching language also switches layout direction — RTL for Arabic, LTR for English — and swaps all text. Default to Arabic on load. Use a strong Arabic font pairing (a display font for headings, "IBM Plex Sans Arabic" for body) and a matching monospace/clean pairing for English headings to reinforce the code feel.

Loading page: A code-terminal-style loading sequence — lines of code or a progress readout typing themselves out as the percentage climbs to 100%, then transitioning smoothly into the hero.

Hero: Clean, confident intro with my name and role, set against the Matrix-style digital grid background with subtle depth/parallax on mouse move. Include a circular profile-photo placeholder (I will upload my own photo) styled to fit the tech theme — e.g. a glowing thin frame, like a scanned ID or terminal avatar.

Skills section (the signature moment — important): As the user scrolls into this section, skill words (React, Next.js, TypeScript, Laravel, etc.) fly toward the viewer from a deep vanishing point in the center of the screen, with real 3D perspective — they start tiny and far away, grow larger with true depth as they approach, and pass by/fade near the viewer's eye. This should feel physically three-dimensional (not just a 2D scale animation), tied to scroll position. Keep this effect contained to this section — the rest of the site stays calmer and more professional.

Color palette: Deep black/near-black background, matrix green as the primary accent for code/grid elements, with a secondary cool cyan or electric blue for highlights and buttons — fully coordinated, not neon-overload.

General motion: Smooth scroll-reveal for other sections (fade + slight rise), professional and not distracting — save the big dramatic 3D moment for the skills section specifically.

Sections &amp; real content (provide both Arabic and English for each):

Hero: محمد جميل سعادات / Mohammed Jamil Saadat — Full-Stack Developer (React · Next.js · Laravel). Tagline about building fast, accessible, RTL-first Arabic web experiences.
About (نبذة / About): Software Engineering Diploma, Damascus University (2023–2025). Currently a Front-End Developer trainee at Connect Digital Agency. Passionate about the intersection of performance, accessibility, and correct RTL support.
Skills (المهارات / Skills — the 3D flying-words section): Frontend — React, Next.js, TypeScript, Tailwind CSS, Sass, Zustand, React Query, Framer Motion, Three.js. Backend — Laravel/PHP, FastAPI (Python). Testing — Jest, React Testing Library, Playwright. Performance — Core Web Vitals, accessibility (a11y), RTL-first design.
Experience (الخبرة / Experience): Front-End Developer Trainee at Connect Digital Agency (May 2026–present) · QA/Testing Trainee at Snam, Saudi Arabia (Mar–Apr 2026) · Junior Developer at MSA DataX, Berlin-remote (Dec 2025–Mar 2026) · Front-End Developer at Tkram Ride (Sep 2025–Aug 2026).
Projects (مشاريع / Projects): Show each with its screenshot (I'm uploading them), a short description in Arabic and English, stack tags, and a "زيارة الموقع / Visit site" button linking out in a new tab.
Studio — an RTL-first Arabic website-builder SaaS (Wix/Webflow-style, for Arabic-speaking small businesses), currently building. No live link yet.
Raumstudio BenTo'o — a polished landing page for a Berlin flooring &amp; parquet craftsman studio. Stack: React · Next.js · Responsive. Link: https://raumstudio-bentoo-website.vercel.app/
SK Restaurant — a fine-dining restaurant website in Berlin with reservations, menu, and language switching. Stack: React · Next.js · i18n. Link: https://skresturant.vercel.app/
Laqta Store — a full-stack e-commerce platform with order delivery and tracking (I own backend + server deployment). No live link yet.
Contact (تواصل / Contact): Email — androo2050@gmail.com · Phone — 0958389235 · LinkedIn — linkedin.com/in/mohamad-saadat-7b293333a

Do not include a home address or city. Keep the whole site professional and cohesive — the Matrix theme should feel like a refined developer aesthetic, not a gimmick, with the 3D flying skills section as the one big "wow" moment.
</pasted_text>

<!-- The user explicitly selected the following skills for this project, as attachments to their message. These are not optional context — they define how you work. Use them. -->
<attached-skill name="Design System (design system)">
[Design System] This project uses the **Design System** design system. This is a binding choice for visual style — every visual must follow it. Don't invent colors, type, spacing, or components not grounded here.

Scope: the design system is a visual style reference only. Its guide may describe example products, brands, or people that are unrelated to the user and unrelated to the subject of this conversation. Never treat anything in the design system as a fact about the user, their work, or the topic they asked about.

    Explore it to find what you need:
    - Always copy out the fonts and colors you need
    - For prototypes and designs, always copy out any relevant components
    - If the design system contains existing mocks of products, and you were asked to design or prototype something similar, copy and fork those mocks to start your design. This helps you make high-quality designs.

    Explore it quickly to find relevant UI kits (e.g. mocks of existing products you can copy and fork)

Full system at `/projects/7f20d87e-9696-41a9-8e05-84734fed0d59/`. Before producing any visuals, explore it: call `list_files("/projects/7f20d87e-9696-41a9-8e05-84734fed0d59/")` to see the structure, then `read_file` the README/base.md or whatever index file it has. Don't guess at the design system's contents.

CSS tokens: the guide may describe tokens in prose, but the exact `--*` names are defined in the design system's stylesheet(s). Before writing any `var(--*)`, look up the real name in the design system's `.css` files (`list_files` + `read_file` under `/projects/7f20d87e-9696-41a9-8e05-84734fed0d59/`). Never guess a token name — an unresolved `var()` silently falls back to the browser default.

For assets and UI kits beyond the guide: `read_file("/projects/7f20d87e-9696-41a9-8e05-84734fed0d59/<path>")` and `copy_files` to bring them into the current project.
</attached-skill>

## Assistant

_[tool: list_files]_

_[tool: dc_write]_

_[tool: ready_for_verification]_

New Matrix-themed portfolio built as `Matrix Portfolio.dc.html`: terminal-style loading sequence, ambient matrix-rain + parallax grid background site-wide, hero with circular photo placeholder, a scroll-driven 3D flying-skills section (CSS `perspective`/`translate3d`, contained to that section), calmer scroll-reveal elsewhere, experience timeline, and 4 project cards (Studio/Laqta as no-link "building"/"backend" panels, Raumstudio/SK Restaurant with your screenshots and live "Visit site" links). Arabic-default bilingual toggle with RTL/LTR swap throughout.

## User

Found issues — fixing…

## Assistant

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: ready_for_verification]_

Fixed: `wordPhases` now initializes lazily inside `computeFlyingWords()` instead of `componentDidMount`, so the first render no longer throws before content resolves.

## User

Found issues — fixing…

## Assistant

Switching grid parallax to direct DOM ref writes instead of forceUpdate, dropping the per-frame full-tree re-render.

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

Also throttling the matrix-rain canvas draw, since it was flagged as contributing to the saturation.

_[tool: dc_js_str_replace]_

_[tool: ready_for_verification]_

Fixed: parallax and flying-word animation now write directly to DOM refs each frame instead of calling `forceUpdate()` on the whole tree, and matrix-rain draws capped to ~15fps — the per-frame full-page re-render that was saturating the main thread is gone.

## User

Found issues — fixing…

## Assistant

_[tool: show_html]_

Root cause: two `requestAnimationFrame` loops (parallax tick, matrix-rain draw) reschedule themselves forever, continuously invalidating paint every frame — the automation's frame-locked evaluate/screenshot step never gets a quiet frame to attach to. Removing both infinite rAF loops.

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: ready_for_verification]_

Root cause: two infinite `requestAnimationFrame` loops (parallax tick, matrix-rain draw) kept re-invalidating paint every single frame forever, so the automation's frame-locked evaluate/screenshot never found a quiet frame to attach to. Replaced both: parallax now updates directly from the `pointermove` event (no loop), matrix-rain runs on a bounded `setInterval` instead of rAF, and scroll handling is rAF-coalesced to one update per frame instead of firing per event.

## User

Found issues — fixing…

## User

Found issues — fixing…

