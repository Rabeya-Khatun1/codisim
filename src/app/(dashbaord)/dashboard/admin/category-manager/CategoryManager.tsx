"use client";

import React, { useState } from "react";
import { Plus, Trash2, Tag } from "lucide-react";

export const CategoryManager = () => {
  const [categories, setCategories] = useState(["Programming", "Graphic Design", "Marketing"]);
  const [newCat, setNewCat] = useState("");

  const addCategory = () => {
    if (!newCat) return;
    setCategories([...categories, newCat]);
    setNewCat("");
  };

  const deleteCategory = (name: string) => {
    setCategories(categories.filter(c => c !== name));
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mt-8">
      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Tag className="text-purple-600" /> Manage Categories
      </h2>

      {/* Add Input */}
      <div className="flex gap-2 mb-6">
        <input 
          type="text" 
          value={newCat}
          onChange={(e) => setNewCat(e.target.value)}
          placeholder="New category name..."
          className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button 
          onClick={addCategory}
          className="bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 flex items-center gap-2"
        >
          <Plus size={18} /> Add
        </button>
      </div>

      {/* Category List */}
      <div className="flex flex-wrap gap-3">
        {categories.map((cat) => (
          <div key={cat} className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-full font-medium border border-purple-100">
            {cat}
            <button onClick={() => deleteCategory(cat)} className="hover:text-red-500 transition-colors">
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};