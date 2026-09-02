import "dotenv/config";
import express from "express";
import cors from "cors";
import tripRouter from "./routes/trip.js";

const app = express();

const PORT = Number(process.env.PORT) || 5000;

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok"
  });
});

app.use("/api/trip", tripRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});