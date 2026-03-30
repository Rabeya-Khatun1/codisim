"use client";

import {
  Menu,
  X,
  Home,
  BookOpen,
  Users,
  LayoutDashboard,
  LogIn,
} from "lucide-react";
import React, { useState } from "react";
import Button from "../buttons/Button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Logo from "../common/Logo";
import { usePathname } from "next/navigation";
import UserProfile from "../ui/UserProfile";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const {data:session, status } = useSession();

  const navLinks = [
    { name: "Home", href: "/", icon: <Home size={20} /> },
    { name: "Courses", href: "/courses", icon: <BookOpen size={20} /> },
    { name: "Contact", href: "/contact", icon: <Users size={20} /> },
    { name: "About", href: "/about", icon: <LayoutDashboard size={20} /> },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Logo />

          {/* Desktop - Icon on Top, Name on Bottom */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`flex flex-col items-center justify-center min-w-[70px] py-2 transition-all duration-300 rounded-xl ${
                  pathname === link.href
                    ? "text-[#FFC570]"
                    : "text-gray-500 hover:text-[#FFC570] hover:bg-orange-50/50"
                }`}
              >
                <div className={`transition-transform duration-300 ${pathname === link.href ? "scale-110" : "group-hover:scale-110"}`}>
                  {link.icon}
                </div>
                <span className="text-[11px] font-bold mt-1 uppercase tracking-wider">
                  {link.name}
                </span>

                {/* Indicator Dot */}
                {pathname === link.href && (
                  <span className="absolute -bottom-1 w-1 h-1 bg-[#FFC570] rounded-full" />
                )}
              </Link>
            ))}

            {/* Auth Section */}
            <div className="pl-6 border-l border-gray-100 ml-4">
              {status === "loading" ? (
                <div className="h-10 w-10 bg-gray-100 animate-pulse rounded-full" />
              ) : status === "authenticated" ? (
                <UserProfile />
              ) : (
                <Link href="/login">
                  <Button className="flex items-center gap-2 bg-[#FFC570] text-slate-950 px-7 py-3 rounded-2xl font-bold hover:bg-orange-400 shadow-sm active:scale-95 transition-all">
                    <LogIn size={18} />
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
             {status === "authenticated" && <UserProfile />}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-50 shadow-2xl animate-in slide-in-from-top duration-300">
          <div className="px-6 py-8 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-4 p-4 rounded-2xl font-semibold transition-all ${
                  pathname === link.href 
                  ? "bg-orange-50 text-[#FFC570] shadow-inner" 
                  : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <div className="p-2 bg-white rounded-lg shadow-sm">{link.icon}</div>
                <span className="text-lg">{link.name}</span>
              </Link>
            ))}

            {!session && status !== "loading" && (
              <div className="pt-6 border-t border-gray-100">
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full flex items-center justify-center gap-2 bg-[#FFC570] text-slate-950 py-4 rounded-2xl font-bold shadow-md">
                    <LogIn size={20} />
                    Login
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;