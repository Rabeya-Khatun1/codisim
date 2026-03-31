import React from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { Metadata } from 'next';
import ContactForm from '@/components/forms/ContactForm';

export const metadata: Metadata = {
  title: "Contact With Us",
  description: "Get in touch with Learn Hub. We are here to help you with any questions.",
  openGraph: {
    title: "Contact Learn Hub",
    description: "Send us a message and we will respond quickly.",
    url: "https://learnhub-fawn.vercel.app/contact",
    siteName: "Learn Hub",
    type: "website",
    images: [
      {
        url: "/public/contact.png", 
        width: 1200,
        height: 630,
        alt: "Contact Learn Hub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Learn Hub",
    description: "We are ready to help you anytime.",
    images: ["/public/contact.png"],
  },
};


const Contact = () => {
    return (
        <section className="py-20 px-6 bg-white" id="contact">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
                                Get in <span className="text-[#FFC570]">Touch</span>
                            </h2>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Have questions about our courses or mentorship programs? 
                                Reach out to us and our team will get back to you within 24 hours.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start gap-5 group">
                                <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-[#FFC570] group-hover:bg-[#FFC570] group-hover:text-white transition-all duration-300">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-lg">Email Us</h4>
                                    <p className="text-gray-600">support@learnhub.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-5 group">
                                <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-[#FFC570] group-hover:bg-[#FFC570] group-hover:text-white transition-all duration-300">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-lg">Call Us</h4>
                                    <p className="text-gray-600">+880 1234 567 890</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-5 group">
                                <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-[#FFC570] group-hover:bg-[#FFC570] group-hover:text-white transition-all duration-300">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-lg">Visit Office</h4>
                                    <p className="text-gray-600">123 Education Street, Digital Park, Dhaka</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Contact Form */}
                    <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl shadow-slate-200/50 border border-slate-100">
                       <ContactForm></ContactForm>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Contact;