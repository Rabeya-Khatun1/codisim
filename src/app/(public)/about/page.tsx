import About from '@/components/home/about/About'
import FeaturedCourses from '@/components/home/about/FeaturedCourses'
import Hero from '@/components/home/about/Hero'
import Testimonial from '@/components/home/Testimonial'
import MinimalCTA from '@/components/home/CTA'

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