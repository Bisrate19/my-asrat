"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    fetch("http://localhost:5000/api/auth/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => setUser(data.user))
      .catch(() => router.push("/login"));
  }, [router]);

  if (!user) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="max-w-lg mx-auto mt-20 p-6 border rounded">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.email} 🎉</h1>
      <p>This is your personalized dashboard with your data.</p>
    </div>
  );
}
