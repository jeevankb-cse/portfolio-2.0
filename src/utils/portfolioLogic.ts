import {
  PortfolioProject,
  ProjectCategory,
  RoadJourneyStop,
  SkillDomain,
  SkillItem,
} from '../data/portfolioData';

export type RoadFilterType = 'all' | 'experience' | 'education';

export function filterRoadStops(
  stops: RoadJourneyStop[],
  filter: RoadFilterType
): RoadJourneyStop[] {
  if (filter === 'all') {
    return stops;
  }
  if (filter === 'experience') {
    return stops.filter((s) => s.category === 'Industry Experience');
  }
  return stops.filter((s) => s.category === 'Education');
}

export function calculateRoadProgressPercentage(
  activeIndex: number,
  totalStops: number
): number {
  if (totalStops <= 1) {
    return 100;
  }
  const clamped = Math.max(0, Math.min(activeIndex, totalStops - 1));
  return Math.round(((clamped + 1) / totalStops) * 100);
}

export interface ContactFormInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof ContactFormInput, string>>;
}

export function filterProjects(
  projects: PortfolioProject[],
  category: ProjectCategory,
  searchQuery: string
): PortfolioProject[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return projects.filter((project) => {
    const matchesCategory =
      category === 'All Works' || project.category === category;

    if (!matchesCategory) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    const searchableFields = [
      project.title,
      project.subtitle,
      project.category,
      project.summary,
      project.recognition ?? '',
      ...project.technologies,
      ...project.bullets,
    ]
      .join(' ')
      .toLowerCase();

    return searchableFields.includes(normalizedQuery);
  });
}

export function filterSkills(
  skills: SkillItem[],
  domain: SkillDomain,
  searchQuery = ''
): SkillItem[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return skills.filter((skill) => {
    const matchesDomain = domain === 'All Domains' || skill.domain === domain;
    if (!matchesDomain) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    const haystack = [
      skill.name,
      skill.domain,
      skill.proficiencyNote,
      ...skill.appliedIn,
    ]
      .join(' ')
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });
}

export function validateContactForm(
  input: ContactFormInput
): ContactValidationResult {
  const errors: Partial<Record<keyof ContactFormInput, string>> = {};

  const trimmedName = input.name.trim();
  const trimmedEmail = input.email.trim();
  const trimmedSubject = input.subject.trim();
  const trimmedMessage = input.message.trim();

  if (!trimmedName) {
    errors.name = 'Please enter your full name.';
  } else if (trimmedName.length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!trimmedEmail) {
    errors.email = 'Please enter your email address.';
  } else if (!emailRegex.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!trimmedSubject) {
    errors.subject = 'Please specify a subject or role opportunity.';
  }

  if (!trimmedMessage) {
    errors.message = 'Please write a brief message.';
  } else if (trimmedMessage.length < 10) {
    errors.message = 'Message must be at least 10 characters long.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function buildMailtoHref(
  recipientEmail: string,
  input: ContactFormInput
): string {
  const subject = encodeURIComponent(
    `[Portfolio Inquiry] ${input.subject.trim()} — from ${input.name.trim()}`
  );
  const body = encodeURIComponent(
    `Hello Jeevan,\n\n${input.message.trim()}\n\nBest regards,\n${input.name.trim()}\nEmail: ${input.email.trim()}`
  );
  return `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
}
