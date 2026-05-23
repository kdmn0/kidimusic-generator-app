import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://music.kidiman.com"),
  title: "KıdıMusic ♪ AI Music Generator Studio",
  description: "Create complete high-quality music tracks instantly using AI. Powered by MiniMax Music 2.6.",
  keywords: ["AI music generator", "AI song maker", "yapay zeka müzik yapma", "music AI", "KıdıMusic", "music generator", "AI studio", "royalty free music generator"],
  authors: [{ name: "KıdıMan Studio" }],
  creator: "KıdıMan Studio",
  publisher: "KıdıMan Studio",
  openGraph: {
    title: "KıdıMusic ♪ Compose AI Soundtracks Instantly",
    description: "Create complete high-quality music tracks instantly using AI. Powered by MiniMax Music 2.6.",
    url: "https://music.kidiman.com",
    siteName: "KıdıMusic",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KıdıMusic ♪ AI Music Generator Studio",
    description: "Create completely arranged music tracks featuring crisp instrumentation and vocals.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-gray-950 text-white">{children}</body>
    </html>
  );
}
