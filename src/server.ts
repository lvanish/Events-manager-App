import express, { Application } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db";
import eventRoutes from "./routes/events";
import userRoutes from "./routes/users";

dotenv.config();
const app: Application = express();

// Middlewares
app.use(morgan("tiny"));
app.use(express.json());

connectDB();

app.use("/api/events", eventRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
