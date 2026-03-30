"use client";

import React, { useState } from "react";
import { MoreVertical, UserCog, Trash2, Eye, ShieldCheck, AlertTriangle } from "lucide-react";

interface UserActionsProps {
  user: any;
  onDelete: (id: string) => void;
  onVerify: (id: string) => void;
    onRoleChange: (
    id: string,
    role: "student" | "teacher" | "admin"
  ) => void;
  onBan: (id: string) => void; 
}

const UserActions = ({ user, onDelete, onVerify, onRoleChange, onBan }: UserActionsProps) => {
const [isOpen, setIsOpen] = useState(false);
const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div className="relative">
      {/* Three Dot Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-white hover:shadow-md rounded-lg transition-all border border-transparent hover:border-gray-100"
      >
        <MoreVertical size={18} className="text-gray-400 hover:text-gray-600" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
          <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-2xl border border-gray-100 z-20 overflow-hidden animate-in fade-in zoom-in duration-150">
            <div className="px-4 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">
              User Options
            </div>
            
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition-colors">
              <Eye size={16} className="text-blue-500" /> View Details
            </button>
            
            <button 
              onClick={() => { onVerify(user._id); setIsOpen(false); }}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-green-50 transition-colors"
            >
              <ShieldCheck size={16} className="text-green-500" /> Verify Account
            </button>
            
            <select
  onChange={(e) => {
    onRoleChange(
      user._id,
      e.target.value as "student" | "teacher" | "admin"
    );
    setIsOpen(false);
  }}
  className="w-full px-4 py-2"
>
  <option value="student">Student</option>
  <option value="teacher">Teacher</option>
  <option value="admin">Admin</option>
</select>
            
            <div className="border-t border-gray-50">
              <button 
                onClick={() => { setShowDeleteModal(true); setIsOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium"
              >
                <Trash2 size={16} /> Delete User
              </button>
            </div>
            <button
  onClick={() => {
    onBan(user._id);
    setIsOpen(false);
  }}
  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50"
>
  🚫 Ban / Unban
</button>
          </div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
              <AlertTriangle className="text-red-600" size={24} />
            </div>
            <h3 className="text-lg font-bold text-center text-gray-900">Are you sure?</h3>
            <p className="text-sm text-gray-500 text-center mt-2">
              This action cannot be undone. User <b>{user.name}</b> will be permanently removed.
            </p>
            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={() => { onDelete(user._id); setShowDeleteModal(false); }}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserActions;