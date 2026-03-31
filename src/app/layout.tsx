import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/providers/AuthProvider";
import GlobalLoaderProvider from "@/providers/GlobalLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://learnhub-fawn.vercel.app/"),
    title: {
    default: "Learn Hub LMS Platform",
    template: "%s | Learn Hub", 
  },

  description: "Learn coding easily with our LMS platform",
  keywords: ["LMS", "React Course", "Next.js Learning"],
  authors: [{ name: "Rabeya Khatun" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://learnhub-fawn.vercel.app/",
    siteName: "Learn Hub",
    images: "/public/homepage.png", 
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn Hub LMS Platform",
    description: "Learn coding easily",
    images: ["/public/homepage.png"],
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <AuthProvider>
        <body >

        <GlobalLoaderProvider>  <main>{children}</main></GlobalLoaderProvider>

        </body>
      </AuthProvider>

    </html>
  );
}
