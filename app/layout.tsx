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
  title: "SVG2Code - Convert SVG Images to Code | Free Online Tool",
  description: "Convert SVG image files to clean, formatted SVG code instantly. Free online tool to extract SVG code from images with live preview and download options.",
  keywords: ["SVG to code", "SVG converter", "SVG code generator", "SVG extractor", "SVG viewer", "SVG editor"],
  authors: [{ name: "SVG2Code" }],
  openGraph: {
    title: "SVG2Code - Convert SVG Images to Code",
    description: "Convert SVG image files to clean, formatted SVG code instantly. Free online tool with live preview.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SVG2Code - Convert SVG Images to Code",
    description: "Convert SVG image files to clean, formatted SVG code instantly.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
