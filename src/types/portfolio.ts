export type Language = "en" | "fa";
export type Theme = "dark" | "light";

export interface LocalizedText {
  en: string;
  fa: string;
}

export interface SocialLink {
  id: "github" | "telegram" | "email" | "phone";
  label: LocalizedText;
  value: string;
  href: string;
  external?: boolean;
}

export interface ProfileData {
  name: LocalizedText;
  firstName: LocalizedText;
  lastName: LocalizedText;
  mark: string;
  handle: string;
  domain: string;
  role: LocalizedText;
  statusBadge: LocalizedText;
  heroTitle: LocalizedText;
  heroBio: LocalizedText;
  aboutHeading: LocalizedText;
  aboutTitle: LocalizedText;
  aboutCopy: LocalizedText;
  location: LocalizedText;
  born: LocalizedText;
  maritalStatus: LocalizedText;
  militaryStatus: LocalizedText;
  avatar: {
    src160: string;
    src320: string;
    src480: string;
    alt: LocalizedText;
  };
  metrics: Array<{
    title: LocalizedText;
    subtitle: LocalizedText;
  }>;
  socials: SocialLink[];
  formspreeAction: string;
}

export interface BentoHighlight {
  id: string;
  icon: "sparkles" | "cpu" | "code" | "network";
  tag: LocalizedText;
  title: LocalizedText;
  body: LocalizedText;
}

export type SkillCategory = "core" | "systems" | "ecosystem";

export interface SkillMetric {
  id: string;
  name: LocalizedText;
  value: number;
  tag: LocalizedText;
  category: SkillCategory;
}

export interface TechChipGroup {
  id: string;
  label: LocalizedText;
  items: string[];
}

export interface ExperienceItem {
  id: string;
  type: "work" | "education";
  title: LocalizedText;
  org: LocalizedText;
  period: LocalizedText;
  badge: LocalizedText;
  summary: LocalizedText;
  highlights: LocalizedText[];
  stack: string[];
}

export type ProjectCategory = "all" | "python" | "systems" | "web";

export interface ProjectItem {
  id: string;
  name: string;
  description: LocalizedText;
  link: string;
  isLiveSite: boolean;
  tags: string[];
  category: Exclude<ProjectCategory, "all">;
  featured: boolean;
}

export interface PortfolioData {
  profile: ProfileData;
  highlights: BentoHighlight[];
  skills: SkillMetric[];
  techGroups: TechChipGroup[];
  spokenLanguages: Array<{
    name: LocalizedText;
    level: LocalizedText;
    value: number;
  }>;
  journey: ExperienceItem[];
  projects: ProjectItem[];
}
