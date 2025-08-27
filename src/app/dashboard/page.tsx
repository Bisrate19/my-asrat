"use client";

import { useState } from "react";
import TitheSummary from "./components/TitheSummary";
import SpendingTable from "./components/SpendingTable";

type IncomeRecord = { id: string; month: string; amount: number; tithe: number };
type SpendingRecord = { id: string; description: string; amount: number; date: string };

export default function Dashboard() {
  const [incomeRecords, setIncomeRecords] = useState<IncomeRecord[]>([]);
  const [spendingRecords, setSpendingRecords] = useState<SpendingRecord[]>([]);
  const [titheBalance, setTitheBalance] = useState<number>(0);
  const [initialBalance, setInitialBalance] = useState<number>(0);
  const [titheRate, setTitheRate] = useState<number>(10); // % tithe rate
  const [constantIncome, setConstantIncome] = useState<boolean>(false);

  const currentMonth = new Date().toLocaleString("default", { month: "long", year: "numeric" });

  // Add Initial Balance
  const handleSetInitial = (amount: number) => {
    setInitialBalance(amount);
    setTitheBalance(amount); // initial goes directly into tithe pool
  };

  // Add Monthly Income
  const handleAddIncome = (amount: number) => {
    const titheAmount = amount * (titheRate / 100);

    const newIncome: IncomeRecord = {
      id: Date.now().toString(),
      month: currentMonth,
      amount,
      tithe: titheAmount,
    };

    setIncomeRecords((prev) => [...prev, newIncome]);
    setTitheBalance((prev) => prev + titheAmount);
  };

  // Add Spending (deducts only from tithe pool)
  const handleAddSpending = (description: string, amount: number) => {
    const newSpending: SpendingRecord = {
      id: Date.now().toString(),
      description,
      amount,
      date: new Date().toLocaleDateString(),
    };

    setSpendingRecords((prev) => [...prev, newSpending]);
    setTitheBalance((prev) => prev - amount);
  };

  const totalIncome = incomeRecords.reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Tithe Dashboard</h1>

      {/* Summary Section */}
      <TitheSummary totalIncome={totalIncome} titheBalance={titheBalance} />

      {/* Spending Section */}
      <SpendingTable spendingRecords={spendingRecords} onAddSpending={handleAddSpending} />

      {/* Settings / Income Controls */}
      <div className="border p-4 rounded-lg bg-white text-black space-y-4">
        <h2 className="text-lg font-bold">Income Controls</h2>

        {/* Initial Balance */}
        <div className="flex gap-2 items-center">
          <input
            type="number"
            placeholder="Set Initial Balance"
            className="border rounded px-2 py-1 flex-1"
            onChange={(e) => handleSetInitial(Number(e.target.value))}
          />
        </div>

        {/* Monthly Income Form */}
        <IncomeInput onAddIncome={handleAddIncome} />

        {/* Options */}
        <div className="flex gap-4 items-center">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={constantIncome}
              onChange={() => setConstantIncome(!constantIncome)}
            />
            Constant Monthly Income
          </label>

          <label className="flex items-center gap-2">
            Tithe %
            <input
              type="number"
              value={titheRate}
              onChange={(e) => setTitheRate(Number(e.target.value))}
              className="border rounded px-2 py-1 w-16"
            />
          </label>
        </div>
      </div>

      {/* Income History */}
      <div className="border p-4 rounded-lg bg-white text-black">
        <h2 className="text-lg font-bold mb-2">Income History</h2>
        {incomeRecords.length === 0 ? (
          <p className="text-gray-500">No income records yet.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Month</th>
                <th className="border p-2">Amount</th>
                <th className="border p-2">Tithe</th>
              </tr>
            </thead>
            <tbody>
              {incomeRecords.map((record) => (
                <tr key={record.id}>
                  <td className="border p-2">{record.month}</td>
                  <td className="border p-2">{record.amount}</td>
                  <td className="border p-2">{record.tithe}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// Small component for adding income
function IncomeInput({ onAddIncome }: { onAddIncome: (amount: number) => void }) {
  const [amount, setAmount] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount > 0) {
      onAddIncome(amount);
      setAmount(0);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Enter this month's income"
        className="border rounded px-2 py-1 flex-1"
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-1 rounded">
        Add
      </button>
    </form>
  );
}
