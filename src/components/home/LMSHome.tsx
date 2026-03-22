


"use client";

import React, { useState } from 'react';
import { 

  Star,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
} from 'lucide-react';
import Hero from './Hero';
import Features from './Features';
import Courses from './Courses';

interface FAQItem {
  q: string;
  a: string;
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image: string;
}

const LMSHomePage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const faqs: FAQItem[] = [
    { q: "কোর্সগুলো কি আমি পরে দেখতে পারব?", a: "হ্যাঁ, আমাদের সব কোর্স রেকর্ডেড থাকে এবং আপনি আপনার সুবিধামতো সময়ে দেখতে পারবেন। লাইফটাইম অ্যাক্সেস পাবেন।" },
    { q: "পেমেন্ট কিভাবে করব?", a: "বিকাশ, নগদ, রকেট, ব্যাংক কার্ড বা অনলাইন ব্যাংকিং এর মাধ্যমে খুব সহজেই পেমেন্ট করতে পারবেন। EMI সুবিধাও রয়েছে।" },
    { q: "সার্টিফিকেট কি ফ্রিতে পাব?", a: "হ্যাঁ, কোর্স সফলভাবে শেষ করার পর আপনি ডিজিটাল সার্টিফিকেট ডাউনলোড করতে পারবেন। এটি আন্তর্জাতিকভাবে স্বীকৃত।" },
    { q: "কোর্স কমপ্লিট করতে কত দিন লাগে?", a: "আপনার নিজের সময় অনুযায়ী কোর্সটি সম্পন্ন করতে পারবেন। গড়ে ২-৩ মাস সময় লাগে যদি সপ্তাহে ১০-১২ ঘন্টা সময় দেন।" }
  ];

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "আরিফ আহমেদ",
      role: "ফুল-স্ট্যাক ডেভেলপার",
      company: "টেক-আইটি",
      content: "আমি জিরো নলেজ নিয়ে শুরু করেছিলাম। মেন্টরদের গাইডলাইন এবং প্রজেক্ট বেসড লার্নিং আমাকে এখন একজন প্রফেশনাল হিসেবে গড়ে তুলেছে।",
      rating: 5,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
    },
    {
      id: 2,
      name: "নুসরাত জাহান",
      role: "UI/UX ডিজাইনার",
      company: "ডিজাইন হাব",
      content: "কোর্সের কোয়ালিটি অসাধারণ! প্রতিটি লেসনে প্র্যাকটিক্যাল প্রজেক্ট থাকে যা রিয়েল লাইফে কাজে লাগে।",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
    },
    {
      id: 3,
      name: "রাকিব হোসেন",
      role: "মার্কেটিং ম্যানেজার",
      company: "ব্র্যান্ডওয়েভ",
      content: "ডিজিটাল মার্কেটিং কোর্সটি আমার ক্যারিয়ারকে নতুন উচ্চতায় নিয়ে গেছে। থ্যাঙ্কস টিম!",
      rating: 4,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
    }
  ];

   const renderStars = (rating: number) => {
     return [...Array(5)].map((_, i) => (
       <Star 
         key={i} 
         size={16} 
         className={i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
       />
     ));
   };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                LearnHub
              </span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600 transition">হোম</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition">কোর্স</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition">মেন্টরস</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition">ব্লগ</a>
              <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
                লগইন
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-200">
            <div className="px-4 py-3 space-y-3">
              <a href="#" className="block text-gray-700 hover:text-blue-600">হোম</a>
              <a href="#" className="block text-gray-700 hover:text-blue-600">কোর্স</a>
              <a href="#" className="block text-gray-700 hover:text-blue-600">মেন্টরস</a>
              <a href="#" className="block text-gray-700 hover:text-blue-600">ব্লগ</a>
              <button className="w-full bg-blue-600 text-white px-5 py-2 rounded-lg">
                লগইন
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
<Hero></Hero>

      {/* Features Section */}
<Features></Features>

      {/* Courses Section */}
    
<Courses></Courses>
      {/* Testimonials Section */}
      <section className="py-20 bg-indigo-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll" id="testimonials-title">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">শিক্ষার্থীদের সাফল্যের গল্প</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              ১ লাখ+ শিক্ষার্থী আমাদের সাথে শিখে তাদের ক্যারিয়ার গড়েছে
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id} 
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all animate-on-scroll"
                id={`testimonial-${testimonial.id}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                    <p className="text-xs text-blue-600">{testimonial.company}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="text-gray-600 italic leading-relaxed">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll" id="faq-title">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">সচরাচর জিজ্ঞাসা</h2>
            <p className="text-gray-600">আপনার মনে প্রশ্ন থাকলে এখানে দেখুন</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="border border-gray-200 rounded-xl bg-white overflow-hidden shadow-sm hover:shadow-md transition animate-on-scroll"
                id={`faq-${index}`}
              >
                <button 
                  className="w-full text-left p-6 font-semibold flex justify-between items-center hover:bg-gray-50 transition"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="text-lg">{faq.q}</span>
                  <ChevronDown 
                    size={20} 
                    className={`transform transition-transform ${openFaq === index ? 'rotate-180' : ''}`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">আজই আপনার লার্নিং জার্নি শুরু করুন</h2>
          <p className="text-blue-100 text-lg mb-8">
            জয়েন করুন আজই এবং পেয়ে যান ৭ দিনের ফ্রি ট্রায়াল
          </p>
          <button className="bg-white text-blue-600 px-10 py-4 rounded-xl font-bold hover:shadow-xl transition-all inline-flex items-center gap-2">
            ফ্রি ট্রায়াল শুরু করুন
            <ArrowRight size={20} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default LMSHomePage;