"use client";

import { useSession } from "next-auth/react";

type Role = "admin" | "teacher" | "student" | undefined;

export const useRole = () => {
  const { data: session, status } = useSession();

  const role = session?.user?.role as Role;

  return {
    role,
    isLoading: status === "loading",

    isAdmin: role === "admin",
    isTeacher: role === "teacher",
    isStudent: role === "student",
  };
};