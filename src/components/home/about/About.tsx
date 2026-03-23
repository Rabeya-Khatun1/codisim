import { Award, CheckCircle2, GraduationCap, Users } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const About = () => {


      const stats = [
    { icon: <Users className="text-[#FFC570]" size={28} />, label: "Active Students", value: "15K+" },
    { icon: <GraduationCap className="text-[#FFC570]" size={28} />, label: "Total Courses", value: "120+" },
    { icon: <Award className="text-[#FFC570]" size={28} />, label: "Expert Mentors", value: "50+" },
  ]
    return (
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Side: Image */}
            <div className="relative">
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
                <Image 
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop"
                  alt="Our Team"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-[#FFC570] rounded-3xl -z-0 hidden md:block opacity-20"></div>
              <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-2xl shadow-xl hidden lg:block z-20 border border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    <CheckCircle2 size={28} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Verified Platform</p>
                    <p className="text-lg font-bold text-slate-900">100% Quality Education</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Content */}
            <div className="space-y-8">
              <div>
                <h4 className="text-[#FFC570] font-bold tracking-widest uppercase text-sm mb-3">About LearnHub</h4>
                <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
                  Providing the Best <span className="text-[#FFC570]">Online Education</span> for Your Future
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  LearnHub is a leading online learning platform dedicated to helping individuals reach their full potential. 
                  We provide high-quality courses taught by industry experts to help you master new skills and advance your career.
                </p>
              </div>

              <ul className="space-y-4">
                {[
                  "Access to 100+ premium courses",
                  "Learn from top industry professionals",
                  "Flexible learning schedule",
                  "Get certified upon completion"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-slate-700 font-medium">
                    <CheckCircle2 className="text-[#FFC570]" size={20} />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="grid grid-cols-3 gap-4 pt-4">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white p-4 rounded-2xl border border-slate-100 text-center shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-center mb-2">{stat.icon}</div>
                    <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
};

export default About;