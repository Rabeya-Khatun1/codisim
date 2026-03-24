"use client"
import { Menu, X, Home, BookOpen, Users, LayoutDashboard, LogIn, LogOut } from 'lucide-react';
import React, { useState } from 'react';
import Button from '../buttons/Button';
import Link from 'next/link';
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession(); // 🔥 important

  const navLinks = [
    { name: 'Home', href: '/', icon: <Home size={18} /> },
    { name: 'Courses', href: '/courses', icon: <BookOpen size={18} /> },
    { name: 'Contact', href: '/contact', icon: <Users size={18} /> },
    { name: 'About', href: '/about', icon: <LayoutDashboard size={18} /> },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="flex justify-between items-center h-20"> 
          
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 bg-[#FFC570] rounded-2xl flex items-center justify-center">
              <span className="text-slate-900 font-bold text-2xl">L</span>
            </div>
            <span className="font-extrabold text-2xl bg-blue-500 bg-clip-text text-transparent">
              LearnHub
            </span>
          </div>

          {/* Desktop */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="flex items-center gap-2 text-gray-600 hover:text-[#FFC570]">
                {link.icon}
                {link.name}
              </a>
            ))}

            {/* 🔥 LOGIN / LOGOUT TOGGLE */}
            {session ? (
              <Button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex items-center gap-2 bg-red-500 text-white px-8 py-3 rounded-2xl font-bold hover:bg-red-600"
              >
                <LogOut size={18} />
                Logout
              </Button>
            ) : (
              <Link href="/login">
                <Button className="flex items-center gap-2 bg-[#FFC570] text-slate-950 px-8 py-3 rounded-2xl font-bold hover:bg-orange-400">
                  <LogIn size={18} />
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="px-6 py-6 space-y-3">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="flex items-center gap-3">
                {link.icon}
                {link.name}
              </a>
            ))}

            {/* 🔥 MOBILE LOGIN / LOGOUT */}
            {session ? (
              <Button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-3 rounded-xl"
              >
                <LogOut size={18} />
                Logout
              </Button>
            ) : (
              <Link href="/login">
                <Button className="w-full flex items-center justify-center gap-2 bg-[#FFC570] text-slate-950 py-3 rounded-xl">
                  <LogIn size={18} />
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;