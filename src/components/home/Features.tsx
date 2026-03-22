"use client";

import React from 'react';
import { 
  Headset, 
  Sparkles, 
  Rocket, 
  Trophy, 
  Infinity, 
  Users,
  CheckCircle
} from 'lucide-react';

const Features = () => {
  // আপনার কাস্টম কালার
  const primaryColor = "#FFC570";

  const features = [
    {
      icon: Headset,
      title: "24/7 Live Support",
      description: "Round-the-clock assistance from our expert support team via chat, email, and video calls.",
      stats: "< 2 min",
      statLabel: "Avg Response Time",
    },
    {
      icon: Sparkles,
      title: "Cutting-Edge Curriculum",
      description: "Stay ahead with courses updated quarterly to match industry demands and latest tech trends.",
      stats: "95%",
      statLabel: "Content Freshness",
    },
    {
      icon: Rocket,
      title: "Career Acceleration",
      description: "Fast-track your career with job placement support, resume reviews, and interview prep.",
      stats: "75%",
      statLabel: "Placement Rate",
    },
    {
      icon: Trophy,
      title: "Industry Recognition",
      description: "Earn certificates recognized by top companies and add them to your professional profile.",
      stats: "50K+",
      statLabel: "Certificates Issued",
    },
    {
      icon: Infinity,
      title: "Lifetime Access",
      description: "One-time payment gives you forever access to course materials and future updates.",
      stats: "Unlimited",
      statLabel: "Access Duration",
    },
    {
      icon: Users,
      title: "Vibrant Community",
      description: "Join 100,000+ learners in our exclusive community for networking and collaboration.",
      stats: "100K+",
      statLabel: "Active Members",
    }
  ];

  return (
    <section className="py-24 px-6 bg-white text-slate-900 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight text-slate-900">
            The Ultimate <span style={{ color: primaryColor }}>Learning</span> Experience
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Join thousands of successful professionals who transformed their careers with our award-winning methodology.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-4 transition-all duration-300 border border-slate-100 hover:border-primary hover:shadow-2xl hover:shadow-[#FFC570]/10 overflow-hidden"
            >
              {/* Feature Icon */}
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundColor: `${primaryColor}15` }}
              >
                <feature.icon style={{ color: primaryColor }} size={28} />
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold mb-3 text-slate-800 transition-colors group-hover:text-black">
                {feature.title}
              </h3>
              <p className="text-slate-500 leading-relaxed mb-2 text-sm">
                {feature.description}
              </p>
              
              {/* Stats Box */}
              <div className="pt-3 border-t border-slate-50">
                <div 
                  className="text-2xl font-black mb-0.5"
                  style={{ color: primaryColor }}
                >
                  {feature.stats}
                </div>
                <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                  {feature.statLabel}
                </div>
              </div>

              {/* Decorative Line on Hover */}
              <div 
                className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500"
                style={{ backgroundColor: primaryColor }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;