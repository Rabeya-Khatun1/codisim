"use client"
import { Menu, X } from 'lucide-react';
import React, { useState } from 'react';
import Button from '../buttons/Button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Courses', href: '#' },
    { name: 'Mentors', href: '#' },
    { name: 'Blog', href: '#' },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100 transition-all duration-300">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex justify-between items-center h-20"> 
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="w-11 h-11 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform duration-300">
              <span className="text-white font-bold text-2xl uppercase tracking-tighter">L</span>
            </div>
            <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              LearnHub
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                className="text-[15px] font-semibold text-gray-600 hover:text-blue-600 transition-colors relative group"
              >
                {link.name}
  
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </a>
            ))}
            
            <Button className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold text-[15px] hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-100 active:scale-95 transition-all">
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
                className="block px-4 py-4 text-lg font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-2xl transition-all"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-6 px-4">
              <Button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg">
                Login
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;