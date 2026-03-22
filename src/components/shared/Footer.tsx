import React from 'react';

const Footer = () => {
    return (
             <section className="bg-gray-900 text-gray-300 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">L</span>
                </div>
                <span className="font-bold text-xl text-white">LearnHub</span>
              </div>
              <p className="text-sm">বাংলাদেশের সেরা অনলাইন লার্নিং প্ল্যাটফর্ম</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">কোম্পানি</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">আমাদের সম্পর্কে</a></li>
                <li><a href="#" className="hover:text-white transition">ক্যারিয়ার</a></li>
                <li><a href="#" className="hover:text-white transition">ব্লগ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">সাপোর্ট</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">হেল্প সেন্টার</a></li>
                <li><a href="#" className="hover:text-white transition">যোগাযোগ</a></li>
                <li><a href="#" className="hover:text-white transition">প্রাইভেসি পলিসি</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">কানেক্ট</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">ফেসবুক</a></li>
                <li><a href="#" className="hover:text-white transition">লিংকডইন</a></li>
                <li><a href="#" className="hover:text-white transition">ইউটিউব</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2024 LearnHub. All rights reserved.</p>
          </div>
        </div>
      </section>
    );
};

export default Footer;