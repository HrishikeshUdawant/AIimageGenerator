import 'dotenv/config';
dotenv.config();
import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";


const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running 🚀" });
});

const startServer = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);

    app.listen(8080, () =>
      console.log("✅ Server started on http://localhost:8080")
    );
  } catch (error) {
    console.error("❌ Server failed:", error);
  }
};

startServer();
