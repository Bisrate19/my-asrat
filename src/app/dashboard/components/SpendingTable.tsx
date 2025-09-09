"use client";

import { useState } from "react";

type SpendingRecord = {
  id: string;
  description: string;
  amount: number;
  date: string;
};

type SpendingTableProps = {
  spendingRecords: SpendingRecord[];
  onAddSpending: (description: string, amount: number) => void;
};

export default function SpendingTable({
  spendingRecords,
  onAddSpending,
}: SpendingTableProps) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || amount <= 0) return;

    onAddSpending(description, amount);
    setDescription("");
    setAmount(0);
  };

  return (
    <div className="border border-yellow-500 bg-white text-black p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-2">Spending Records</h2>

      {/* Add Spending Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-2 mb-4"
      >
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="border rounded px-2 py-1 flex-1"
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="Amount"
          className="border rounded px-2 py-1 w-full sm:w-32"
        />
        <button
          type="submit"
          className="bg-yellow-500 text-black px-4 py-1 rounded w-full sm:w-auto"
        >
          Add
        </button>
      </form>

      {/* Spending List */}
      {spendingRecords.length === 0 ? (
        <p>No spending records yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[400px]">
            <thead>
              <tr>
                <th className="border p-2">Date</th>
                <th className="border p-2">Description</th>
                <th className="border p-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {spendingRecords.map((record) => (
                <tr key={record.id}>
                  <td className="border p-2">{record.date}</td>
                  <td className="border p-2">{record.description}</td>
                  <td className="border p-2">{record.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
