import type { Metadata, Viewport } from "next";
import { Inter, Newsreader } from "next/font/google";
import { AppStoreProvider } from "@/lib/store";
import { ToastHost } from "@/components/feedback/ToastHost";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Capybara Motion — A calmer way to learn",
    template: "%s · Capybara Motion",
  },
  description:
    "Lessons, practice, vocabulary, writing, exam preparation and progress tracking in one thoughtful learning space.",
};

export const viewport: Viewport = {
  themeColor: "#f7f4ed",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${newsreader.variable}`}>
      <body className="min-h-dvh bg-paper antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[10px] focus:border focus:border-ink focus:bg-surface focus:px-4 focus:py-2.5 focus:text-[14px] focus:font-medium"
        >
          Skip to content
        </a>
        <AppStoreProvider>
          {children}
          <ToastHost />
        </AppStoreProvider>
      </body>
    </html>
  );
}
