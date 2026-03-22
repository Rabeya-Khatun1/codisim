"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

const FAQ = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const primaryColor = "#FFC570";

  const faqs: FAQItem[] = [
    { 
      q: "Can I watch the course lessons later?", 
      a: "Yes, all our courses are pre-recorded. Once you enroll, you get lifetime access to the materials, so you can learn at your own pace anytime." 
    },
    { 
      q: "What are the available payment methods?", 
      a: "We support a wide range of payment options including Credit/Debit Cards, PayPal, and local mobile banking systems like Bkash or Nagad." 
    },
    { 
      q: "Will I receive a certificate for free?", 
      a: "Absolutely! After successfully completing all the modules and assignments of a course, you can download your digital certificate at no extra cost." 
    },
    { 
      q: "Is there any support if I get stuck?", 
      a: "Yes! Each course has a dedicated community forum and weekly live Q&A sessions where you can get help from instructors and peers." 
    }
  ];

  return (
    <section className="pb-20 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span style={{ color: primaryColor }} className="text-sm font-bold tracking-[0.2em] uppercase mb-3 block">
            Support Center
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Frequently Asked <span style={{ color: primaryColor }}>Questions</span>
          </h2>
          <p className="text-slate-500 text-lg">
            Everything you need to know about the courses and our platform.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div 
                key={index} 
                className={`group border rounded-[1.5rem] transition-all duration-300 ${
                  isOpen 
                  ? 'border-slate-200 shadow-xl shadow-slate-100' 
                  : 'border-slate-100 hover:border-slate-200'
                }`}
              >
                <button 
                  className="w-full text-left p-6 md:p-8 flex justify-between items-center gap-4 outline-none"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                >
                  <span className={`text-lg font-bold transition-colors ${isOpen ? 'text-slate-900' : 'text-slate-700 group-hover:text-slate-900'}`}>
                    {faq.q}
                  </span>
                  <div 
                    className={`p-2 rounded-full transition-all duration-300 ${isOpen ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-400'}`}
                    style={isOpen ? { backgroundColor: primaryColor, color: '#000' } : {}}
                  >
                    <ChevronDown 
                      size={20} 
                      className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </div>
                </button>

                {/* Animated Answer Section */}
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 md:px-8 pb-8 text-slate-500 leading-relaxed text-base border-t border-slate-50 pt-4">
                    {faq.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center p-8 rounded-[2rem] bg-slate-50 border border-slate-100">
          <p className="text-slate-600 font-medium">
            Still have questions? 
            <button className="ml-2 font-bold underline hover:text-slate-900 transition-colors">
              Contact our support team
            </button>
          </p>
        </div>

      </div>
    </section>
  );
};

export default FAQ;