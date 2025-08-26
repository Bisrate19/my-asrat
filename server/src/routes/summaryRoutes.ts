// server/routes/summaryRoutes.ts
import { Router } from "express";

const router = Router();

// Fake summary data for now
router.get("/", (req, res) => {
  res.json({
    thisMonthIncome: 5000,
    thisMonthTithe: 500,
    remainingAfterTithe: 4500,
    carryOverUnspent: 200,
    totalTitheAvailable: 700,
    spendingRecords: [
      { id: "1", description: "Groceries", amount: 100, date: "2025-08-01" },
      { id: "2", description: "Transport", amount: 50, date: "2025-08-05" },
    ],
  });
});

// Add income
router.post("/income", (req, res) => {
  const { amount } = req.body;
  if (!amount || amount <= 0) {
    return res.status(400).json({ message: "Invalid income amount" });
  }

  // TODO: Save to DB
  res.json({ message: "Income added successfully", amount });
});

export default router;
