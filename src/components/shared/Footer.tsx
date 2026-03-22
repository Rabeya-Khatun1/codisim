import React from 'react';
import { Facebook, Linkedin, Youtube, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16 px-6 border-t border-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <span className="font-bold text-2xl text-white tracking-tight">LearnHub</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Empowering learners across the globe with world-class online education and expert mentorship.
            </p>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-widest">Company</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Success Stories</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Our Blog</a></li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-widest">Support</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Contact Support</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Social/Connect Column */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-widest">Connect</h4>
            <div className="flex gap-4 mb-6">
              <a href="#" className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                <Youtube size={18} />
              </a>
            </div>
            <p className="text-xs">Subscribe to our newsletter for updates.</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-900 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs tracking-wide">
          <p>&copy; {new Date().getFullYear()} LearnHub. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;