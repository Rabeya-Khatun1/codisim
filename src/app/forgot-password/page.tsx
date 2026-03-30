"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { Mail, Loader2, ArrowLeft, Send, CheckCircle2 } from "lucide-react";
import Logo from "@/components/common/Logo";
import Button from "@/components/buttons/Button";

const forgotSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotFormData = z.infer<typeof forgotSchema>;

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ForgotFormData>({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit = async (data: ForgotFormData) => {
    setIsLoading(true);
    // Simulation: Replace with your actual API call
    try {
      console.log("Reset link requested for:", data.email);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Delay
      setIsSent(true);
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex bg-white overflow-hidden fixed inset-0">
      
      {/* Left Side: Visual Branding */}
      <div className="hidden lg:flex w-[35%] h-full relative bg-[#0F172A] items-center justify-start p-12 ">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#FFC570] rounded-full blur-[130px]" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-600 rounded-full blur-[130px]" />
        </div>

        <div className="relative z-10">
          <Logo />
          <h2 className="text-4xl font-extrabold text-white mt-8 mb-4">Securing Your Account.</h2>
          <p className="text-slate-400 text-sm font-medium leading-relaxed">
            Don't worry, it happens to the best of us. <br />
            Let's get you back into your workspace.
          </p>
        </div>
      </div>

      {/* Right Side: Reset Form */}
      <div className="w-full lg:w-[65%] h-full flex flex-col items-center justify-center bg-white relative">
        <div className="w-full max-w-md px-6 md:px-10 py-4">
          
          <Link 
            href="/login" 
            className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-900 font-bold text-xs uppercase tracking-widest transition-colors mb-10 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Login
          </Link>

          {!isSent ? (
            <>
              <div className="mb-8">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Reset Password.</h1>
                <p className="text-slate-500 text-sm font-medium">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-wider">
                    Registered Email
                  </label>
                  <div className="relative group">
                    <input
                      type="email"
                      placeholder="name@example.com"
                      {...register("email")}
                      className={`w-full pl-5 pr-12 py-4 bg-slate-50 border ${errors.email ? 'border-red-300' : 'border-transparent'} rounded-2xl focus:ring-2 focus:ring-[#FFC570] focus:bg-white outline-none transition-all font-medium`}
                    />
                    <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#FFC570]" size={20} />
                  </div>
                  {errors.email && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.email.message}</p>}
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-4 rounded-2xl font-black transition-all flex items-center justify-center gap-2 ${
                    isLoading ? "bg-slate-200 text-slate-500" : "bg-[#FFC570] text-slate-900 shadow-lg shadow-orange-100 hover:scale-[1.01] active:scale-[0.98]"
                  }`}
                >
                  {isLoading ? <Loader2 className="animate-spin" size={20} /> : <>Send Reset Link <Send size={16} /></>}
                </Button>
              </form>
            </>
          ) : (
            /* Success State */
            <div className="text-center py-10 animate-in fade-in zoom-in duration-500">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={40} className="text-green-500" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 mb-3">Check your inbox!</h2>
              <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8">
                We have sent a password reset link to your email. <br />
                Please check your email and follow the instructions.
              </p>
              <Link href="/login">
                <Button className="w-full py-4 rounded-2xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all">
                  Return to Login
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;