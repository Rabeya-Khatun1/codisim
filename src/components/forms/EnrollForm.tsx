"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";

import {
  User,
  Mail,
  Phone,
  BookOpen,
  HelpCircle,
  CheckCircle,
  ArrowRight,
  Clock,
  Tag,
} from "lucide-react";
import { postEnrollment } from "@/lib/db/enrolments";
const schema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string().min(11, "Valid phone number is required (min 11 digits)"),
  experience: z.string().min(1, "Please select your experience"),
  reason: z.string().min(1, "Please select a reason"),
  question: z.string().optional(),
  commitment: z.boolean().refine((val) => val === true, {
  message: "You must commit to consistency",
}),
});

type FormData = z.infer<typeof schema>;

export default function EnrollmentForm({ course }: { course: any}) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      commitment: false,
    },
  });
  useEffect(() => {
    if (session?.user) {
      setValue("name", session.user.name || "");
      setValue("email", session.user.email || "");
    }
  }, [session, setValue]);

const onSubmit = async (data: FormData) => {
  setLoading(true);
  setSuccess("");

  try {
    const payload = {
        courseId: course?._id?.toString(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      experience: data.experience,
      reason: data.reason,
      question: data.question || "",
      courseName: course.title,
      price: course.price.toString(),
    };

    const result = await postEnrollment(payload);

    if (result.success) {
      setSuccess("Success! Your enrollment is pending approval.");
      reset();
    } else {
      setSuccess("Error: " + result.message);
    }
  } catch (error) {
    setSuccess("Something went wrong. Please try again.");
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#020617] p-4 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT: FORM SECTION */}
        <div className="lg:col-span-2">
          <form 
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-10 shadow-sm space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Complete Enrollment</h2>
              <p className="text-gray-500">Please provide the necessary information to join the batch.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <User size={16} /> Full Name
                </label>
                <input
                  {...register("name")}
                  readOnly 
                  className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-500 cursor-not-allowed outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Mail size={16} /> Email Address
                </label>
                <input
                  {...register("email")}
                  readOnly
                  className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-500 cursor-not-allowed outline-none"
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <label className="text-sm font-semibold flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Phone size={16} /> Phone Number
                </label>
                <input
                  {...register("phone")}
                  placeholder="017XXXXXXXX"
                  className="w-full p-3.5 rounded-xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                />
                {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
              </div>

              {/* Experience Level */}
              <div className="space-y-2">
                <label className="text-sm font-semibold flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <BookOpen size={16} /> Experience Level
                </label>
                <select
                  {...register("experience")}
                  className="w-full p-3.5 rounded-xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  <option value="">Select Level</option>
                  <option value="Beginner">Beginner (No coding knowledge)</option>
                  <option value="Intermediate">Intermediate (Knows basics)</option>
                  <option value="Advanced">Advanced (Want to be professional)</option>
                </select>
                {errors.experience && <p className="text-red-500 text-xs">{errors.experience.message}</p>}
              </div>
            </div>

            {/* Why Enroll */}
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <CheckCircle size={16} /> Why do you want to enroll?
              </label>
              <select
                {...register("reason")}
                className="w-full p-3.5 rounded-xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="">Select Reason</option>
                <option value="Career Change">I want to change my career</option>
                <option value="Up-skilling">I want to learn new skills</option>
                <option value="Job Placement">I am looking for a job</option>
                <option value="Freelancing">I want to start freelancing</option>
              </select>
              {errors.reason && <p className="text-red-500 text-xs">{errors.reason.message}</p>}
            </div>

            {/* Questions */}
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <HelpCircle size={16} /> Do you have any questions? (Optional)
              </label>
              <textarea
                {...register("question")}
                rows={3}
                placeholder="Write your questions here..."
                className="w-full p-3.5 rounded-xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none transition"
              />
            </div>

            {/* Commitment */}
            <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 rounded-2xl">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  {...register("commitment")}
                  className="mt-1 w-5 h-5 accent-indigo-600 rounded"
                />
                <span className="text-sm font-medium text-indigo-900 dark:text-indigo-200">
                  I confirm that I will be consistent throughout the course and complete all assignments on time.
                </span>
              </label>
              {errors.commitment && <p className="text-red-500 text-xs mt-2">{errors.commitment.message}</p>}
            </div>

            <button
              disabled={loading}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-70"
            >
              {loading ? "Processing..." : <>Confirm Enrollment <ArrowRight size={20} /></>}
            </button>

            {success && (
              <div className="p-4 bg-green-50 text-green-700 border border-green-200 rounded-xl text-center font-medium">
                {success}
              </div>
            )}
          </form>
        </div>
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm sticky top-10">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b pb-4 dark:border-gray-800">
              Selected Course
            </h3>
            
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg text-blue-600">
                  <BookOpen size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Course Name</p>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">{course?.title || "N/A"}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-orange-100 dark:bg-orange-900/40 rounded-lg text-orange-600">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Duration</p>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">{course?.duration || "N/A"}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-100 dark:border-emerald-800/50">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/40 rounded-lg text-emerald-600">
                  <Tag size={20} />
                </div>
                <div>
                  <p className="text-xs text-emerald-600/70 uppercase tracking-wider font-bold">Total Budget</p>
                  <p className="text-2xl font-black text-emerald-700 dark:text-emerald-400">
                    {course?.price ? `${course.price} BDT` : "0 BDT"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}