"use client";

type TitheSummaryProps = {
  totalIncome: number;
  titheBalance: number;
};

export default function TitheSummary({ totalIncome, titheBalance }: TitheSummaryProps) {
  return (
    <div className="border border-yellow-500 bg-white text-black p-4 rounded-lg shadow mb-6">
      <h2 className="text-xl font-bold mb-2">Tithe Summary</h2>
      <p>Total Income: {totalIncome}</p>
      <p>Current Tithe Balance: {titheBalance}</p>
    </div>
  );
}
