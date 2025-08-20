import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/myapp")
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(5000, () =>
      console.log("✅ Server running on http://localhost:5000")
    );
  })
  .catch((err) => console.error("❌ MongoDB error:", err));
