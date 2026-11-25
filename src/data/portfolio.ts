import type { PortfolioData, ProjectItem } from "../types/portfolio";

const RAW_PROJECTS: Array<{
  id: string;
  name: string;
  descriptionEn: string;
  descriptionFa: string;
  link: string;
  tags: string[];
  category: ProjectItem["category"];
  featured?: boolean;
}> = [
  {
    id: "dopile",
    name: "Dopile",
    descriptionEn:
      "A secure, self-hosted LAN task manager powered by FastAPI, SQLite, and PWA — designed to run on Android via Termux and Linux.",
    descriptionFa:
      "مدیریت وظایف امن و خودمیزبان در شبکه محلی با FastAPI، SQLite و PWA — طراحی‌شده برای اجرا روی اندروید از طریق Termux و لینوکس.",
    link: "https://github.com/ishantia/Dopile",
    tags: ["FastAPI", "React", "PWA", "Python", "Android", "Self-Hosted"],
    category: "python",
    featured: true,
  },
  {
    id: "telegram-workers-rs",
    name: "telegram-workers-rs",
    descriptionEn:
      "A lightweight Telegram Bot API SDK for Cloudflare Workers, written in Rust and compiled to WebAssembly (Wasm) with zero cold starts.",
    descriptionFa:
      "کیت توسعه سبک Telegram Bot API برای Cloudflare Workers، نوشته‌شده با Rust و کامپایل‌شده به WebAssembly بدون تأخیر شروع سرد.",
    link: "https://github.com/ishantia/telegram-workers-rs",
    tags: ["Rust", "Wasm", "Cloudflare Workers", "Telegram API"],
    category: "python",
    featured: true,
  },
  {
    id: "klee-tracker",
    name: "klee-tracker",
    descriptionEn:
      "Automated serverless Telegram bot that tracks and alerts on official Fastboot and Recovery firmware releases for POCO X8 Pro (klee).",
    descriptionFa:
      "ربات تلگرام خودکار و بدون‌سرور برای پایش و اطلاع‌رسانی انتشار رام‌های رسمی Fastboot و Recovery گوشی POCO X8 Pro.",
    link: "https://github.com/ishantia/klee-tracker",
    tags: ["Python", "Telegram", "Bot", "Xiaomi"],
    category: "python",
    featured: true,
  },
  {
    id: "android-root-dhcp-manager",
    name: "android-root-dhcp-manager",
    descriptionEn:
      "A terminal-based (TUI/CLI) Android Root DHCP and IP address manager designed for Termux on rooted Android devices.",
    descriptionFa:
      "ابزار ترمینالی (TUI/CLI) برای مدیریت DHCP و آدرس IP در دستگاه‌های اندرویدی روت‌شده از طریق Termux.",
    link: "https://github.com/ishantia/android-root-dhcp-manager",
    tags: ["Python", "Android", "Root", "Networking", "Termux"],
    category: "systems",
    featured: true,
  },
  {
    id: "commitverse",
    name: "CommitVerse",
    descriptionEn:
      "Android GitHub contribution visualizer and commit tracker app built with Kotlin.",
    descriptionFa:
      "اپلیکیشن اندرویدی نمایشگر مشارکت‌ها و پیگیری کامیت‌های گیت‌هاب ساخته‌شده با Kotlin.",
    link: "https://github.com/ishantia/CommitVerse",
    tags: ["Kotlin", "Android", "GitHub API"],
    category: "systems",
    featured: true,
  },
  {
    id: "dylancafe-v2",
    name: "DylanCafe-v2",
    descriptionEn:
      "Online cafe ordering system integrated with Telegram bots for instant order dispatch and notifications.",
    descriptionFa:
      "سیستم سفارش آنلاین کافه متصل به ربات تلگرام برای ارسال فوری سفارش‌ها و اعلان‌ها.",
    link: "https://github.com/ishantia/DylanCafe-v2",
    tags: ["JavaScript", "Online Menu", "Telegram", "Bot"],
    category: "web",
    featured: true,
  },
  {
    id: "cashio",
    name: "Cashio",
    descriptionEn:
      "Personal finance and cash expense management mobile app built with Flutter and Dart.",
    descriptionFa:
      "اپلیکیشن موبایل مدیریت مالی شخصی و هزینه‌های نقدی ساخته‌شده با Flutter و Dart.",
    link: "https://github.com/ishantia/Cashio",
    tags: ["Flutter", "Dart", "Mobile", "Finance"],
    category: "systems",
    featured: true,
  },
  {
    id: "dnsly",
    name: "DNSly",
    descriptionEn:
      "Free DNS management platform built with PHP and modern networking protocols.",
    descriptionFa:
      "پلتفرم رایگان مدیریت DNS ساخته‌شده با PHP و پروتکل‌های شبکه‌ای مدرن.",
    link: "https://github.com/ishantia/DNSly",
    tags: ["PHP", "DNS", "Networking", "Web"],
    category: "web",
    featured: true,
  },
  {
    id: "device-daria-hormoz-kernel",
    name: "device_daria_hormoz-kernel",
    descriptionEn: "Android kernel source for the Daria Bond II.",
    descriptionFa: "سورس کد کرنل اندروید برای گوشی Daria Bond II.",
    link: "https://github.com/ishantia/device_daria_hormoz-kernel",
    tags: ["Android", "Kernel"],
    category: "systems",
    featured: true,
  },
  {
    id: "dylancafe-v1",
    name: "DylanCafe-v1",
    descriptionEn:
      "Online interactive cafe menu application built with modern web technologies.",
    descriptionFa:
      "اپلیکیشن منوی آنلاین تعاملی کافه ساخته‌شده با فناوری‌های مدرن وب.",
    link: "https://github.com/ishantia/DylanCafe-v1",
    tags: ["JavaScript", "Online Menu", "Web"],
    category: "web",
  },
  {
    id: "google-keep-exporter",
    name: "google-keep-exporter",
    descriptionEn:
      "Python utility to parse, clean, and organize Google Keep Takeout notes and data exports.",
    descriptionFa:
      "ابزار پایتون برای پردازش، پاک‌سازی و سازماندهی یادداشت‌های خروجی Google Keep Takeout.",
    link: "https://github.com/ishantia/google-keep-exporter",
    tags: ["Python", "Automation", "Tools"],
    category: "python",
  },
  {
    id: "vpn-lop",
    name: "VPN-LOP",
    descriptionEn:
      "Modern landing page and client portal for VPN service management.",
    descriptionFa: "صفحه فرود مدرن و پنل کاربری برای مدیریت سرویس VPN.",
    link: "https://github.com/ishantia/VPN-LOP",
    tags: ["TypeScript", "React", "Web", "VPN"],
    category: "web",
  },
  {
    id: "dopile-linux",
    name: "Dopile-linux",
    descriptionEn:
      "Linux desktop companion and lightweight client build for Dopile task manager.",
    descriptionFa: "نسخه دسکتاپ لینوکس و کلاینت سبک برای مدیر وظایف Dopile.",
    link: "https://github.com/ishantia/Dopile-linux",
    tags: ["TypeScript", "Linux", "Desktop"],
    category: "systems",
  },
  {
    id: "azesfahan-ir",
    name: "azesfahan.ir",
    descriptionEn: "Official web platform and portal for azesfahan.ir.",
    descriptionFa: "پلتفرم و پورتال رسمی وب برای azesfahan.ir.",
    link: "https://github.com/ishantia/azesfahan.ir",
    tags: ["TypeScript", "React", "Website"],
    category: "web",
  },
  {
    id: "zelvoagency-ir",
    name: "zelvoagency.ir",
    descriptionEn: "Digital agency portfolio and service landing website.",
    descriptionFa: "وب‌سایت پورتفولیو و معرفی خدمات آژانس دیجیتال.",
    link: "https://github.com/ishantia/zelvoagency.ir",
    tags: ["JavaScript", "Web", "Agency"],
    category: "web",
  },
  {
    id: "bpb-fragment-fingerprint-converter",
    name: "BPB-fragment-fingerprint-converter",
    descriptionEn:
      "Web utility tool to convert and format TLS fragment fingerprints for BPB proxy configurations.",
    descriptionFa:
      "ابزار تحت وب برای تبدیل و قالب‌بندی TLS fragment و fingerprint جهت پیکربندی‌های BPB.",
    link: "https://github.com/ishantia/BPB-fragment-fingerprint-converter",
    tags: ["JavaScript", "Tools", "Networking", "TLS"],
    category: "web",
  },
  {
    id: "iphone-antenna-profile",
    name: "iPhone-antenna-profile",
    descriptionEn:
      "Cellular profile and configuration to restore antenna connectivity on iPhone 14-17 series.",
    descriptionFa:
      "پروفایل و تنظیمات شبکه برای بازیابی آنتن‌دهی در سری آیفون ۱۴ تا ۱۷.",
    link: "https://github.com/ishantia/iPhone-antenna-profile",
    tags: ["iOS", "Antenna", "Config"],
    category: "systems",
  },
  {
    id: "tgc",
    name: "TGC",
    descriptionEn:
      "A powerful Python GUI tool to check user membership and recent messages in Telegram groups.",
    descriptionFa:
      "ابزار گرافیکی پایتون برای بررسی عضویت کاربران و پیام‌های اخیر در گروه‌های تلگرام.",
    link: "https://github.com/ishantia/TGC",
    tags: ["Python", "Telegram", "GUI", "Windows"],
    category: "python",
  },
  {
    id: "windowscrash",
    name: "WindowsCrash",
    descriptionEn:
      "A DigiSpark project that opens an elevated CMD and terminates svchost.exe as a hardware HID experiment.",
    descriptionFa:
      "پروژه DigiSpark برای آزمایش شبیه‌سازی ورودی USB HID در سیستم‌عامل ویندوز.",
    link: "https://github.com/ishantia/WindowsCrash",
    tags: ["CMD", "DigiSpark", "Arduino"],
    category: "systems",
  },
  {
    id: "pin-cracker",
    name: "Pin-Cracker",
    descriptionEn:
      "A DigiSpark script for brute-forcing 4 and 5-digit PINs by simulating USB keyboard input.",
    descriptionFa:
      "اسکریپت DigiSpark برای شبیه‌سازی ورودی کیبورد USB جهت تست پین‌های ۴ و ۵ رقمی.",
    link: "https://github.com/ishantia/Pin-Cracker",
    tags: ["HID", "DigiSpark", "Arduino"],
    category: "systems",
  },
  {
    id: "my-portfolio",
    name: "My Portfolio",
    descriptionEn:
      "My original portfolio website, which includes my projects, skills, programming languages, and contact information.",
    descriptionFa:
      "نسخه اولیه وب‌سایت پورتفولیو شامل پروژه‌ها، مهارت‌ها، زبان‌های برنامه‌نویسی و راه‌های ارتباطی.",
    link: "https://github.com/ishantia/ishantia.ir",
    tags: ["Website", "Portfolio"],
    category: "web",
  },
  {
    id: "my-portfolio-js",
    name: "My Portfolio-js",
    descriptionEn:
      "My portfolio website rewritten with React, featuring projects, skills, and a bilingual resume.",
    descriptionFa:
      "بازنویسی وب‌سایت پورتفولیو با React شامل پروژه‌ها، مهارت‌ها و رزومه دوزبانه.",
    link: "https://ishantia.ir",
    tags: ["Website", "Portfolio", "React"],
    category: "web",
  },
  {
    id: "pastafe",
    name: "Pastafe",
    descriptionEn:
      "Pastafe is a creative experimental site built in free time — inspired by a pink Hyundai SantaFe.",
    descriptionFa:
      "یک وب‌سایت خلاقانه و سرگرم‌کننده که در اوقات فراغت ساخته شده است.",
    link: "https://pastafe.ir",
    tags: ["Website", "Creative", "PASTAFE"],
    category: "web",
  },
  {
    id: "pakatplast",
    name: "Pakatplast",
    descriptionEn:
      "Website for PakatPlast, an Iranian manufacturer of custom-printed, 100% waterproof plastic folders and envelopes.",
    descriptionFa:
      "وب‌سایت پاکت‌پلاست، تولیدکننده ایرانی پوشه‌ها و پاکت‌های پلاستیکی ضدآب با چاپ اختصاصی.",
    link: "https://pakatplast.com",
    tags: ["Website", "Company", "Pakatplast"],
    category: "web",
  },
  {
    id: "faoxima-telegram-bot",
    name: "Faoxima Telegram Bot",
    descriptionEn: "A Telegram bot for automating and selling VPN services.",
    descriptionFa: "ربات تلگرام برای خودکارسازی و فروش سرویس‌های VPN.",
    link: "https://github.com/ishantia/Faoxima",
    tags: ["Telegram", "Bot", "Faoxima"],
    category: "python",
  },
  {
    id: "flexdns",
    name: "FlexDNS",
    descriptionEn: "A simple, fast DNS switcher utility for Linux.",
    descriptionFa: "ابزار ساده و سریع برای تغییر DNS در سیستم‌عامل لینوکس.",
    link: "https://github.com/ishantia/FlexDNS",
    tags: ["DNS", "Linux", "Networking"],
    category: "systems",
  },
  {
    id: "alan-chand-bot",
    name: "alan-chand-bot",
    descriptionEn:
      "A Telegram bot that fetches live currency exchange rates from an API and delivers them to users.",
    descriptionFa:
      "ربات تلگرام برای دریافت نرخ لحظه‌ای ارز از API و ارسال آن به کاربران.",
    link: "https://github.com/ishantia/alan-chand-bot",
    tags: ["Telegram", "Bot", "API"],
    category: "python",
  },
  {
    id: "bobcafe",
    name: "BobCafe",
    descriptionEn: "An online interactive menu built for BobCafe.",
    descriptionFa: "منوی آنلاین و تعاملی طراحی‌شده برای باب‌کافه.",
    link: "https://bobcafe.ir",
    tags: ["Online Menu", "HTML"],
    category: "web",
  },
  {
    id: "cgi-bin",
    name: "cgi-bin",
    descriptionEn: "Custom account suspended HTML page template.",
    descriptionFa: "صفحه HTML اختصاصی برای وضعیت تعلیق حساب کاربری.",
    link: "https://github.com/ishantia/cgi-bin",
    tags: ["CGI", "Web"],
    category: "web",
  },
  {
    id: "coming-soon-page",
    name: "Coming Soon Page",
    descriptionEn: "A minimal coming soon landing page built with HTML.",
    descriptionFa: "صفحه فرود مینیمال «به‌زودی» ساخته‌شده با HTML.",
    link: "https://github.com/ishantia/coming-soon-page",
    tags: ["Website", "HTML"],
    category: "web",
  },
  {
    id: "device-daria-hormoz",
    name: "device_daria_hormoz",
    descriptionEn: "Android device tree for the Daria Bond II.",
    descriptionFa: "درخت دستگاه (Device Tree) اندروید برای گوشی Daria Bond II.",
    link: "https://github.com/ishantia/device_daria_hormoz",
    tags: ["Android", "Device Tree"],
    category: "systems",
  },
  {
    id: "ip-blocked-page",
    name: "IP-Blocked-Page",
    descriptionEn: "A clean notice page shown when an IP address is blocked on a URL.",
    descriptionFa: "صفحه اطلاع‌رسانی برای زمانی که دسترسی یک آدرس IP مسدود شده باشد.",
    link: "https://github.com/ishantia/IP-Blocked-Page",
    tags: ["Website", "HTML"],
    category: "web",
  },
  {
    id: "twrp-device-daria-hormoz",
    name: "TWRP device_daria_hormoz",
    descriptionEn: "TWRP custom recovery source for the Daria Bond II device.",
    descriptionFa: "سورس ریکاوری کاستوم TWRP برای دستگاه Daria Bond II.",
    link: "https://github.com/ishantia/twrp_device_daria_hormoz",
    tags: ["Android", "TWRP", "Recovery"],
    category: "systems",
  },
];

export const PORTFOLIO_DATA: PortfolioData = {
  profile: {
    name: { en: "Shantia Eslami", fa: "شنتیا اسلامی" },
    firstName: { en: "Shantia", fa: "شنتیا" },
    lastName: { en: "Eslami", fa: "اسلامی" },
    mark: "SE",
    handle: "@ishantia",
    domain: "ishantia.ir",
    role: {
      en: "Software Developer & AI Intern",
      fa: "توسعه‌دهنده نرم‌افزار و کارآموز هوش مصنوعی",
    },
    statusBadge: {
      en: "Student • Software Developer • AI Enthusiast",
      fa: "دانش‌آموز • توسعه‌دهنده نرم‌افزار • علاقه‌مند به هوش مصنوعی",
    },
    heroTitle: {
      en: "Building fast software, AI pipelines & low-level tools.",
      fa: "ساخت نرم‌افزارهای سریع، پایپ‌لاین‌های هوش مصنوعی و ابزارهای سیستمی.",
    },
    heroBio: {
      en: "Crafting high-performance software with Python, Java, Android, Telegram APIs, and AI model integrations — from low-level kernels to voice assistants.",
      fa: "توسعه نرم‌افزارهای سریع و کاربردی با پایتون، جاوا، اندروید، API تلگرام و یکپارچه‌سازی مدل‌های هوش مصنوعی — از کرنل اندروید تا دستیارهای صوتی.",
    },
    aboutHeading: { en: "About & Stack", fa: "درباره من و مهارت‌ها" },
    aboutTitle: {
      en: "Curiosity turned into code, tools, and real-world experiments.",
      fa: "کنجکاوی تبدیل‌شده به کد، ابزارها و پروژه‌های واقعی.",
    },
    aboutCopy: {
      en: "From low-level Android kernels and custom TWRP recoveries to Persian speech-to-text AI pipelines and Telegram automation, I enjoy dissecting complex systems and shipping useful software.",
      fa: "از کرنل‌های سطح پایین اندروید و ریکاوری TWRP تا پایپ‌لاین‌های هوش مصنوعی صوتی فارسی و اتوماسیون تلگرام؛ عاشق تحلیل سیستم‌های پیچیده و ساخت ابزارهای کاربردی هستم.",
    },
    location: { en: "Isfahan, Iran", fa: "اصفهان، ایران" },
    born: { en: "Jul 18, 2009", fa: "۱۳۸۸/۰۴/۲۷" },
    maritalStatus: { en: "Single", fa: "مجرد" },
    militaryStatus: { en: "Obligated", fa: "مشمول" },
    avatar: {
      src160: "/assets/images/mybot-160.webp",
      src320: "/assets/images/mybot-320.webp",
      src480: "/assets/images/mybot-480.webp",
      alt: {
        en: "Avatar illustration of Shantia Eslami",
        fa: "تصویر آواتار شنتیا اسلامی",
      },
    },
    metrics: [
      {
        title: { en: "Python & AI", fa: "پایتون و هوش مصنوعی" },
        subtitle: { en: "Core Specialization", fa: "تخصص اصلی" },
      },
      {
        title: { en: "33+ Projects", fa: "۳۳+ پروژه" },
        subtitle: { en: "Open Source & Live", fa: "متن‌باز و آنلاین" },
      },
      {
        title: { en: "Android & IoT", fa: "اندروید و سخت‌افزار" },
        subtitle: { en: "Kernels & Digispark", fa: "کرنل و آردوینو" },
      },
    ],
    socials: [
      {
        id: "github",
        label: { en: "GitHub", fa: "گیت‌هاب" },
        value: "github.com/ishantia",
        href: "https://github.com/ishantia",
        external: true,
      },
      {
        id: "telegram",
        label: { en: "Telegram", fa: "تلگرام" },
        value: "@ishantia",
        href: "https://t.me/ishantia",
        external: true,
      },
      {
        id: "email",
        label: { en: "Email", fa: "ایمیل" },
        value: "shantiaeslami@gmail.com",
        href: "mailto:shantiaeslami@gmail.com",
      },
      {
        id: "phone",
        label: { en: "Phone", fa: "تلفن" },
        value: "+98 903 782 4494",
        href: "tel:+989037824494",
      },
    ],
    formspreeAction: "https://formspree.io/f/xldwlwpb",
  },
  highlights: [
    {
      id: "ai-backend",
      icon: "sparkles",
      tag: { en: "AI & Backend", fa: "هوش مصنوعی و بک‌اند" },
      title: {
        en: "AI Voice Assistant & LLMs",
        fa: "دستیار صوتی هوش مصنوعی و LLM",
      },
      body: {
        en: "Built Persian AI voice pipelines (STT, Gemma-3-27B LLM via LM Studio, TTS, and face detection) during a 240-hour internship at SnowaTech.",
        fa: "توسعه پایپ‌لاین صوتی فارسی (تبدیل گفتار به متن، مدل Gemma-3-27B از طریق LM Studio، تبدیل متن به گفتار و تشخیص چهره) در دوره ۲۴۰ ساعته اسنواتک.",
      },
    },
    {
      id: "android-kernel",
      icon: "cpu",
      tag: { en: "Systems & OS", fa: "سیستم‌ها و کرنل" },
      title: {
        en: "Android & Kernel Exploration",
        fa: "اندروید و توسعه کرنل",
      },
      body: {
        en: "Hands-on experience with Android device trees, TWRP custom recovery builds, rooted Termux networking tools, and kernel source modifications.",
        fa: "تجربه عملی در ساخت درخت دستگاه اندروید، ریکاوری کاستوم TWRP، ابزارهای شبکه در Termux و ویرایش سورس کرنل.",
      },
    },
    {
      id: "python-telegram",
      icon: "code",
      tag: { en: "Automation", fa: "اتوماسیون" },
      title: {
        en: "Python, Java & Telegram APIs",
        fa: "پایتون، جاوا و API تلگرام",
      },
      body: {
        en: "Authoring serverless Telegram bots, Rust/Wasm Workers SDKs, FastAPI LAN apps, membership tools (TGC), and automated utilities.",
        fa: "ساخت ربات‌های تلگرام، کیت توسعه Rust/Wasm برای Cloudflare Workers، سرویس‌های FastAPI و ابزارهای خودکارسازی.",
      },
    },
    {
      id: "embedded-iot",
      icon: "network",
      tag: { en: "Embedded & Networking", fa: "سخت‌افزار و شبکه" },
      title: {
        en: "Hardware, Digispark & DNS",
        fa: "سخت‌افزار، DigiSpark و شبکه",
      },
      body: {
        en: "Tinkering with Arduino, Digispark USB HID microcontrollers, Linux DNS switchers (FlexDNS), and TLS/networking utilities.",
        fa: "تجربه‌گری با آردوینو، میکروکنترلرهای DigiSpark USB، ابزارهای تغییر DNS در لینوکس (FlexDNS) و ابزارهای شبکه.",
      },
    },
  ],
  skills: [
    {
      id: "python",
      name: { en: "Python & Automation", fa: "پایتون و اتوماسیون" },
      value: 90,
      tag: { en: "Primary", fa: "اصلی" },
      category: "core",
    },
    {
      id: "git",
      name: { en: "Git & GitHub", fa: "گیت و گیت‌هاب" },
      value: 90,
      tag: { en: "Workflow", fa: "فرآیند کار" },
      category: "ecosystem",
    },
    {
      id: "java",
      name: { en: "Java Development", fa: "توسعه با جاوا" },
      value: 85,
      tag: { en: "Backend / App", fa: "بک‌اند / اپ" },
      category: "core",
    },
    {
      id: "cpp",
      name: { en: "C / C++ Systems", fa: "سی و سی‌پلاس‌پلاس" },
      value: 80,
      tag: { en: "Low-level", fa: "سطح پایین" },
      category: "systems",
    },
    {
      id: "telegram",
      name: { en: "Telegram API & Bots", fa: "تلگرام API و ربات‌ها" },
      value: 65,
      tag: { en: "Services", fa: "سرویس‌ها" },
      category: "ecosystem",
    },
    {
      id: "csharp",
      name: { en: "C# & .NET", fa: "سی‌شارپ و دات‌نت" },
      value: 30,
      tag: { en: "Basics", fa: "پایه" },
      category: "core",
    },
    {
      id: "android",
      name: { en: "Android Architecture", fa: "معماری اندروید" },
      value: 25,
      tag: { en: "Platform", fa: "پلتفرم" },
      category: "systems",
    },
  ],
  techGroups: [
    {
      id: "languages",
      label: { en: "Languages", fa: "زبان‌ها" },
      items: ["Python", "Java", "C / C++", "TypeScript", "Kotlin", "Rust", "Dart", "C#"],
    },
    {
      id: "frameworks",
      label: { en: "Frameworks & Web", fa: "فریم‌ورک‌ها و وب" },
      items: ["FastAPI", "React", "Flutter", "PWA", "SQLite", "PHP", "WebAssembly"],
    },
    {
      id: "platforms",
      label: { en: "Platforms & Tools", fa: "پلتفرم‌ها و ابزارها" },
      items: ["Git / GitHub", "Android / TWRP", "Telegram API", "LM Studio", "Linux / Cisco", "Arduino / DigiSpark"],
    },
  ],
  spokenLanguages: [
    {
      name: { en: "Persian", fa: "فارسی" },
      level: { en: "Native", fa: "زبان مادری" },
      value: 100,
    },
    {
      name: { en: "English", fa: "انگلیسی" },
      level: { en: "Intermediate", fa: "متوسط" },
      value: 50,
    },
  ],
  journey: [
    {
      id: "snowatech",
      type: "work",
      title: { en: "AI Intern", fa: "کارآموز هوش مصنوعی" },
      org: { en: "SnowaTech", fa: "اسنواتک (SnowaTech)" },
      period: { en: "Jun 2026 – Aug 2026", fa: "تیر ۱۴۰۵ – مرداد ۱۴۰۵" },
      badge: { en: "240-Hour Internship", fa: "کارآموزی ۲۴۰ ساعته" },
      summary: {
        en: "Worked on ‘Snowan’, a Persian-language AI voice assistant built for Entekhab Industrial Group (Snowa & Daewoo home appliances).",
        fa: "فعالیت روی «اسنوان»، دستیار صوتی هوش مصنوعی فارسی‌زبان توسعه‌یافته برای گروه صنعتی انتخاب (لوازم خانگی اسنوا و دوو).",
      },
      highlights: [
        {
          en: "Built and maintained the Python backend server integrating Speech-to-Text (STT), LLM, and Text-to-Speech (TTS) pipelines.",
          fa: "توسعه و نگهداری سرور بک‌اند پایتون و یکپارچه‌سازی پایپ‌لاین تبدیل گفتار به متن، مدل زبانی و تبدیل متن به گفتار.",
        },
        {
          en: "Integrated the Gemma-3-27B model via LM Studio alongside real-time face-detection capabilities.",
          fa: "یکپارچه‌سازی مدل Gemma-3-27B از طریق LM Studio در کنار قابلیت تشخیص چهره.",
        },
        {
          en: "Optimized runtime performance and resolved behavioral bugs in the assistant's response pipeline, boosting stability and answer accuracy.",
          fa: "بهینه‌سازی عملکرد سیستم و رفع باگ‌های رفتاری در پایپ‌لاین پاسخ‌دهی جهت افزایش پایداری و دقت پاسخ‌ها.",
        },
      ],
      stack: ["Python", "Gemma-3-27B", "LM Studio", "STT / TTS", "Face Detection"],
    },
    {
      id: "fan-afarin",
      type: "education",
      title: { en: "Computer Science", fa: "رشته کامپیوتر" },
      org: { en: "Fan Afarin Technical School", fa: "هنرستان فن آفرین" },
      period: { en: "Sep 2024 – Present", fa: "مهر ۱۴۰۳ – تاکنون" },
      badge: { en: "Diploma", fa: "دیپلم" },
      summary: {
        en: "Focused on software engineering fundamentals, algorithms, networking, and systems programming in Isfahan, Iran.",
        fa: "تمرکز بر مبانی مهندسی نرم‌افزار، الگوریتم‌ها، شبکه و برنامه‌نویسی سیستمی در اصفهان.",
      },
      highlights: [
        {
          en: "Building real-world open-source tools, Android kernels, and web platforms alongside academic coursework.",
          fa: "توسعه ابزارهای متن‌باز واقعی، کرنل‌های اندروید و پلتفرم‌های وب هم‌زمان با تحصیل.",
        },
      ],
      stack: ["Computer Science", "Networking", "Algorithms", "Software Engineering"],
    },
  ],
  projects: RAW_PROJECTS.map((project) => ({
    id: project.id,
    name: project.name,
    description: {
      en: project.descriptionEn,
      fa: project.descriptionFa,
    },
    link: project.link,
    isLiveSite: !project.link.includes("github.com"),
    tags: project.tags,
    category: project.category,
    featured: Boolean(project.featured),
  })),
};
