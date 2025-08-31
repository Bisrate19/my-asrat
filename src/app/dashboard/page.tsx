"use client";

import { useState, useEffect } from "react";
import TitheSummary from "./components/TitheSummary";
import SpendingTable from "./components/SpendingTable";
import IncomeForm from "./components/IncomeForm";
import { jwtDecode } from "jwt-decode";

type IncomeRecord = { id: string; month: string; amount: number; tithe: number };
type SpendingRecord = { id: string; description: string; amount: number; date: string };

export default function Dashboard() {
  const [incomeRecords, setIncomeRecords] = useState<IncomeRecord[]>([]);
  const [spendingRecords, setSpendingRecords] = useState<SpendingRecord[]>([]);
  const [titheBalance, setTitheBalance] = useState<number>(0);
  const [initialBalance, setInitialBalance] = useState<number | null>(null);
  const [initialInput, setInitialInput] = useState<string>(""); // temp input for initial
  const [titheRate, setTitheRate] = useState<number>(10); // % tithe rate
  const [constantIncome, setConstantIncome] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>("");

  const currentMonth = new Date().toLocaleString("default", { month: "long", year: "numeric" });

 

// Inside your useEffect where you decode the token
useEffect(() => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded: any = jwtDecode(token);
      const email = decoded.email || "User";

      // Extract name part only (before @)
      const nameOnly = email.split("@")[0];
      setUserEmail(nameOnly);
    }
  }
}, []);



  // Add Initial Balance (only once)
  const handleSetInitial = (amount: number) => {
    if (initialBalance !== null) return; // prevent reset
    setInitialBalance(amount);
    setTitheBalance(amount); // initial goes directly into tithe pool
  };

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(initialInput);
    if (!isNaN(amount) && amount > 0 && initialBalance === null) {
      handleSetInitial(amount);
      setInitialInput("");
    }
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

  // Add Spending (deducts from tithe pool)
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
  const totalSpending = spendingRecords.reduce((sum, r) => sum + r.amount, 0);
  const totalTithe = incomeRecords.reduce((sum, r) => sum + r.tithe, 0);
  const remaining = (initialBalance ?? 0) + totalTithe - totalSpending;

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Message */}
      <h1 className="text-2xl font-bold mb-4">
        Welcome, {userEmail || "User"}!
      </h1>

      <h2 className="text-2xl font-bold">Tithe Dashboard</h2>

      {/* 1. Summary Section */}
      <TitheSummary
        initial={initialBalance ?? 0}
        totalIncome={totalIncome}
        tithe={totalTithe}
        totalSpending={totalSpending}
        remaining={remaining}
      />

      {/* 2. Spending Section */}
      <SpendingTable spendingRecords={spendingRecords} onAddSpending={handleAddSpending} />

      {/* 3. Settings / Income Controls */}
      <div className="border p-4 rounded-lg bg-white text-black space-y-4">
        <h2 className="text-lg font-bold">Income Controls</h2>

        {/* Initial Balance (set once permanently) */}
        {initialBalance === null ? (
          <form onSubmit={handleInitialSubmit} className="flex gap-2 items-center">
            <input
              type="number"
              value={initialInput}
              onChange={(e) => setInitialInput(e.target.value)}
              placeholder="Set Initial Balance"
              className="border rounded px-2 py-1 flex-1"
            />
            <button
              type="submit"
              className="bg-yellow-500 text-black px-4 py-1 rounded"
            >
              Save
            </button>
          </form>
        ) : (
          <p className="text-green-600 font-semibold">
            Initial Balance set: {initialBalance}
          </p>
        )}

        {/* Monthly Income Form */}
        <IncomeForm onAddIncome={handleAddIncome} />

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

      {/* 4. Income History */}
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
