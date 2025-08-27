"use client";

import { ReactNode } from "react";

export default function DashboardCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm bg-white dark:bg-zinc-900">
      <h2 className="text-lg font-semibold mb-3">{title}</h2>
      {children}
    </div>
  );
}
