"use client";
import React, { useState, useEffect, useRef } from "react";
import { Bell, CheckCheck } from "lucide-react";
import Link from "next/link";

const NotificationBell = ({ userEmail }: { userEmail: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 1. Fetch Notifications
  const fetchNotifications = async () => {
    if (!userEmail) return;
    try {
      const res = await fetch(`/api/notifications?email=${userEmail}`);
      const data = await res.json();
      if (data.success) {
        setNotifications(data.data);
        setUnreadCount(data.count);
      }
    } catch (error) {
      console.error("Error fetching notifications", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, [userEmail]);

const markAsRead = async (id: string, isAlreadyRead: boolean) => {
  if (isAlreadyRead) {
    setIsOpen(false);
    return;
  }

  // 1. Instant UI update
  setUnreadCount((prev) => Math.max(0, prev - 1));
  
  // 2. Notification list thekeo isRead true kore din jate UI sync thake
  setNotifications((prevNotes: any) =>
    prevNotes.map((n: any) => (n._id === id ? { ...n, isRead: true } : n))
  );

  try {
    const res = await fetch(`/api/notifications/${id}`, { method: "PATCH" });
    const data = await res.json();
    
    if (!data.success) {
       fetchNotifications(); // Fail hole abar fetch korbe
    }
  } catch (error) {
    fetchNotifications();
  }
  
  setIsOpen(false);
};

  // 3. Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Icon */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative text-slate-400 hover:text-slate-600 transition-all p-2 rounded-full hover:bg-slate-100"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center bg-red-500 text-white text-[10px] font-bold rounded-full border-2 border-white">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 bg-white border border-slate-200 shadow-2xl rounded-2xl z-50 overflow-hidden animate-in fade-in zoom-in duration-200">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="font-bold text-slate-800">Notifications</h3>
            <span className="text-[10px] bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full font-bold">
              {unreadCount} New
            </span>
          </div>

          <div className="max-h-[350px] overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((note: any) => (
                <Link
                  key={note._id}
                  href={note.link || "/dashboard/student/my-enrollments"}
                  onClick={() => markAsRead(note._id,note.isRead)}
                  className={`block p-4 border-b border-slate-50 hover:bg-indigo-50/50 transition-colors ${!note.isRead ? "bg-blue-50/30" : ""}`}
                >
                  <div className="flex gap-3">
                    <div className={`mt-1 h-2 w-2 rounded-full shrink-0 ${!note.isRead ? "bg-indigo-600" : "bg-transparent"}`} />
                    <div>
                      <p className={`text-sm ${!note.isRead ? "font-semibold text-slate-900" : "text-slate-600"}`}>
                        {note.message}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-1">
                        {new Date(note.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="p-8 text-center text-slate-400 text-sm">
                No notifications yet.
              </div>
            )}
          </div>

          <Link 
            href="/dashboard/notifications" 
            className="block text-center py-3 text-xs font-bold text-indigo-600 hover:bg-slate-50 border-t border-slate-100"
            onClick={() => setIsOpen(false)}
          >
            View All Notifications
          </Link>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;