import React from 'react';

const Hero = () => {
    return (
      <section className="relative bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            শিখুন নতুন কিছু, <br /> গড়ুন নিজের ভবিষ্যৎ
          </h1>
          <p className="text-lg md:text-xl mb-10 text-blue-100">
            দেশের সেরা মেন্টরদের সাথে নিয়ে শুরু করুন আপনার লার্নিং জার্নি। আজই এনরোল করুন।
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-blue-700 px-10 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg">
              কোর্সগুলো দেখুন
            </button>
            <button className="border-2 border-white/30 backdrop-blur-sm px-10 py-4 rounded-xl font-bold hover:bg-white hover:text-blue-700 transition-all">
              ফ্রি সেমিনার
            </button>
          </div>
        </div>
      </section>
    );
};

export default Hero;