// src/lib/calculations.ts

export function calculateTithe(income: number, percentage: number = 10) {
  return (income * percentage) / 100;
}

export function calculateRemainingIncome(income: number, tithe: number) {
  return income - tithe;
}

export function addUnspentTithe(previousUnspent: number, currentTithe: number) {
  return previousUnspent + currentTithe;
}

export function toMonthKey(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  return `${year}-${month}`;
}

// ⚡ Add these aliases to match IncomeForm imports
export const computeTithe = calculateTithe;
export const remainingAfterTithe = calculateRemainingIncome;
