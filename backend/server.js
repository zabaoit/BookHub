import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./src/libs/db.js";
import authRoute from "./src/routes/AuthRoute.js";
import bookRoute from "./src/routes/BookRoute.js";
import authorRoute from "./src/routes/AuthorRoute.js";
import categoryRoute from "./src/routes/CategoryRoute.js";
import cartRoute from "./src/routes/CartRoute.js";
import orderRoute from "./src/routes/OrderRoute.js";
import paymentRoute from "./src/routes/PaymentRoute.js";
dotenv.config({ path: "./.env" });

const app = express();
const PORT = process.env.PORT || 8080;

// middleware - CORS must be first
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    exposedHeaders: ["set-cookie"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// public routes
app.use("/api/auth", authRoute);

// private routes
app.use("/api/books", bookRoute);
app.use("/api/authors", authorRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/cart", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/payment", paymentRoute);

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};

startServer();
