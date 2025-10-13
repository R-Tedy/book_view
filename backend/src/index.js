import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./lib/db.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server running on port:`, PORT);
  connectDB();
});