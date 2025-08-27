// "use client";

// import { ReactNode } from "react";

// export default function DashboardCard({ title, children }: { title: string; children: ReactNode }) {
//   return (
//     <div className="rounded-2xl border border-gray-200  p-5 shadow-sm bg-white ">
//       <h2 className="text-lg font-semibold mb-3">{title}</h2>
//       {children}
//     </div>
//   );
// }


"use client";

import { ReactNode } from "react";

export default function DashboardCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-white text-black border border-yellow-400 rounded-xl shadow-md p-4">
      <h2 className="text-lg font-bold mb-3">{title}</h2>
      {children}
    </div>
  );
}
