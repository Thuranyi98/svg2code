import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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
        <Script
          id="effectivegate-ad"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var script = document.createElement('script');
                script.src = 'https://www.effectivegatecpm.com/bewfiw7m?key=b84960de09b7b935c3d7bbd1fb1c7c55';
                script.async = true;
                document.body.appendChild(script);
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
