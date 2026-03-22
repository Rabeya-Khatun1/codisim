"use client";

import React, { useState } from 'react';
import { 

  Star,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
} from 'lucide-react';
import Hero from './Hero';
import Features from './Features';
import Courses from './Courses';
import Button from '../buttons/Button';
import Testimonial from './Testimonial';
import FAQ from './FAQ';
import CTASection from './CTA';

interface FAQItem {
  q: string;
  a: string;
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image: string;
}

const LMSHomePage: React.FC = () => {


  return (
    <div className="bg-gradient-to-b from-gray-50 to-white font-sans">
      {/* Hero Section */}
<Hero></Hero>

      {/* Features Section */}
<Features></Features>

      {/* Courses Section */}
    
<Courses></Courses>
      {/* Testimonials Section */}
 <Testimonial></Testimonial>

      {/* FAQ Section */}
 <FAQ></FAQ>

      {/* CTA Section */}
      <CTASection></CTASection>
    </div>
  );
};

export default LMSHomePage;