"use client";

import Loader from "@/components/ui/loading";
import React, { useEffect, useState } from "react";

const GlobalLoaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // initial load delay (smooth UX)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <Loader />}
      {children}
    </>
  );
};

export default GlobalLoaderProvider;