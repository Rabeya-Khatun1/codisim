"use client";

import { useForm } from "react-hook-form";
import { IUser, postUser } from "@/app/api/register/route";
import { useState } from "react";
import Button from "../buttons/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "student" | "teacher";
  phone: string;
}

const RegisterForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    defaultValues: {
      profileImage: null,
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreviewImage(URL.createObjectURL(file));
    setValue("profileImage", file);
  };

  const onSubmit = async (data: RegisterFormData) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

const payload: IUser & { role: string; phone?: string } = {
  name: data.username,
  email: data.email,
  password: data.password,
  role: data.role,
  phone: data.phone,
  status: "pending",
  createdAt: new Date().toISOString(),
};

    setIsSubmitting(true);
    try {
      const result = await postUser(payload);
      alert(result.message);

      if (result.success) {
        reset();
        setPreviewImage(null);
        router.push("/login");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-lg mx-auto bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
    >
      {/* Header */}
      <div className="bg-primary px-10 py-8 text-center">
        <h2 className="text-3xl font-bold text-white">Create Account</h2>
        <p className="text-blue-100 mt-2 text-sm">
          Join us today and start your journey
        </p>
      </div>

      {/* Form Content */}
      <div className="p-8 grid gap-6">

        {/* Username + Email */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Username */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              {...register("username", { required: "Username is required" })}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.username ? "border-red-300 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              {...register("email", { required: "Email is required" })}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.email ? "border-red-300 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
        </div>

        {/* Phone + Role */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              placeholder="01XXXXXXXXX"
              {...register("phone", { required: "Phone number is required" })}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.phone ? "border-red-300 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Role</label>
            <select
              {...register("role", { required: "Select a role" })}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.role ? "border-red-300 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`}
            >
              <option value="">Select Role</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
            {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
          </div>
        </div>

        {/* Profile Image */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Profile Image</label>
          <label className="w-full h-48 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/10 transition-colors">
            {previewImage ? (
                <Image
    src={previewImage}
    alt="Profile Preview"
    width={128}
    height={128}
    className="rounded-full object-cover border-2 border-gray-200"
  />
            ) : (
              <span className="text-gray-400 text-sm">Click or drag to upload</span>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
          {previewImage && (
            <p className="text-xs text-gray-500 mt-2">Click box to change image</p>
          )}
        </div>

        {/* Password + Confirm Password */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input
              type="password"
              placeholder="Create password"
              {...register("password", { required: "Password is required" })}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.password ? "border-red-300 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm password"
              {...register("confirmPassword", { required: "Confirm password is required" })}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.confirmPassword ? "border-red-300 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 text-white rounded-lg font-semibold ${
            isSubmitting ? "opacity-70 cursor-not-allowed" : "bg-primary hover:shadow-lg"
          }`}
        >
          {isSubmitting ? "Creating Account..." : "Create Account"}
        </Button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-2">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-medium">Sign In</Link>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;