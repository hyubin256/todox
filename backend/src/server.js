import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import tasksRoutes from "./routes/tasksRoutes.js";
import cors from "cors";
import path from "path";

// Mặc định nodejs không hiểu nên phải thêm dotnet.config vào
dotenv.config();

const PORT = process.env.PORT || 5001;

const __dirname = path.resolve();

const app = express();

// Middleware để parse JSON body
app.use(express.json());

if (process.env.NODE_ENV !== "production") {
  app.use(cors({
    origin: "http://localhost:5173",
  }));
}

app.use("/api/tasks", tasksRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});