import Link from 'next/link';
import React from 'react';

const Logo = () => {
    return (
           <Link href={'/'} className="flex items-center space-x-3">
            <div className="w-11 h-11 bg-[#FFC570] rounded-2xl flex items-center justify-center">
              <span className="text-slate-900 font-bold text-2xl">L</span>
            </div>
            <span className="font-extrabold text-2xl bg-blue-500 bg-clip-text text-transparent">
              LearnHub
            </span>
          </Link>
    );
};

export default Logo;