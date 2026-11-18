import "server-only";
import { team } from "#content";
import { DEFAULT_LOCALE, type Locale } from "@/config/i18n";
import { forLocaleWithFallback } from "@/lib/content/utils";

export interface TeamMemberCard {
  id: string;
  name: string;
  role: string;
  description: string;
  initials: string;
  color: string;
  image: string | undefined;
  skills: string[];
}

export function getTeamMembers(locale: Locale = DEFAULT_LOCALE): TeamMemberCard[] {
  return forLocaleWithFallback(team, locale).map((member) => ({
    id: member.id,
    name: member.name,
    role: member.role,
    description: member.description,
    initials: member.initials,
    color: member.color,
    image: member.image?.src,
    skills: member.skills,
  }));
}
