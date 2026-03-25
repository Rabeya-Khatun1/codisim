"use client";

import {
  Menu,
  X,
  Home,
  BookOpen,
  Users,
  LayoutDashboard,
  LogIn,
  LogOut,
  Moon,
  Sun,
  User,
} from "lucide-react";
import React, { useState } from "react";
import Button from "../buttons/Button";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Logo from "../common/Logo";
import Image from "next/image";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const { data: session, status } = useSession();

  const navLinks = [
    { name: "Home", href: "/", icon: <Home size={18} /> },
    { name: "Courses", href: "/courses", icon: <BookOpen size={18} /> },
    { name: "Contact", href: "/contact", icon: <Users size={18} /> },
    { name: "About", href: "/about", icon: <LayoutDashboard size={18} /> },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Logo />

          {/* Desktop */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="flex items-center gap-2 text-gray-600 hover:text-[#FFC570]"
              >
                {link.icon}
                {link.name}
              </Link>
            ))}

            {/* Auth Section */}
            {status === "loading" ? (
              <div className="text-gray-400">Loading...</div>
            ) : status === "authenticated" ? (
              <div className="relative">
                {/* Avatar / User Icon + Name + Role */}
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  {session && (
                    <User
                      size={40}
                      className="text-gray-400 border rounded-full p-1"
                    />
                  )}

                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-700">
                      {session?.user?.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {session?.user?.role}
                    </p>
                  </div>
                </div>

                {/* Dropdown */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white shadow-xl rounded-xl p-3 space-y-2 z-50">
                    <Link href="/dashboard">
                      <div className="cursor-pointer hover:bg-gray-100 p-2 rounded-lg">
                        Dashboard
                      </div>
                    </Link>

                    <div
                      onClick={() => setDarkMode(!darkMode)}
                      className="cursor-pointer hover:bg-gray-100 p-2 rounded-lg flex items-center gap-2"
                    >
                      {darkMode ? <Sun size={16} /> : <Moon size={16} />}
                      Toggle Theme
                    </div>

                    <div
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="cursor-pointer hover:bg-red-100 text-red-500 p-2 rounded-lg flex items-center gap-2"
                    >
                      <LogOut size={16} />
                      Logout
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login">
                <Button className="flex items-center gap-2 bg-[#FFC570] text-slate-950 px-8 py-3 rounded-2xl font-bold hover:bg-orange-400">
                  <LogIn size={18} />
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-6 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="flex items-center gap-3 text-gray-700"
              >
                {link.icon}
                {link.name}
              </Link>
            ))}

            {/* Mobile Auth */}
            {status === "loading" ? (
              <div>Loading...</div>
            ) : status === "authenticated" ? (
              <div className="space-y-3">
                <Link href="/dashboard">
                  <div className="p-2 bg-gray-100 rounded-lg flex items-center gap-2">
                    <User size={20} />
                    Dashboard
                  </div>
                </Link>

                <div
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 bg-gray-100 rounded-lg flex items-center gap-2"
                >
                  {darkMode ? <Sun size={16} /> : <Moon size={16} />}
                  Toggle Theme
                </div>

                <div
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="p-2 bg-red-100 text-red-500 rounded-lg flex items-center gap-2"
                >
                  <LogOut size={16} />
                  Logout
                </div>
              </div>
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