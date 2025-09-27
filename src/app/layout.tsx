import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI-Enhanced Microgrid Dashboard | Smart Energy Management",
  description: "Professional hybrid microgrid monitoring system with AI-powered load management, energy prediction, and weather intelligence for optimal energy efficiency.",
  keywords: "microgrid, AI, energy management, solar power, battery monitoring, smart grid, IoT dashboard",
  authors: [{ name: "Microgrid Solutions Team" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#667eea" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
          {children}
        </div>
      </body>
    </html>
  );
}
