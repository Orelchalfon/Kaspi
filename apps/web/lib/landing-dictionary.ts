export type LandingSectionId =
  | "navbar"
  | "hero"
  | "features"
  | "howItWorks"
  | "pricing"
  | "testimonials"
  | "footer"

type Feature = {
  id: string
  title: string
  description: string
}

type Step = {
  id: string
  title: string
  description: string
}

type PricingTier = {
  id: string
  name: string
  price: string
  description: string
  highlight: boolean
  ctaLabel: string
}

type Testimonial = {
  id: string
  name: string
  role: string
  quote: string
}

export type LandingDictionary = {
  navbar: {
    logo: string
    links: {
      id: string
      label: string
      href: string
    }[]
    ctaLabel: string
    languageToggleAria: string
  }
  hero: {
    eyebrow: string
    title: string
    subtitle: string
    primaryCtaLabel: string
    secondaryCtaLabel: string
    secondaryCtaHref: string
    badge: string
  }
  features: {
    title: string
    subtitle: string
    items: Feature[]
  }
  howItWorks: {
    title: string
    subtitle: string
    steps: Step[]
  }
  pricing: {
    title: string
    subtitle: string
    tiers: PricingTier[]
    disclaimer: string
  }
  testimonials: {
    title: string
    subtitle: string
    items: Testimonial[]
  }
  footer: {
    copyright: string
    links: {
      id: string
      label: string
      href: string
    }[]
  }
}

const he: LandingDictionary = {
  navbar: {
    logo: "Kaspi",
    links: [
      { id: "features", label: "הפיצ׳רים", href: "#features" },
      { id: "how-it-works", label: "איך זה עובד", href: "#how-it-works" },
      { id: "pricing", label: "תמחור", href: "#pricing" },
      { id: "testimonials", label: "מה אנשים אומרים", href: "#testimonials" },
    ],
    ctaLabel: "הצטרפות לרשימת ההמתנה",
    languageToggleAria: "החלפת שפה לעברית / אנגלית",
  },
  hero: {
    eyebrow: "פינטק חכם למשק הבית הישראלי",
    title: "סדר, שליטה וביטחון בכסף – בלי אקסלים ובלי כאב ראש.",
    subtitle:
      "Kaspi מחבר את כל החשבונות, ההשקעות וההלוואות למקום אחד בעברית פשוטה, מנתח בשבילך את התמונה המלאה ומציע צעדים פרקטיים לשיפור המצב הפיננסי.",
    primaryCtaLabel: "הצטרפו להמתנה מוקדמת",
    secondaryCtaLabel: "איך זה עובד",
    secondaryCtaHref: "#how-it-works",
    badge: "גרסת בטא מוגבלת – עדיפות למוקדמים",
  },
  features: {
    title: "כל הכסף במקום אחד, בשפה שלך.",
    subtitle:
      "Kaspi בנוי במיוחד למשקי בית בישראל – עם RTL, מונחים מוכרים ודגש על ביטחון ופרקטיקה.",
    items: [
      {
        id: "clarity",
        title: "תמונה מלאה בשתי דקות",
        description:
          "חיבור מאובטח לחשבונות, כרטיסים וחסכונות כדי לראות סוף‑סוף איפה הכסף נכנס, לאן הוא יוצא ומה באמת נשאר.",
      },
      {
        id: "goals",
        title: "מטרות חכמות שמתאימות אליך",
        description:
          "הגדרת יעדים כמו חיסכון לילדים, שדרוג דירה או חופשה – עם מסלול חכם שעוזר לכם להגיע אליהם בזמן.",
      },
      {
        id: "insights",
        title: "תובנות במקום טבלאות",
        description:
          "התראות חכמות על דפוסים חריגים, הזדמנויות לחיסכון והמלצות לפעולה בשפה יומיומית ולא במונחי בנק.",
      },
      {
        id: "peace-of-mind",
        title: "שקיפות וביטחון",
        description:
          "טכנולוגיה ברמת בנק, הצפנה מקצה לקצה וללא מכירת נתונים. אתם שולטים במה שמשתפים – ובכל רגע אפשר להתנתק.",
      },
    ],
  },
  howItWorks: {
    title: "איך Kaspi עובד בפועל?",
    subtitle:
      "שלושה צעדים פשוטים – ומשק הבית שלכם עובר מ״כיבוי שריפות״ לתכנון לטווח ארוך.",
    steps: [
      {
        id: "connect",
        title: "מתחברים לחשבונות securely",
        description:
          "מחברים את החשבון, כרטיסי האשראי והחסכונות דרך חיבור מאובטח ברמת מוסד פיננסי, מבלי לשמור סיסמאות.",
      },
      {
        id: "analyze",
        title: "ניתוח חכם של ההוצאות וההכנסות",
        description:
          "Kaspi מקטלג את ההוצאות, מזהה דפוסים, מנקה רעשים חד‑פעמיים ומסמן נקודות חולשה והזדמנויות.",
      },
      {
        id: "act",
        title: "מקבלים תוכנית פעולה בהירה",
        description:
          "מקבלים לוח זמנים פשוט: מה כדאי לעשות החודש, מה אפשר לדחות, ואיך לשמור על תזרים בריא גם כשהחיים מפתיעים.",
      },
    ],
  },
  pricing: {
    title: "תמחור שקוף, בלי הפתעות.",
    subtitle:
      "בשלב הבטא Kaspi פתוח לקבוצה מצומצמת ללא עלות. בהמשך יוצעו מסלולים במחיר קבוע והוגן.",
    tiers: [
      {
        id: "beta",
        name: "בטא מוקדמת",
        price: "₪0",
        description: "גישה מלאה לכלי הניתוח וללוח היעדים במהלך תקופת הבטא.",
        highlight: true,
        ctaLabel: "הצטרפות לרשימת ההמתנה",
      },
      {
        id: "soon",
        name: "מסלול חודשי (בקרוב)",
        price: "₪X/חודש",
        description:
          "תמחור סופי ייקבע יחד עם קבוצת הבטא – בשקיפות מלאה ועל בסיס ערך אמיתי.",
        highlight: false,
        ctaLabel: "קבלו עדכון כשנפתח",
      },
    ],
    disclaimer:
      "המחירים הסופיים יתעדכנו לפני ההשקה הרשמית. לא נגבה תשלום ללא אישור מפורש שלכם.",
  },
  testimonials: {
    title: "מה אנשים אומרים על Kaspi?",
    subtitle:
      "שמות והציטוטים הם לדוגמה בלבד – אבל התחושה היא אמיתית: פחות לחץ, יותר ודאות.",
    items: [
      {
        id: "family",
        name: "נועה ותומר, הורים לשניים",
        role: "משק בית במרכז",
        quote:
          "״סוף‑סוף יש לנו שפה משותפת סביב כסף. במקום ויכוחים על כל חיוב, רואים ביחד את התמונה ומחליטים מראש.״",
      },
      {
        id: "freelancer",
        name: "גדי",
        role: "פרילנסר בתחום הדיגיטל",
        quote:
          "״בתור עצמאי אין לי זמן לאקסלים. Kaspi מסמן לי כל חודש מה צריך את תשומת הלב שלי – וזה מוריד המון לחץ.״",
      },
      {
        id: "young",
        name: "שירה",
        role: "סטודנטית להנדסה",
        quote:
          "״בהתחלה התביישתי בכלל להסתכל על החשבון. עכשיו אני יודעת בדיוק כמה אני יכולה לשים בצד בלי לפחד.״",
      },
    ],
  },
  footer: {
    copyright:
      "© " +
      new Date().getFullYear() +
      " Kaspi. כל הזכויות שמורות. אין באמור ייעוץ השקעות.",
    links: [
      { id: "privacy", label: "מדיניות פרטיות", href: "#" },
      { id: "terms", label: "תנאי שימוש", href: "#" },
      { id: "contact", label: "צור קשר", href: "mailto:hello@kaspi.app" },
    ],
  },
}

const en: LandingDictionary = {
  navbar: {
    logo: "Kaspi",
    links: [
      { id: "features", label: "Features", href: "#features" },
      { id: "how-it-works", label: "How it works", href: "#how-it-works" },
      { id: "pricing", label: "Pricing", href: "#pricing" },
      { id: "testimonials", label: "What people say", href: "#testimonials" },
    ],
    ctaLabel: "Join the waitlist",
    languageToggleAria: "Toggle language between Hebrew and English",
  },
  hero: {
    eyebrow: "Smart fintech for Israeli households",
    title: "Clarity, control, and confidence with your money – without spreadsheets.",
    subtitle:
      "Kaspi brings all your accounts, investments, and loans into one clear view in Hebrew, analyzes the full picture, and suggests practical steps to improve your financial health.",
    primaryCtaLabel: "Join early access",
    secondaryCtaLabel: "See how it works",
    secondaryCtaHref: "#how-it-works",
    badge: "Limited beta – priority for early joiners",
  },
  features: {
    title: "All your money in one place.",
    subtitle:
      "Built for households in Israel – RTL-friendly, familiar language, and a focus on security and practical decisions.",
    items: [
      {
        id: "clarity",
        title: "A full picture in minutes",
        description:
          "Securely connect bank accounts, cards, and savings so you finally see where money comes in, where it goes, and what truly remains.",
      },
      {
        id: "goals",
        title: "Goals that match your life",
        description:
          "Set goals like kids’ savings, upgrading your home, or a big trip – with a smart path that helps you actually get there.",
      },
      {
        id: "insights",
        title: "Insights instead of spreadsheets",
        description:
          "Smart alerts about unusual patterns, saving opportunities, and clear recommendations in everyday language – not bank jargon.",
      },
      {
        id: "peace-of-mind",
        title: "Transparency & security",
        description:
          "Bank-grade technology, end-to-end encryption, and no selling of data. You stay in control and can disconnect at any time.",
      },
    ],
  },
  howItWorks: {
    title: "How does Kaspi actually work?",
    subtitle:
      "Three straightforward steps to move from firefighting to long-term planning.",
    steps: [
      {
        id: "connect",
        title: "Connect your accounts securely",
        description:
          "Link your accounts, cards, and savings through a secure, institution-level connection – without storing raw passwords.",
      },
      {
        id: "analyze",
        title: "Smart analysis of income and spending",
        description:
          "Kaspi categorizes transactions, detects patterns, filters out one-offs, and surfaces weak spots and opportunities.",
      },
      {
        id: "act",
        title: "Get a clear action plan",
        description:
          "Receive a simple roadmap: what to handle this month, what can wait, and how to keep your cash flow healthy when life happens.",
      },
    ],
  },
  pricing: {
    title: "Transparent pricing, no surprises.",
    subtitle:
      "During beta, Kaspi is free for a limited group. Later, we’ll introduce simple, fair plans.",
    tiers: [
      {
        id: "beta",
        name: "Early beta",
        price: "₪0",
        description:
          "Full access to analysis tools and goal planning throughout the beta period.",
        highlight: true,
        ctaLabel: "Join the waitlist",
      },
      {
        id: "soon",
        name: "Monthly plan (coming soon)",
        price: "₪X/mo",
        description:
          "Final pricing will be set together with the beta group – transparently and based on real value.",
        highlight: false,
        ctaLabel: "Get launch updates",
      },
    ],
    disclaimer:
      "Final pricing will be announced before public launch. We will never charge you without explicit consent.",
  },
  testimonials: {
    title: "What people say about Kaspi",
    subtitle:
      "Names and quotes are illustrative – but the feeling is real: less stress, more clarity.",
    items: [
      {
        id: "family",
        name: "Noa & Tomer",
        role: "Parents of two",
        quote:
          "“We finally have a shared language around money. Instead of arguing over every charge, we see the whole picture and decide together.”",
      },
      {
        id: "freelancer",
        name: "Gadi",
        role: "Freelance marketer",
        quote:
          "“As a freelancer I don’t have time for spreadsheets. Kaspi highlights what needs my attention each month – that alone lowers my stress.”",
      },
      {
        id: "young",
        name: "Shira",
        role: "Engineering student",
        quote:
          "“I used to avoid looking at my balance at all. Now I know exactly how much I can set aside without panicking.”",
      },
    ],
  },
  footer: {
    copyright:
      "© " +
      new Date().getFullYear() +
      " Kaspi. All rights reserved. This is not investment advice.",
    links: [
      { id: "privacy", label: "Privacy policy", href: "#" },
      { id: "terms", label: "Terms of use", href: "#" },
      { id: "contact", label: "Contact", href: "mailto:hello@kaspi.app" },
    ],
  },
}

export type SupportedLandingLanguage = "he" | "en"

export function getLandingDictionary(
  lang: SupportedLandingLanguage
): LandingDictionary {
  if (lang === "en") {
    return en
  }

  return he
}

