"use client";
import React, { useState } from "react";
import { Save, Globe, Layout, Search, Image as ImageIcon, Type } from "lucide-react";

const AdminSettings = ({ initialData }: { initialData: any }) => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  const [settings, setSettings] = useState({
    siteName: initialData?.siteName || "My LMS Platform",
    footerText: initialData?.footerText || "© 2026 All Rights Reserved",
    logoUrl: initialData?.logoUrl || "",
    metaTitle: initialData?.metaTitle || "",
    metaDescription: initialData?.metaDescription || "",
    keywords: initialData?.keywords || "",
  });

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) alert("Settings updated successfully! 🚀");
    } catch (err) {
      alert("Failed to update settings.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-black text-slate-800">Site Configuration</h1>
        <button
          onClick={handleSave}
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 shadow-lg transition-all disabled:opacity-50"
        >
          <Save size={18} /> {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className="w-full md:w-64 space-y-2">
          <button
            onClick={() => setActiveTab("general")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'general' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-500 hover:bg-slate-100'}`}
          >
            <Layout size={20} /> General
          </button>
          <button
            onClick={() => setActiveTab("seo")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'seo' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-500 hover:bg-slate-100'}`}
          >
            <Search size={20} /> SEO Settings
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
          {activeTab === "general" ? (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-800 border-b pb-4">General Settings</h2>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600 flex items-center gap-2">
                  <Type size={16} /> Site Name
                </label>
                <input
                  className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={settings.siteName}
                  onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600 flex items-center gap-2">
                  <ImageIcon size={16} /> Logo URL
                </label>
                <input
                  className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={settings.logoUrl}
                  onChange={(e) => setSettings({...settings, logoUrl: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600">Footer Copyright Text</label>
                <textarea
                  rows={2}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={settings.footerText}
                  onChange={(e) => setSettings({...settings, footerText: e.target.value})}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-800 border-b pb-4">SEO & Metadata</h2>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600">Meta Title (Browser Tab Name)</label>
                <input
                  className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={settings.metaTitle}
                  onChange={(e) => setSettings({...settings, metaTitle: e.target.value})}
                  placeholder="e.g. Best LMS Platform in BD"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600">Meta Description</label>
                <textarea
                  rows={3}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={settings.metaDescription}
                  onChange={(e) => setSettings({...settings, metaDescription: e.target.value})}
                  placeholder="Describe your site for Google search..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600 flex items-center gap-2">
                  <Globe size={16} /> Keywords (Separated by comma)
                </label>
                <input
                  className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={settings.keywords}
                  onChange={(e) => setSettings({...settings, keywords: e.target.value})}
                  placeholder="learning, education, react, nextjs"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;