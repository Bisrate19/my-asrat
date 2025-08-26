"use client";

import { useMemo, useState } from "react";
import DashboardCard from "./DashboardCard";
import { computeTithe, remainingAfterTithe, toMonthKey } from "../../../lib/calculations";

type Props = {
  existingMonth?: string | null;
  onSaved: () => Promise<void> | void;
};

export default function IncomeForm({ existingMonth, onSaved }: Props) {
  const [amount, setAmount] = useState<number | "">("");
  const [percent, setPercent] = useState<number>(10);
  const [loading, setLoading] = useState(false);
  const currentKey = useMemo(() => toMonthKey(), []);

  const disabled = existingMonth === currentKey;

  const preview = useMemo(() => {
    const a = typeof amount === "number" ? amount : 0;
    const t = computeTithe(a, percent);
    return {
      tithe: t,
      remaining: remainingAfterTithe(a, t),
    };
  }, [amount, percent]);

  const submit = async () => {
    if (disabled || !amount) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token") || "";
      const res = await fetch("/dashboard/api/income", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          monthKey: currentKey, // e.g. 2025-08
          incomeAmount: amount,
          tithePercent: percent,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || "Failed to save income");
      }
      setAmount("");
      await onSaved();
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardCard title="Monthly Income">
      {disabled ? (
        <p className="text-sm text-gray-600 dark:text-gray-300">
          You’ve already set this month’s income ({currentKey}). You can add spending below.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              type="number"
              min={0}
              placeholder="Income Amount"
              className="border rounded-xl px-3 py-2 dark:bg-zinc-950"
              value={amount}
              onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
            />
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={0}
                max={100}
                className="border rounded-xl px-3 py-2 w-full dark:bg-zinc-950"
                value={percent}
                onChange={(e) => setPercent(Number(e.target.value))}
              />
              <span className="text-sm">%</span>
            </div>
            <button
              onClick={submit}
              disabled={loading || !amount}
              className="rounded-xl px-4 py-2 bg-blue-600 text-white disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Income"}
            </button>
          </div>

          <div className="mt-4 text-sm grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div>Preview Tithe: <strong>{preview.tithe}</strong></div>
            <div>Remaining After Tithe: <strong>{preview.remaining}</strong></div>
            <div>Month: <strong>{currentKey}</strong></div>
          </div>
        </>
      )}
    </DashboardCard>
  );
}
