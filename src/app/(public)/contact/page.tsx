"use client"
import React from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

const Contact = () => {
    return (
        <section className="py-20 px-6 bg-white" id="contact">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    
                    {/* Left Side: Contact Information */}
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
                        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">Full Name</label>
                                    <input 
                                        type="text" 
                                        placeholder="John Doe" 
                                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-[#FFC570] focus:ring-4 focus:ring-[#FFC570]/10 transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">Email Address</label>
                                    <input 
                                        type="email" 
                                        placeholder="john@example.com" 
                                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-[#FFC570] focus:ring-4 focus:ring-[#FFC570]/10 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Subject</label>
                                <input 
                                    type="text" 
                                    placeholder="How can we help?" 
                                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-[#FFC570] focus:ring-4 focus:ring-[#FFC570]/10 transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Message</label>
                                <textarea 
                                    rows={4}
                                    placeholder="Write your message here..." 
                                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-[#FFC570] focus:ring-4 focus:ring-[#FFC570]/10 transition-all resize-none"
                                ></textarea>
                            </div>

                            <button className="w-full bg-[#FFC570] text-slate-950 font-bold py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-orange-400 hover:shadow-xl hover:shadow-orange-100 transition-all active:scale-[0.98]">
                                <Send size={20} />
                                Send Message
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Contact;