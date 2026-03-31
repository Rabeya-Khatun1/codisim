"use client"
import { Send } from 'lucide-react';
import React from 'react';

const ContactForm = () => {
    return (
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
    );
};

export default ContactForm;