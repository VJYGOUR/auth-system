import express from "express";
import { configDotenv } from "dotenv";
import authRoutes from "./routes/auth.route.js";
import connectDB from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
configDotenv();
const PORT = process.env.PORT;
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Your frontend URL
    credentials: true, // Important for cookies
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

//middleware to parse JSON
app.use(cookieParser());
app.use(express.json());

//Basic routes
app.use("/api/auth", authRoutes);

//start server
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
  connectDB();
});
