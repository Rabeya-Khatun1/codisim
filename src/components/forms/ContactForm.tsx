"use client";

import { Send } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/* ✅ VALIDATION */
const schema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name is too long")
    .regex(/^[a-zA-Z\s]+$/, "Only letters allowed"),

  email: z.string().email("Invalid email address"),

  subject: z
    .string()
    .min(3, "Subject is too short")
    .max(100, "Subject is too long"),

  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(500, "Message is too long"),
});

type FormData = z.infer<typeof schema>;

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    reset();
    alert("Message sent successfully!");
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* NAME */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Full Name</label>
          <input
            {...register("name")}
            type="text"
            placeholder="John Doe"
            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-[#FFC570] focus:ring-4 focus:ring-[#FFC570]/10 transition-all"
          />
          {errors.name && (
            <p className="text-red-500 text-xs">{errors.name.message}</p>
          )}
        </div>

        {/* EMAIL */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Email Address</label>
          <input
            {...register("email")}
            type="email"
            placeholder="john@example.com"
            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-[#FFC570] focus:ring-4 focus:ring-[#FFC570]/10 transition-all"
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* SUBJECT */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700">Subject</label>
        <input
          {...register("subject")}
          type="text"
          placeholder="How can we help?"
          className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-[#FFC570] focus:ring-4 focus:ring-[#FFC570]/10 transition-all"
        />
        {errors.subject && (
          <p className="text-red-500 text-xs">{errors.subject.message}</p>
        )}
      </div>

      {/* MESSAGE */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700">Message</label>
        <textarea
          {...register("message")}
          rows={4}
          placeholder="Write your message here..."
          className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-[#FFC570]/10 transition-all resize-none"
        ></textarea>
        {errors.message && (
          <p className="text-red-500 text-xs">{errors.message.message}</p>
        )}
      </div>

      {/* BUTTON */}
      <button
        type="submit"
        className="w-full bg-[#FFC570] text-slate-950 font-bold py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-orange-400 hover:shadow-xl hover:shadow-orange-100 transition-all active:scale-[0.98]"
      >
        <Send size={20} />
        Send Message
      </button>
    </form>
  );
};

export default ContactForm;