"use client";

import { useEffect, useState } from "react";
import TitheSummary from "./components/TitheSummary";
import SpendingTable from "./components/SpendingTable";

type IncomeRecord = { id: string; amount: number; date: string };
type SpendingRecord = {
  id: string;
  description: string;
  amount: number;
  date: string;
};
type SummaryResp = {
  thisMonthIncome?: number;
  thisMonthTithe?: number;
  remainingAfterTithe?: number;
  carryOverUnspent?: number;
  totalTitheAvailable?: number;
  spendingRecords?: SpendingRecord[];
  incomeRecords?: IncomeRecord[];
};

export default function DashboardPage() {
  const [summary, setSummary] = useState<SummaryResp>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newIncome, setNewIncome] = useState<number>(0);

  const API_BASE = "http://localhost:5000/api"; // ✅ Backend server

  const fetchSummary = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/summary`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        cache: "no-store",
      });

      if (!res.ok) throw new Error("Failed to fetch summary");
      const data = await res.json();
      setSummary(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const addIncome = async () => {
    if (newIncome <= 0) return;
    try {
      const res = await fetch(`${API_BASE}/summary/income`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify({ amount: newIncome }),
      });
      if (!res.ok) throw new Error("Failed to add income");
      setNewIncome(0);
      fetchSummary(); // refresh summary
    } catch (err: any) {
      setError(err.message || "Could not add income");
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          <TitheSummary summary={summary} />

          <div className="my-6">
            <h2 className="font-semibold mb-2">Add New Income</h2>
            <div className="flex gap-2">
              <input
                type="number"
                className="border p-2 rounded"
                value={newIncome}
                onChange={(e) => setNewIncome(Number(e.target.value))}
              />
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={addIncome}
              >
                Add
              </button>
            </div>
          </div>

          <SpendingTable records={summary.spendingRecords || []} />
        </>
      )}
    </div>
  );
}
