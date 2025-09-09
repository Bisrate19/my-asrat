"use client";

import { useState } from "react";

type IncomeFormProps = {
  onAddIncome: (amount: number) => void;
};

export default function IncomeForm({ onAddIncome }: IncomeFormProps) {
  const [amount, setAmount] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = parseFloat(amount);

    if (!isNaN(value) && value > 0) {
      onAddIncome(value); // send up to Dashboard
      setAmount(""); // clear input after adding
    }
  };

  return (
    // <form
    //   onSubmit={handleSubmit}
    //   className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg bg-white shadow"
    // >
    //   <input
    //     type="number"
    //     value={amount}
    //     onChange={(e) => setAmount(e.target.value)}
    //     placeholder="Enter income"
    //     className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black bg-white"
    //   />
    //   <button
    //     type="submit"
    //     className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
    //   >
    //     Add
    //   </button>
    // </form>

<form
  onSubmit={handleSubmit}
  className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-4 border border-gray-300 rounded-lg bg-white shadow"
>
  <input
    type="number"
    value={amount}
    onChange={(e) => setAmount(e.target.value)}
    placeholder="Enter income"
    className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black bg-white"
  />
  <button
    type="submit"
    className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition w-full sm:w-auto"
  >
    Add
  </button>
</form>



  );
}
