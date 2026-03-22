import React from 'react';

const Testimonial = () => {
    return (
              <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12">সফল শিক্ষার্থীদের গল্প</h2>
            <div className="relative p-8 md:p-12 bg-slate-50 rounded-3xl">
                <span className="absolute top-4 left-6 text-6xl text-blue-200 font-serif">“</span>
                <p className="text-lg md:text-xl text-gray-700 italic relative z-10">
                    "আমি জিরো নলেজ নিয়ে শুরু করেছিলাম। মেন্টরদের গাইডলাইন এবং প্রজেক্ট বেসড লার্নিং আমাকে এখন একজন প্রফেশনাল হিসেবে গড়ে তুলেছে।"
                </p>
                <div className="mt-8">
                    <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4"></div>
                    <h4 className="font-bold text-gray-900">আরিফ আহমেদ</h4>
                    <p className="text-sm text-gray-500 font-medium">ফুল-স্ট্যাক ডেভেলপার @ টেক-আইটি</p>
                </div>
            </div>
        </div>
      </section>
    );
};

export default Testimonial;