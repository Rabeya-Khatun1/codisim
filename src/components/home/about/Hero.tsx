import { ArrowRight, CheckCircle2, PlayCircle, Star } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const Hero = () => {
    return (
          <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-slate-50 via-white to-slate-50">
               <div className="max-w-7xl mx-auto">
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                   {/* Left Side: Hero Content */}
                   <div className="space-y-8">
                     <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-tight">
                       Learn Anything,
                       <span className="text-[#FFC570]"> Anytime, Anywhere</span>
                     </h1>
                     <p className="text-xl text-gray-600 leading-relaxed">
                       Join the world's leading online learning platform and unlock your potential with expert-led courses in tech, business, and creative skills.
                     </p>
                     <div className="flex flex-col sm:flex-row gap-4">
                       <button className="bg-[#FFC570] text-slate-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#ffbc5a] transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
                         Start Learning Free <ArrowRight size={20} />
                       </button>
                       <button className="border-2 border-slate-200 text-slate-700 px-8 py-4 rounded-xl font-bold text-lg hover:border-[#FFC570] hover:text-[#FFC570] transition-all flex items-center justify-center gap-2">
                         <PlayCircle size={20} /> Watch Demo
                       </button>
                     </div>
                     <div className="flex items-center gap-6 pt-4">
                       <div className="flex -space-x-3">
                         {[1, 2, 3, 4].map((i) => (
                           <div key={i} className="w-10 h-10 rounded-full bg-slate-300 border-2 border-white overflow-hidden">
                             <Image src={`https://randomuser.me/api/portraits/women/${i}.jpg`} alt="user" width={40} height={40} className="object-cover" />
                           </div>
                         ))}
                       </div>
                       <p className="text-sm text-slate-600">
                         <span className="font-bold text-slate-900">2,500+</span> students joined this week
                       </p>
                     </div>
                   </div>
       
                   {/* Right Side: Hero Image */}
                   <div className="relative">
                     <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
                       <Image
                         src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop"
                         alt="Students learning together"
                         width={800}
                         height={600}
                         className="w-full h-auto object-cover"
                       />
                     </div>
                     <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-[#FFC570] rounded-3xl -z-0 hidden md:block opacity-20"></div>
                     <div className="absolute -top-10 -left-10 bg-white p-6 rounded-2xl shadow-xl hidden lg:block z-20 border border-slate-100">
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
                 </div>
               </div>
             </section>
    );
};

export default Hero;