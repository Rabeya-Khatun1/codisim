import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';
import React, { ReactNode } from 'react';

const Home: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <>
          <header><Navbar></Navbar></header>
        <main className="pt-20">{children}</main>
        <footer><Footer></Footer></footer>
        </>
   
    );
};

export default Home;