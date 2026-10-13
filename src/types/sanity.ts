export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
}

export interface ProjectSection {
  _key?: string;
  title: string;
  explanation: string;
}

export interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  category: string;
  coverImage: SanityImage;
  gallery?: SanityImage[];
  year: number;
  technologies?: string[];
  selectedWork?: boolean;
  order?: number;
  client?: string;
  description?: string;
  liveUrl?: string;
  githubUrl?: string;
  sections?: ProjectSection[];
}

export interface StatItem {
  value: string;
  label: string;
}

export interface AchievementItem {
  year: string;
  title: string;
  organization: string;
}

export interface SoftwareStackItem {
  name: string;
  description: string;
  icon?: string;
  iconImage?: SanityImage;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface Author {
  _id: string;
  name: string;
  bio: string;
  bioMuted?: string;
  roles?: string[];
  location?: string;
  sinceYear?: number;
  experienceYears: number;
  email: string;
  phone: string;
  linkedinUrl?: string;
  githubUrl?: string;
  leetcodeUrl?: string;
  profileImage: SanityImage;
  infoImage?: SanityImage;
  stats?: StatItem[];
  achievements?: AchievementItem[];
  infoBioHeadline?: string;
  infoBioBody?: string;
  softwareStack?: SoftwareStackItem[];
  experience?: ExperienceItem[];
  resumeUrl?: string;
  expertise?: {
    category: string;
    skills: string[];
  }[];
  awards?: string[];
}
