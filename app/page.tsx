"use client";

import { useEffect } from "react";
import Photos from "./photos/page";

export default function Home() {
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      window.location.href = "/login";
    } else {
      window.location.href = "/photos";
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {/* <Photos /> */}
    </main>
  );
}
