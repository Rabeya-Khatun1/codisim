"use client"
import { Menu, X, Home, BookOpen, Users, LayoutDashboard, LogIn } from 'lucide-react';
import React, { useState } from 'react';
import Button from '../buttons/Button';
import Link from 'next/link';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/', icon: <Home size={18} /> },
    { name: 'Courses', href: '/courses', icon: <BookOpen size={18} /> },
    { name: 'Contact', href: '/contact', icon: <Users size={18} /> },
    { name: 'About', href: '/about', icon: <LayoutDashboard size={18} /> },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100 transition-all duration-300">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="flex justify-between items-center h-20"> 
          
          {/* Logo Section */}
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="w-11 h-11 bg-[#FFC570] rounded-2xl flex items-center justify-center shadow-lg shadow-[#FFC570]/20 group-hover:rotate-6 transition-transform duration-300">
              <span className="text-slate-900 font-bold text-2xl uppercase tracking-tighter">L</span>
            </div>
            <span className="font-extrabold text-2xl tracking-tight bg-blue-500 bg-clip-text text-transparent">
              LearnHub
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                className="flex items-center gap-2 text-[15px] font-semibold text-gray-600 hover:text-[#FFC570] transition-colors relative group"
              >
                {link.icon}
                {link.name}
                {/* Underline Hover Effect */}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FFC570] transition-all group-hover:w-full"></span>
              </a>
            ))}
            
            <Button className="flex items-center gap-2 bg-[#FFC570] text-slate-950 px-8 py-3 rounded-2xl font-bold text-[15px] hover:bg-orange-400 hover:shadow-xl hover:shadow-orange-100 active:scale-95 transition-all">
              <LogIn size={18} />
              Login
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              className="text-gray-600 hover:bg-gray-100 p-3 rounded-2xl transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="px-6 pt-4 pb-10 space-y-2">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                className="flex items-center gap-4 px-4 py-4 text-lg font-semibold text-gray-700 hover:bg-orange-50 hover:text-[#FFC570] rounded-2xl transition-all border-2 border-transparent hover:border-[#FFC570]"
              >
                <span className="text-[#FFC570]">{link.icon}</span>
                {link.name}
              </a>
            ))}
            <div className="pt-6 px-4">
              <Link href={'/login'}><Button className="w-full flex items-center justify-center gap-3 bg-[#FFC570] text-slate-950 py-4 rounded-2xl font-bold text-lg shadow-lg shadow-orange-100">
                <LogIn size={20} />
                Login
              </Button></Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;