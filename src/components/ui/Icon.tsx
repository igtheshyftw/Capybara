/**
 * One thin-line icon family, drawn on a 24px grid at 1.6 stroke.
 * No emoji anywhere in the interface.
 */
export type IconName =
  | "home" | "book" | "target" | "cards" | "pen" | "chart" | "search" | "user"
  | "check" | "chevron-right" | "chevron-left" | "chevron-down" | "arrow-right" | "close"
  | "clock" | "flame" | "flag" | "bookmark" | "highlight" | "underline" | "comment"
  | "sparkle" | "menu" | "plus" | "minus" | "play" | "pause" | "reset" | "magnifier"
  | "calendar" | "return" | "leaf" | "compass" | "grid" | "list" | "download" | "print"
  | "lock" | "alert" | "info" | "users" | "clipboard" | "settings" | "logout" | "star"
  | "trend-up" | "trend-down" | "eye" | "note" | "layers" | "send" | "filter" | "sound";

const paths: Record<IconName, string> = {
  home: "M4 11.5 12 4l8 7.5M6 10v10h12V10",
  book: "M5 4h6a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H5V4ZM19 4h-6a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h6V4Z",
  target: "M12 3v3M12 18v3M3 12h3M18 12h3M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z",
  cards: "M7 8h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2ZM8 5h9M10 2.5h5",
  pen: "M4 20l1-4L16 5l3 3L8 19l-4 1ZM14 7l3 3",
  chart: "M4 20h16M7 17v-6M12 17V7M17 17v-9",
  search: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14ZM16 16l4 4",
  user: "M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM4.5 20a7.5 7.5 0 0 1 15 0",
  check: "M5 12.5 9.5 17 19 7",
  "chevron-right": "M9 5l7 7-7 7",
  "chevron-left": "M15 5l-7 7 7 7",
  "chevron-down": "M5 9l7 7 7-7",
  "arrow-right": "M4 12h15M13 6l6 6-6 6",
  close: "M6 6l12 12M18 6L6 18",
  clock: "M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16ZM12 7.5V12l3 2",
  flame: "M12 3s5 4.5 5 9a5 5 0 0 1-10 0c0-2 1-3.2 2-4 0 1.6.8 2.5 1.8 2.5C12.5 10.5 12 6 12 3Z",
  flag: "M6 21V4h11l-2 3.5L17 11H6",
  bookmark: "M7 4h10v16l-5-4-5 4V4Z",
  highlight: "M5 19h14M7 15l7-9 4 3-7 9H7v-3Z",
  underline: "M7 4v7a5 5 0 0 0 10 0V4M5 20h14",
  comment: "M5 5h14v11H10l-5 4V5Z",
  sparkle: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3ZM18.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2Z",
  menu: "M4 7h16M4 12h16M4 17h16",
  plus: "M12 5v14M5 12h14",
  minus: "M5 12h14",
  play: "M8 5.5v13l11-6.5-11-6.5Z",
  pause: "M9 5v14M15 5v14",
  reset: "M20 12a8 8 0 1 1-2.6-5.9M20 4v5h-5",
  magnifier: "M10.5 3.5a7 7 0 1 0 0 14 7 7 0 0 0 0-14ZM15.5 15.5 21 21",
  calendar: "M5 6h14v14H5V6ZM5 10h14M9 3.5V7M15 3.5V7",
  return: "M9 6 4 11l5 5M4 11h10a6 6 0 0 1 0 12h-2",
  leaf: "M20 4C9 4 4 9 4 15c0 3 2 5 5 5 6 0 11-5 11-16ZM6 19C10 15 14 12 18 10",
  compass: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM15.5 8.5l-2 5-5 2 2-5 5-2Z",
  grid: "M4 4h7v7H4V4ZM13 4h7v7h-7V4ZM4 13h7v7H4v-7ZM13 13h7v7h-7v-7Z",
  list: "M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01",
  download: "M12 4v11M7.5 11 12 15.5 16.5 11M5 19h14",
  print: "M7 9V4h10v5M7 18H5v-6h14v6h-2M7 15h10v6H7v-6Z",
  lock: "M6 11h12v9H6v-9ZM8.5 11V8a3.5 3.5 0 0 1 7 0v3",
  alert: "M12 4 3 20h18L12 4ZM12 10v4.5M12 17.2h.01",
  info: "M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16ZM12 11v5M12 8h.01",
  users: "M9 5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7ZM2.5 20a6.5 6.5 0 0 1 13 0M16 6.2a3.5 3.5 0 0 1 0 6.6M17.5 14.5A6.5 6.5 0 0 1 21.5 20",
  clipboard: "M9 4h6v3H9V4ZM7 5.5H5.5v15h13v-15H17M9 12h6M9 16h4",
  settings: "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8",
  logout: "M14 5H6v14h8M11 12h9M17 8.5l3.5 3.5L17 15.5",
  star: "M12 4l2.4 5.2 5.6.7-4.1 3.9 1.1 5.6L12 16.7 6.9 19.4 8 13.8 4 9.9l5.6-.7L12 4Z",
  "trend-up": "M4 16.5 9.5 11l3.5 3.5L20 7M20 7h-5M20 7v5",
  "trend-down": "M4 7.5 9.5 13l3.5-3.5L20 17M20 17h-5M20 17v-5",
  eye: "M2.5 12S6 6.5 12 6.5 21.5 12 21.5 12 18 17.5 12 17.5 2.5 12 2.5 12ZM12 9.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z",
  note: "M6 3h9l4 4v14H6V3ZM15 3v4h4M9 12h7M9 16h5",
  layers: "M12 3 3 8l9 5 9-5-9-5ZM3 13l9 5 9-5M3 17.5l9 5 9-5",
  send: "M4 12 20 4l-6 16-3-7-7-1Z",
  filter: "M4 6h16l-6 7v6l-4-2v-4L4 6Z",
  sound: "M4 10v4h3l4 3.5v-11L7 10H4ZM15 9.5a3.5 3.5 0 0 1 0 5M17.8 7a7 7 0 0 1 0 10",
};

export function Icon({
  name,
  size = 18,
  className = "",
  strokeWidth = 1.6,
}: {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d={paths[name]} />
    </svg>
  );
}
