import React, { useState } from 'react';

const FAQ = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
    interface FAQItem {
      q: string;
      a: string;
    }

  const faqs: FAQItem[] = [
    { q: "কোর্সগুলো কি আমি পরে দেখতে পারব?", a: "হ্যাঁ, আমাদের সব কোর্স রেকর্ডেড থাকে এবং আপনি আপনার সুবিধামতো সময়ে দেখতে পারবেন।" },
    { q: "পেমেন্ট কিভাবে করব?", a: "বিকাশ, নগদ বা যেকোনো কার্ডের মাধ্যমে আপনি পেমেন্ট করতে পারবেন।" },
    { q: "সার্টিফিকেট কি ফ্রিতে পাব?", a: "হ্যাঁ, কোর্স সফলভাবে শেষ করার পর আপনি ডিজিটাল সার্টিফিকেট ডাউনলোড করতে পারবেন।" }
  ];

    return (
            <section className="py-20 px-6 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">সচরাচর জিজ্ঞাসা</h2>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-xl bg-white overflow-hidden shadow-sm">
              <button 
                className="w-full text-left p-5 font-bold flex justify-between items-center hover:bg-gray-50 transition"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <span>{faq.q}</span>
                <span className={`transform transition-transform ${openFaq === index ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              {openFaq === index && (
                <div className="p-5 bg-blue-50/50 border-t border-gray-100 text-gray-600 leading-relaxed animate-fadeIn">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    );
};

export default FAQ;