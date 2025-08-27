"use client";

import DashboardCard from "./DashboardCard";

type Summary = {
  monthKey?: string | null;
  thisMonthIncome?: number;
  thisMonthTithe?: number;
  remainingAfterTithe?: number;
  carryOverUnspent?: number;
  totalTitheAvailable?: number;
};

export default function TitheSummary({ summary }: { summary: Summary }) {
  return (
    <DashboardCard title="Tithe Summary">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        <div className="rounded-xl p-3 border dark:border-zinc-800">
          <div className="text-gray-500">This Month</div>
          <div>
            Income: <strong>{summary.thisMonthIncome ?? 0}</strong>
          </div>
          <div>
            Tithe Deducted: <strong>{summary.thisMonthTithe ?? 0}</strong>
          </div>
          <div>
            Income After Tithe:{" "}
            <strong>{summary.remainingAfterTithe ?? 0}</strong>
          </div>
        </div>
        <div className="rounded-xl p-3 border dark:border-zinc-800">
          <div className="text-gray-500">Carry Over</div>
          <div>
            Unspent from Previous Months:{" "}
            <strong>{summary.carryOverUnspent ?? 0}</strong>
          </div>
          <div>
            Total Tithe Available:{" "}
            <strong>{summary.totalTitheAvailable ?? 0}</strong>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}
