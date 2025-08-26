"use client";

type SpendingRecord = {
  id: string;
  description: string;
  amount: number;
  date: string;
};

export default function SpendingTable({ records }: { records: SpendingRecord[] }) {
  // ✅ Always ensure records is an array
  const safeRecords = records || [];

  if (safeRecords.length === 0) {
    return (
      <div className="border p-4 rounded-xl text-gray-500">
        No spending records yet.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border rounded-xl">
        <thead className="bg-gray-100 dark:bg-zinc-800">
          <tr>
            <th className="p-2 text-left">Date</th>
            <th className="p-2 text-left">Description</th>
            <th className="p-2 text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {safeRecords.map((record) => (
            <tr key={record.id} className="border-t">
              <td className="p-2">{record.date}</td>
              <td className="p-2">{record.description}</td>
              <td className="p-2 text-right">{record.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
