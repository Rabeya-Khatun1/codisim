"use client";

import React, { useEffect, useState } from "react";
import { Mail, Shield } from "lucide-react";
import UserActions from "./UserActions"; // Import korben ekhane

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user");
        const data = await res.json();
        if (data.success) setUsers(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

const deleteUser = async (id: string) => {
  try {
    const res = await fetch("/api/user/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();

    if (data.success) {
      alert("User deleted successfully 🗑️");

      // UI update (no reload best)
      setUsers((prev: any) => prev.filter((u: any) => u._id !== id));
    } else {
      alert("Delete failed ❌");
    }
  } catch (err) {
    alert("Something went wrong ❌");
  }
};

const changeRole = async (id: string, role: "student" | "teacher" | "admin") => {
  try {
    const res = await fetch("/api/user/role", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, role }),
    });

    const data = await res.json();

    if (data.success) {
      alert(`Role updated to ${role} 🔥`);

      setUsers((prev: any) =>
        prev.map((u: any) =>
          u._id === id ? { ...u, role } : u
        )
      );
    } else {
      alert("Role update failed ❌");
    }
  } catch (err) {
    alert("Something went wrong ❌");
  }
};

const verifyUser = async (id: string) => {
  try {
    const res = await fetch("/api/user/verify", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();

    if (data.success) {
      setUsers((prev: any) =>
        prev.map((u: any) =>
          u._id === id ? { ...u, isVerified: !u.isVerified } : u
        )
      );

      alert("Verification status updated ✅");
    } else {
      alert("Verify failed ❌");
    }
  } catch (err) {
    alert("Something went wrong ❌");
  }
};

const toggleBanUser = async (id: string) => {
  try {
    const res = await fetch("/api/user/ban", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();

    if (data.success) {
      setUsers((prev: any) =>
        prev.map((u: any) =>
          u._id === id ? { ...u, isBanned: data.isBanned } : u
        )
      );

      alert(data.isBanned ? "User Banned 🚫" : "User Unbanned ✅");
    } else {
      alert("Action failed ❌");
    }
  } catch (err) {
    alert("Something went wrong ❌");
  }
};

  return (
    <div className="max-w-5xl mx-auto p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">User Management</h1>
          <p className="text-gray-500 mt-1">Manage your community members and their roles.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-lg shadow-blue-200">
          Add New User
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase">User</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase">Ban Status</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase">verify Status</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase">Status</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase">Role</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {users.map((user: any) => (
              <tr key={user._id} className="hover:bg-blue-50/30 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="h-11 w-11 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <Mail size={12} /> {user.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {user.isBanned ? (
  <span className="text-red-600 font-semibold">Banned 🚫</span>
) : (
  <span className="text-green-600 font-semibold">Active ✅</span>
)}
                </td>
                <td>
                  {user.verified ? (
  <span className="text-green-600">Verified</span>
) : (
  <span className="text-red-600">Unverified</span>
)}
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 text-sm text-gray-700">
                    <Shield size={14} className="text-purple-500" />
                    {user.role || "student"}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  {/* Action Component Integrated Here */}
         <UserActions 
  user={user} 
  onDelete={deleteUser}
  onVerify={verifyUser}
  onRoleChange={changeRole}
   onBan={toggleBanUser} 
/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;