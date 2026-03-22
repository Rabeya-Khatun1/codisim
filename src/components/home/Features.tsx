import React from 'react';

const Features = () => {
    return (
            <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">কেন আমাদের প্ল্যাটফর্ম সেরা?</h2>
          <div className="h-1 w-20 bg-blue-600 mx-auto mt-4 rounded-full"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "লাইভ সাপোর্ট", desc: "প্রতিদিন নির্দিষ্ট সময়ে আমাদের সাপোর্ট টিমের সাথে লাইভ মিটিং।" },
            { title: "আপডেটেড কারিকুলাম", desc: "সবসময় লেটেস্ট টেকনোলজি এবং ইন্ডাস্ট্রি স্ট্যান্ডার্ড মেনে কোর্স।" },
            { title: "জব প্লেসমেন্ট", desc: "ভালো রেজাল্ট করা শিক্ষার্থীদের জন্য ইন্টার্নশিপ ও জবের সুযোগ।" }
          ].map((feature, index) => (
            <div key={index} className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl mb-6 font-bold">
                0{index + 1}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    );
};

export default Features;