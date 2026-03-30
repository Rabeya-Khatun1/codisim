"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Camera, User, Phone, AlignLeft, Mail } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Settings = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
const { data: session, status } = useSession();

  const user = session?.user;
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "", 
    image:  "",
    cover:  "",
    bio: "",
    phone: "",
  });

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Profile updated successfully! ✅");
        router.push("/dashboard/profile"); 
        router.refresh(); 
      } else {
        alert("Failed to update profile ❌");
      }
    } catch (err) {
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

if (status === "loading") {
  return <p>Loading...</p>;
}

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link href="/dashboard/profile" className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 mb-2 transition-all">
            <ArrowLeft size={18} /> Back to Profile
          </Link>
          <h1 className="text-3xl font-extrabold text-slate-900">Edit Profile</h1>
        </div>
        <button
          onClick={handleUpdate}
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg disabled:opacity-50 transition-all"
        >
          {loading ? "Saving..." : <><Save size={18} /> Save Changes</>}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Photos Preview */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 text-center">
            <h3 className="text-sm font-bold text-slate-400 uppercase mb-4 text-left">Photo Previews</h3>
            
            {/* Profile Photo Preview */}
            <div className="relative w-32 h-32 mx-auto rounded-full border-4 border-indigo-50 overflow-hidden mb-4 bg-slate-100">
              <img 
                src={formData.image || "/default-avatar.png"} 
                alt="Profile" 
                className="w-full h-full object-cover" 
              />
            </div>
            
            {/* Cover Photo Preview */}
            <div className="w-full h-24 rounded-xl border-2 border-dashed border-slate-200 overflow-hidden bg-slate-50 relative">
               {formData.cover ? (
                 <img src={formData.cover} alt="Cover" className="w-full h-full object-cover" />
               ) : (
                 <div className="flex items-center justify-center h-full text-slate-400 text-xs">No Cover Preview</div>
               )}
            </div>
            <p className="text-[10px] text-slate-400 mt-2 italic">Real-time preview (URLs only)</p>
          </div>
        </div>

        {/* Right: Form Inputs */}
        <div className="lg:col-span-2 space-y-6 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name - Pre-filled */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <User size={16} className="text-indigo-500" /> Full Name
              </label>
              <input
                type="text"
                className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={formData.name}
                placeholder="Enter your name"
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            {/* Email - Pre-filled & Disabled (Cannot change email) */}
            <div className="space-y-2 text-slate-500">
              <label className="text-sm font-bold flex items-center gap-2 text-slate-400">
                <Mail size={16} /> Email Address (Private)
              </label>
              <input
                type="email"
                disabled
                className="w-full p-3 rounded-xl border border-slate-100 bg-slate-50 cursor-not-allowed outline-none"
                value={formData.email}
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Phone size={16} className="text-indigo-500" /> Phone Number
              </label>
              <input
                type="text"
                className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={formData.phone}
                placeholder="+880 1XXX-XXXXXX"
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <AlignLeft size={16} className="text-indigo-500" /> Bio / Professional Details
            </label>
            <textarea
              rows={3}
              className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
              placeholder="Tell students about your expertise..."
            />
          </div>

          {/* Image URLs Section */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="font-bold text-slate-800 text-sm">Media Settings</h3>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Profile Photo URL</label>
              <input
                type="text"
                className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-slate-50/50"
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Cover Photo URL</label>
              <input
                type="text"
                className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-slate-50/50"
                value={formData.cover}
                onChange={(e) => setFormData({...formData, cover: e.target.value})}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Settings;