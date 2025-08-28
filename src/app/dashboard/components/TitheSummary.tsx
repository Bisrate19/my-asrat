"use client";

type TitheSummaryProps = {
  initial: number;
  totalIncome: number;
  tithe: number;
  totalSpending: number;
  remaining: number;
};

export default function TitheSummary({
  initial,
  totalIncome,
  tithe,
  totalSpending,
  remaining,
}: TitheSummaryProps) {
  return (
    <div className="border border-yellow-500 bg-white text-black p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-2">Tithe Summary</h2>
      <ul className="space-y-1">
        <li>Initial: {initial}</li>
        <li>Total Income: {totalIncome}</li>
        <li>Tithe: {tithe}</li>
        <li>Total Spending: {totalSpending}</li>
        <li>Remaining: {remaining}</li>
      </ul>
    </div>
  );
}
