import mongoose, { Schema, Document } from "mongoose";

export interface IDashboard extends Document {
  userId: string;
  initialBalance: number;
  titheRate: number;
  incomeRecords: { month: string; amount: number; tithe: number }[];
  spendingRecords: { description: string; amount: number; date: string }[];
}

const dashboardSchema = new Schema<IDashboard>({
  userId: { type: String, required: true, unique: true },
  initialBalance: { type: Number, default: 0 },
  titheRate: { type: Number, default: 10 },
  incomeRecords: [
    {
      month: String,
      amount: Number,
      tithe: Number,
    },
  ],
  spendingRecords: [
    {
      description: String,
      amount: Number,
      date: String,
    },
  ],
});

export default mongoose.models.Dashboard || mongoose.model<IDashboard>("Dashboard", dashboardSchema);
