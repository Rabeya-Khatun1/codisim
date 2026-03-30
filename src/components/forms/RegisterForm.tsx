"use client";

import { useForm } from "react-hook-form";
import { IUser, postUser } from "@/app/api/register/route";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Lock, User, Phone, Briefcase, Loader2, ArrowRight, CheckCircle2 } from "lucide-react";
import Logo from "../common/Logo";

const registerSchema = z.object({
  username: z.string().min(3, "Min 3 characters"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(11, "Invalid phone"),
  role: z.enum(["student", "teacher"]),
  password: z.string().min(6, "Min 6 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "No match",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true);
    try {
      const result = await postUser({
        name: data.username,
        email: data.email,
        password: data.password,
        role: data.role,
        phone: data.phone,
        status: "pending",
        createdAt: new Date().toISOString(),
      });
      if (result.success) {
        reset();
        router.push("/login");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen w-full flex bg-white overflow-hidden fixed inset-0">
      
      {/* Left Side (Branding) */}
      <div className="hidden lg:flex w-[40%] h-full relative bg-[#0F172A] items-center justify-center p-12">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-[#FFC570]/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-5%] left-[-5%] w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 w-full max-w-md">
          <Logo />
          <h2 className="text-4xl font-black text-white leading-tight mt-8 mb-6">
            Start Your <br />
            <span className="text-[#FFC570]">Learning Journey</span>
          </h2>
          <div className="space-y-4">
            {["Premium Courses", "Expert Mentors", "Certificates"].map((text, i) => (
              <div key={i} className="flex items-center gap-3 text-slate-300 font-medium text-sm">
                <CheckCircle2 size={18} className="text-[#FFC570]" />
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side (Form) */}
      <div className="w-full lg:w-[60%] h-full flex flex-col items-center justify-center bg-white relative">
        
        {/* Inner Scrollable Container - No margins, pure padding control */}
        <div className="w-full max-w-2xl px-6 md:px-16 py-4 overflow-y-auto max-h-full scrollbar-hide">
          <div className="mb-8">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Create Account.</h1>
            <p className="text-slate-500 text-sm font-medium">Join our community today.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Fields */}
              {[
                { id: "username", label: "Full Name", icon: <User size={18}/>, type: "text" },
                { id: "email", label: "Email Address", icon: <Mail size={18}/>, type: "email" },
                { id: "phone", label: "Phone Number", icon: <Phone size={18}/>, type: "tel" },
              ].map((field) => (
                <div key={field.id} className="relative group">
                  <input
                    {...register(field.id as any)}
                    type={field.type}
                    placeholder={field.label}
                    className="w-full pl-5 pr-12 py-3.5 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-[#FFC570] outline-none transition-all"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#FFC570]">
                    {field.icon}
                  </div>
                  {errors[field.id as keyof RegisterFormData] && (
                    <p className="text-[10px] text-red-500 mt-1 ml-2 font-bold uppercase tracking-wider">
                      {errors[field.id as keyof RegisterFormData]?.message}
                    </p>
                  )}
                </div>
              ))}

              {/* Role Select */}
              <div className="relative group">
                <select
                  {...register("role")}
                  className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-[#FFC570] outline-none appearance-none text-slate-600 font-medium"
                >
                  <option value="">Select Role</option>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </select>
                <Briefcase className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={18} />
              </div>

              {/* Passwords */}
              {["password", "confirmPassword"].map((p) => (
                <div key={p} className="relative group">
                  <input
                    {...register(p as any)}
                    type="password"
                    placeholder={p === "password" ? "Password" : "Confirm Password"}
                    className="w-full pl-5 pr-12 py-3.5 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-[#FFC570] outline-none transition-all"
                  />
                  <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#FFC570]" size={18} />
                </div>
              ))}
            </div>

            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full bg-[#FFC570] text-slate-950 py-4 rounded-xl font-black shadow-lg shadow-orange-100 hover:scale-[1.01] transition-all flex items-center justify-center gap-3 active:scale-[0.98] mt-2"
            >
              {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <>Sign Up <ArrowRight size={18} /></>}
            </button>
          </form>

          <p className="mt-8 text-center text-slate-500 text-sm font-medium">
            Member already?{" "}
            <Link href="/login" className="text-slate-900 font-black hover:text-[#FFC570] transition-colors">
              Sign In.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;