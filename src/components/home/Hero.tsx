import React from 'react';
import Image from 'next/image'; 

const Hero: React.FC = () => {
  return (
    <div className="bg-white font-sans text-slate-900">
      <section className="relative min-h-[600px] flex flex-col items-center justify-start pt-20 px-6 overflow-hidden">

        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1740&q=80"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-orange-600/80 mix-blend-multiply"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
              <span className="font-bold text-xl tracking-tighter">LMS</span>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-6xl font-extrabold mb-4 tracking-tight leading-tight">
            Powerful Learning <br /> Management System
          </h1>
          
          <p className="text-sm md:text-lg max-w-2xl mx-auto opacity-90 leading-relaxed mb-10">
            Awesome features for creating online courses, teacher profiles, extended user profiles, 
            lesson management, quiz system, video hosting, ranking system, and more.
          </p>
          
          <div className="relative mt-12 max-w-3xl mx-auto px-4">

            <div className="bg-gray-800 rounded-t-2xl p-2 shadow-2xl border-x-[6px] border-t-[6px] border-gray-700">
              <div className="relative rounded-t-lg h-[200px] sm:h-[300px] md:h-[400px] overflow-hidden bg-white">
                <Image
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80" 
                  alt="Dashboard View"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="absolute -right-2 -bottom-6 w-20 sm:w-28 md:w-36 h-40 sm:h-56 md:h-72 bg-gray-900 rounded-[1.5rem] sm:rounded-[2.5rem] border-[4px] sm:border-[8px] border-gray-800 shadow-2xl hidden xs:block overflow-hidden z-20">
              <div className="relative w-full h-full">
                <Image
                  src="https://images.unsplash.com/photo-1512941932669-90a1b58e7e9c?auto=format&fit=crop&w=400&q=80" 
                  alt="Mobile App View"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;