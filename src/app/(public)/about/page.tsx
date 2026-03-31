import About from '@/components/home/about/About'
import FeaturedCourses from '@/components/home/about/FeaturedCourses'
import Hero from '@/components/home/about/Hero'
import Testimonial from '@/components/home/Testimonial'
import MinimalCTA from '@/components/home/CTA'
import { Metadata } from 'next'
export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn more about our platform, mission, and how we help students become developers.",

  openGraph: {
    title: "About Learn Hub",
    description:
      "Discover our mission, vision, and how we empower learners worldwide.",
    url: "https://learnhub-fawn.vercel.app/about",
    siteName: "Learn Hub",
    type: "website",
    images: [
      {
        url: "/public/aboutpage.png",
        width: 1200,
        height: 630,
        alt: "About Learn Hub",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "About Learn Hub",
    description:
      "Learn more about our mission and platform.",
    images: ["/public/aboutpage.png"],
  },

  alternates: {
    canonical: "https://learnhub-fawn.vercel.app/about",
  },

  keywords: [
    "About LMS",
    "Learn Hub mission",
    "online learning platform",
    "Next.js LMS",
  ],
};

export default function Home() {

  return (
    <main className="min-h-screen bg-white">

      {/* Hero Section */}
   <Hero></Hero>

      {/* About Section - Your Original Component */}
   <About></About>

      {/* Featured Courses Section */}
<FeaturedCourses></FeaturedCourses>

      {/* Testimonials Section */}

<Testimonial></Testimonial>
      {/* CTA Section */}
<MinimalCTA></MinimalCTA>
    </main>
  )
}