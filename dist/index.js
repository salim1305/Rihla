// src/index.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
dotenv.config();
const app = express();
const prisma = new PrismaClient();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.send("🚀 Rihla API is running...");
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
