"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, Mail, Lock, Loader2, ArrowRight, Zap } from "lucide-react";
import Logo from "../common/Logo";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setServerError(null);
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });
    setIsLoading(false);

    if (result?.error) {
      setServerError("Authentication failed. Please check your credentials.");
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  // Demo Login Handler
  const handleDemoLogin = (email: string) => {
    setValue("email", email);
    setValue("password", "123456"); 

  };

  return (
    <div className="h-screen w-full flex bg-white overflow-hidden fixed inset-0">
      {/* --- Left Side: Creative Visual --- */}
      <div className="hidden lg:flex w-1/2 relative bg-[#0F172A] items-center justify-center p-12">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#FFC570]/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-lg text-center">
          <div className="mb-8 inline-block p-4 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl">
            <Logo />
          </div>
          <h2 className="text-5xl font-extrabold text-white leading-tight mb-6">
            Master New Skills <br /> 
            <span className="text-[#FFC570]">Without Limits.</span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-10">
            Join 10,000+ students worldwide and start your journey today.
          </p>
          
          <div className="grid grid-cols-2 gap-6 text-left">
            <div className="p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
              <p className="text-3xl font-bold text-white">500+</p>
              <p className="text-sm text-slate-400">Courses</p>
            </div>
            <div className="p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
              <p className="text-3xl font-bold text-white">99%</p>
              <p className="text-sm text-slate-400">Success</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- Right Side: Login Form --- */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 md:p-16 relative overflow-y-auto">
        <div className="w-full max-w-[420px]">
          <div className="mb-8">
            <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Login.</h1>
            <p className="text-slate-500 font-medium italic text-sm">
              "The beautiful thing about learning is that no one can take it away from you."
            </p>
          </div>

          {serverError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-xs font-bold animate-shake">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-4">
              <div className="relative group">
                <input
                  {...register("email")}
                  className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#FFC570] outline-none transition-all peer placeholder-transparent"
                  placeholder="Email"
                  id="email"
                />
                <label htmlFor="email" className="absolute left-6 top-4 text-slate-400 pointer-events-none transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#FFC570] peer-focus:bg-white peer-focus:px-2 peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:bg-white peer-not-placeholder-shown:px-2">
                  Email Address
                </label>
                <Mail className="absolute right-6 top-4 text-slate-300 group-focus-within:text-[#FFC570]" size={20} />
                {errors.email && <p className="text-[10px] text-red-500 mt-1 ml-2 font-bold uppercase">{errors.email.message}</p>}
              </div>

              <div className="relative group">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#FFC570] outline-none transition-all peer placeholder-transparent"
                  placeholder="Password"
                  id="password"
                />
                <label htmlFor="password" className="absolute left-6 top-4 text-slate-400 pointer-events-none transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#FFC570] peer-focus:bg-white peer-focus:px-2 peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:bg-white peer-not-placeholder-shown:px-2">
                  Password
                </label>
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-6 top-4 text-slate-300">
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="text-right">
         <Link 
  href="/forgot-password" 
  className="text-xs font-bold text-slate-400 hover:text-[#FFC570]"
>
  Recover Password?
</Link>
            </div>

            <button
              disabled={isLoading}
              className="w-full bg-[#FFC570] text-slate-950 py-4.5 rounded-2xl font-black shadow-lg shadow-orange-100 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              {isLoading ? <Loader2 className="animate-spin" size={22} /> : <>Sign In <ArrowRight size={20} /></>}
            </button>
          </form>

          {/* --- Demo Login Section --- */}
          <div className="mt-8 border-t border-slate-100 pt-8">
            <div className="flex items-center gap-2 mb-4 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
              <Zap size={14} className="text-[#FFC570]" /> Quick Demo Access
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "Admin", email: "admin@demo.com", color: "bg-purple-50 text-purple-600 border-purple-100" },
                { label: "Teacher", email: "teacher@demo.com", color: "bg-blue-50 text-blue-600 border-blue-100" },
                { label: "Student", email: "student@demo.com", color: "bg-green-50 text-green-600 border-green-100" },
              ].map((demo) => (
                <button
                  key={demo.label}
                  onClick={() => handleDemoLogin(demo.email)}
                  className={`px-4 py-2 text-[11px] font-black rounded-xl border ${demo.color} transition-all active:scale-95 hover:opacity-80`}
                >
                  {demo.label}
                </button>
              ))}
            </div>
          </div>

          <p className="mt-10 text-center text-slate-500 font-medium text-sm">
            New here? <Link href="/register" className="text-slate-900 font-black hover:text-[#FFC570]">Create account.</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;