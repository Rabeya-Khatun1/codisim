import About from '@/components/home/about/About'
import FeaturedCourses from '@/components/home/about/FeaturedCourses'
import Hero from '@/components/home/about/Hero'
import Testimonial from '@/components/home/Testimonial'
import MinimalCTA from '@/components/home/CTA'

export default function Home() {

  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      {/* <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <GraduationCap className="text-[#FFC570]" size={32} />
            <span className="text-2xl font-bold text-slate-900">LearnHub</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#" className="text-slate-600 hover:text-[#FFC570] transition-colors">Home</Link>
            <Link href="#" className="text-slate-600 hover:text-[#FFC570] transition-colors">Courses</Link>
            <Link href="#" className="text-slate-600 hover:text-[#FFC570] transition-colors">About</Link>
            <Link href="#" className="text-slate-600 hover:text-[#FFC570] transition-colors">Contact</Link>
          </div>
          <div className="flex items-center gap-4">
            <button className="hidden md:block text-slate-600 hover:text-[#FFC570] transition-colors">Sign In</button>
            <button className="bg-[#FFC570] text-slate-900 px-5 py-2 rounded-full font-semibold hover:bg-[#ffbc5a] transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </nav> */}

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