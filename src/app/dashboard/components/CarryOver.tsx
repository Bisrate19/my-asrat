"use client";

import DashboardCard from "./DashboardCard";

export default function CarryOver({ amount }: { amount: number }) {
  return (
    <DashboardCard title="Carry Over">
      <p className="text-sm">
        Unspent tithe carried over: <strong>{amount}</strong>
      </p>
    </DashboardCard>
  );
}
