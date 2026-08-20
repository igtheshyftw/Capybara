import type { IconName } from "@/components/ui/Icon";
import type { Role } from "@/lib/types";

export interface NavItem {
  label: string;
  /** Shorter label for the mobile bottom bar, where five slots share the width. */
  short?: string;
  href: string;
  icon: IconName;
  /** Shown in the mobile bottom bar (max five per role). */
  mobile?: boolean;
  /** Extra search terms — what someone might type looking for this page. */
  keywords?: string;
  match?: string[];
}

export interface NavSection {
  label?: string;
  items: NavItem[];
}

export const navByRole: Record<Role, NavSection[]> = {
  student: [
    {
      items: [
        { label: "Dashboard", href: "/dashboard", icon: "home", mobile: true, keywords: "home today plan overview" },
        { label: "Learn", href: "/learn", icon: "book", mobile: true, match: ["/learn"], keywords: "courses course library lessons syllabus" },
        { label: "Practice", href: "/practice", icon: "target", mobile: true, match: ["/practice"], keywords: "questions drills question sets quiz" },
      ],
    },
    {
      label: "Study",
      items: [
        { label: "Vocabulary", href: "/vocabulary", icon: "cards", match: ["/vocabulary"], keywords: "vocab lab words flashcards review spaced repetition" },
        { label: "Writing", href: "/writing", icon: "pen", match: ["/writing"], keywords: "writing studio essay essays drafts paragraphs feedback" },
        { label: "Mistake Notebook", href: "/mistakes", icon: "magnifier", keywords: "errors wrong answers error analysis review mistakes" },
        { label: "Focus", href: "/focus", icon: "clock", keywords: "focus room timer pomodoro study session concentrate" },
        { label: "AI Tutor", href: "/tutor", icon: "sparkle", keywords: "tutor help hint explain professor bara ask" },
      ],
    },
    {
      label: "You",
      items: [
        { label: "Progress", href: "/progress", icon: "chart", mobile: true, keywords: "analytics stats accuracy mastery charts intelligence" },
        { label: "Assignments", href: "/assignments", icon: "clipboard", keywords: "homework due work set tasks" },
        { label: "Achievements", href: "/achievements", icon: "star", keywords: "badges xp levels rewards streaks" },
        { label: "Study Room", href: "/room", icon: "leaf", keywords: "capybara room desk decorations unlocks" },
        { label: "Profile", href: "/profile", icon: "user", mobile: true, keywords: "account settings preferences me" },
      ],
    },
  ],

  parent: [
    {
      items: [
        { label: "Overview", href: "/parent", icon: "home", mobile: true },
        { label: "Progress", href: "/parent/progress", icon: "chart", mobile: true },
        { label: "Assignments", short: "Work", href: "/parent/assignments", icon: "clipboard", mobile: true },
      ],
    },
    {
      label: "Records",
      items: [
        { label: "Reports", href: "/parent/report", icon: "print", mobile: true },
        { label: "Teacher Notes", short: "Notes", href: "/parent/notes", icon: "comment", mobile: true },
      ],
    },
  ],

  teacher: [
    {
      items: [
        { label: "Overview", href: "/teacher", icon: "home", mobile: true },
        { label: "Students", href: "/teacher/students", icon: "users", mobile: true, match: ["/teacher/students"] },
        { label: "Assignments", short: "Work", href: "/teacher/assignments", icon: "clipboard", mobile: true, match: ["/teacher/assignments"] },
      ],
    },
    {
      label: "Teaching",
      items: [
        { label: "Class Analytics", short: "Analytics", href: "/teacher/analytics", icon: "chart", mobile: true },
        { label: "Content Library", short: "Library", href: "/teacher/library", icon: "layers", mobile: true },
      ],
    },
  ],
};

export const roleHome: Record<Role, string> = {
  student: "/dashboard",
  parent: "/parent",
  teacher: "/teacher",
};

/**
 * The URL is the source of truth for which role's interface is showing —
 * landing on /teacher directly must not leave the student navigation up.
 */
export function roleForPath(pathname: string): Role {
  if (pathname === "/teacher" || pathname.startsWith("/teacher/")) return "teacher";
  if (pathname === "/parent" || pathname.startsWith("/parent/")) return "parent";
  return "student";
}

export function flatNav(role: Role): NavItem[] {
  return navByRole[role].flatMap((s) => s.items);
}

export function isActive(pathname: string, item: NavItem) {
  if (pathname === item.href) return true;
  const prefixes = item.match ?? [];
  return prefixes.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}
