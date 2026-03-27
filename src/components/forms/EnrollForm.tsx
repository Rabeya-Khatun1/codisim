"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  User,
  Mail,
  Phone,
  BookOpen,
  CreditCard,
  Hash,
  FileText,
  ArrowRight,
} from "lucide-react";

/* =========================
   FORM CONFIG
========================= */

const formFields = [
  { name: "name", label: "Full Name", type: "text", icon: User, required: true },
  { name: "email", label: "Email Address", type: "email", icon: Mail, required: true },
  { name: "phone", label: "Phone Number", type: "text", icon: Phone, required: true },
  {
    name: "experience",
    label: "Experience Level",
    type: "select",
    icon: BookOpen,
    options: ["Beginner", "Intermediate", "Advanced"],
  },
  {
    name: "reason",
    label: "Why do you want to enroll?",
    type: "textarea",
    icon: FileText,
    required: true,
  },
  {
    name: "payment",
    label: "Payment Method",
    type: "select",
    icon: CreditCard,
    options: ["Bkash", "Nagad", "Card"],
    required: true,
  },
  {
    name: "transactionId",
    label: "Transaction ID",
    type: "text",
    icon: Hash,
    required: true,
  },
];

/* =========================
   VALIDATION
========================= */

const schemaShape: Record<string, any> = {};

formFields.forEach((f) => {
  schemaShape[f.name] = f.required
    ? z.string().min(1, `${f.label} is required`)
    : z.string().optional();
});

const schema = z.object(schemaShape);

type FormData = z.infer<typeof schema>;

/* =========================
   COMPONENT
========================= */

export default function EnrollmentForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setSuccess("");

    try {
      const res = await fetch("/api/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSuccess("Enrollment completed successfully");
        reset();
      } else {
        setSuccess("Something went wrong");
      }
    } catch {
      setSuccess("Server error");
    }

    setLoading(false);
  };

  const errorMsg = (name: string) =>
    (errors as any)[name]?.message as string;

  /* =========================
     FIELD RENDER
  ========================= */

  const renderField = (field: any) => {
    const Icon = field.icon;

    return (
      <div
        key={field.name}
        className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition"
      >
        <div className="flex items-center gap-2 mb-2 text-gray-600 dark:text-gray-300">
          <Icon size={16} />
          <label className="text-sm font-medium">{field.label}</label>
        </div>

        {/* INPUT */}
        {(field.type === "text" || field.type === "email") && (
          <input
            {...register(field.name)}
            placeholder={field.label}
            className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        )}

        {/* SELECT */}
        {field.type === "select" && (
          <select
            {...register(field.name)}
            className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select {field.label}</option>
            {field.options?.map((opt: string) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        )}

        {/* TEXTAREA */}
        {field.type === "textarea" && (
          <textarea
            {...register(field.name)}
            rows={4}
            className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500"
            placeholder={field.label}
          />
        )}

        {/* ERROR */}
        {errorMsg(field.name) && (
          <p className="text-red-500 text-xs mt-2">
            {errorMsg(field.name)}
          </p>
        )}
      </div>
    );
  };

  /* =========================
     UI
  ========================= */

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-indigo-100 dark:from-black dark:via-gray-950 dark:to-black p-6">

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* FORM SECTION */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="lg:col-span-2 bg-white/80 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-xl space-y-5"
        >
          {/* HEADER */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              Enrollment Form
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Complete the required information to continue
            </p>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formFields
              .filter((f) => f.type !== "textarea")
              .map(renderField)}
          </div>

          {/* TEXTAREA */}
          <div>{renderField(formFields.find((f) => f.type === "textarea"))}</div>

          {/* BUTTON */}
          <button
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:scale-[1.02] active:scale-95 transition"
          >
            {loading ? (
              "Processing..."
            ) : (
              <>
                Submit Enrollment <ArrowRight size={18} />
              </>
            )}
          </button>

          {/* SUCCESS */}
          {success && (
            <p className="text-center text-green-500 text-sm">
              {success}
            </p>
          )}
        </form>

        {/* SIDEBAR */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-xl h-fit sticky top-6">

          <h3 className="text-xl font-bold mb-4">
            Course Overview
          </h3>

          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
            <p>Course: Full Stack Development</p>
            <p>Level: Beginner to Advanced</p>
            <p>Duration: 3 Months</p>
            <p>Support: 24/7 AI Assistant</p>
          </div>

          <div className="mt-5 p-3 bg-indigo-50 dark:bg-gray-800 rounded-lg text-indigo-600 dark:text-indigo-300 text-sm">
            Limited seats available
          </div>

        </div>
      </div>
    </div>
  );
}